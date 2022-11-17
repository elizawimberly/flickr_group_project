from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Photo, Comment, Tag, tags_to_photos, db
from app.forms import PhotoForm
from app.forms import CommentForm
from app.forms import TagForm

photo_routes = Blueprint('photos', __name__)


@photo_routes.route('/')
def photos():
    """
    Query for all photos and returns them in a list of user dictionaries
    """
    photos = Photo.query.all()

    # normalized
    # return { 'Photos': { photo['id'] : photo.to_dict() for photo in photos} }

    # not normalized
    return jsonify({'Photos': [photo.to_dict() for photo in photos]})

@photo_routes.route('/', methods=["POST"])
@login_required
def add_photo():

    """
    Create new photo and return it in a dictionary
    """

    form = PhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_photo = Photo(
            user_id = current_user.id,
            url = data['url'],
            name = data['name'],
            about = data['about'],
            taken_on = data['taken_on'],
            private = data['private']
        )
        db.session.add(new_photo)
        db.session.commit()
        return jsonify(new_photo.to_dict())
    return jsonify('photo not added')


@photo_routes.route('/<int:id>')
def photo(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    photo = Photo.query.get(id)
    return jsonify(photo.to_dict(True))



@photo_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_photo(id):
    """
    Query for a photo by id, edits the photo, and returns that photo in a dictionary
    """
    photo = Photo.query.get(id)
    form = PhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        photo.album_id = data['album_id']
        photo.name = data['name']
        photo.about = data['about']
        photo.taken_on = data['taken_on']
        photo.private = data['private']
        db.session.commit()
        return jsonify(photo.to_dict())
    return jsonify('photo not updated')


@photo_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_photo(id):
    """
    Deletes a photo
    """
    photo = Photo.query.get(id)
    db.session.delete(photo)
    db.session.commit()
    return jsonify('Photo Deleted')



@photo_routes.route('/current')
@login_required
def current():
    photos = current_user.photos
    print("----------THIS IS CURENT USER-------------", current_user)
    # normalized
    # return { 'Photos': { photo['id'] : photo.to_dict(True) for photo in photos} }

    # not normalized
    return jsonify({'Photos': [photo.to_dict(True) for photo in photos]})

# Tags Routes
@photo_routes.route('/<int:id>/tags', methods=["POST"])
@login_required
def add_tag(id):
    photo = Photo.query.get(id)
    tags = Tag.query.all()
    tags_list = [tag.tag_list() for tag in tags]
    form = TagForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_tags = data['tags'].split(' ')
        tags_to_send = []
        for tag in new_tags:
            if tag not in tags_list:
                db.session.add(Tag(tag = tag))
            new = Tag.query.filter(Tag.tag == tag).first()
            tags_to_send.append(new)
            photo.tags.append(new)
        db.session.commit()
        return jsonify({'Tags': [tag.to_dict() for tag in tags_to_send]})
    return jsonify('Tags not added')



@photo_routes.route('/<int:photo_id>/tags/<int:tag_id>', methods=["DELETE"])
@login_required
def delete_tag(photo_id, tag_id):
    tag = tags_to_photos.query(photo_id = photo_id, tag_id = tag_id).first()
    db.session.delete(tag)
    return jsonify('Tag deleted')



# Comments Routes

@photo_routes.route('/<int:id>/comments', methods=["POST"])
@login_required
def add_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_comment = Comment(
            user_id = current_user.id,
            photo_id = id,
            comment = data["comment"]
        )
        db.session.add(new_comment)
        db.session.commit()
        return jsonify(new_comment.to_dict())
    return jsonify("Comment not added")


@photo_routes.route('/<int:photo_id>/comments/<int:comment_id>', methods=["DELETE"])
@login_required
def delete_comment(photo_id, comment_id):
    comment = Comment.query.get(comment_id)
    db.session.delete(comment)
    db.session.commit()
    return jsonify('Comment Deleted')
