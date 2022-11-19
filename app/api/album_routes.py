from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Album, db
from app.forms.album_form import AlbumForm
from app.api.auth_routes import validation_errors_to_error_messages
from app.models.photo import Photo
from app.models.user import User

album_routes = Blueprint('album', __name__)


@album_routes.route('/', methods=['GET'])
@login_required
def albums():
    """
    Query for all albums and returns them in a list of user dictionaries
    """

    albums = current_user.albums

    return jsonify({'Albums': [album.to_dict(True) for album in albums]})


@album_routes.route('/', methods=["POST"])
@login_required
def add_album():

    """
    Create new album and return it in a dictionary
    """
    form = AlbumForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data

        if data['photos']:
            photo_id_list = data['photos'].split(',')
            photo_list = []
            for photo_id in photo_id_list:
                photo = Photo.query.get(photo_id)
                photo_list.append(photo)

            new_album = Album(
                user_id = current_user.id,
                name = data['name'],
                about = data['about'],
                photos = photo_list
            )
            db.session.add(new_album)
            db.session.commit()
        else:
            new_album = Album(
                user_id = current_user.id,
                name = data['name'],
                about = data['about']
            )
            db.session.add(new_album)
            db.session.commit()
        return jsonify(new_album.to_dict(True))
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@album_routes.route('/<int:id>')
def get_album(id):
    album = Album.query.get(id)

    return album.to_dict(True)


@album_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_album(id):
    """
    Query for a album by id, edits the album, and returns that album in a dictionary
    """
    album = Album.query.get(id)
    form = AlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        if data['photos']:
            photo_id_list = data['photos'].split(',')
            photo_list = []
            for photo_id in photo_id_list:
                photo = Photo.query.get(photo_id)
                photo_list.append(photo)
            album.name = data['name']
            album.about = data['about']
            album.photos = photo_list
            db.session.commit()
        else:
            album.name = data['name']
            album.about = data['about']
            db.session.commit()
        return jsonify(album.to_dict(True))
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



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
