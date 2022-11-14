from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Album, db
from app.forms import album_form

album_routes = Blueprint('album', __name__)


@album_routes.route('/')
def albums():
    """
    Query for all albums and returns them in a list of user dictionaries
    """
    albums = Album.query.all()

    return jsonify({'Albums': [album.to_dict(True) for album in albums]})

@album_routes.route('/<int:id>')
def albums(id):
    album = Album.query.get(id)

    return album.to_dict(True)

@album_routes.route('/', methods=["POST"])
@login_required
def add_album():

    """
    Create new album and return it in a dictionary
    """

    form = album_form()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_album = Album(
            user_id = current_user.id,
            user_id = current_user,
            name = data['name'],
            about = data['about'],
            created_at = data['created_at']
        )
        db.session.add(new_album)
        db.session.commit()
        return jsonify(new_album.to_dict(True))
    return jsonify('album not added')

@album_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_album(id):
    """
    Query for a album by id, edits the album, and returns that album in a dictionary
    """
    album = Album.query.get(id)
    form = album_form()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data,
        album.name = data['name']
        album.about = data['about']
        db.session.commit()
        return jsonify(album.to_dict(True))
    return jsonify('photo not updated')


@album_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_photo(id):
    """
    Deletes a photo
    """
    album = Album.query.get(id)
    db.session.delete(album)
    db.session.commit()
    return jsonify('Photo Deleted')

