from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Photo, Comment, Tag, tags_to_photos, db
from app.forms import PhotoForm
from app.forms import CommentForm
from app.forms import TagForm
from app.api.auth_routes import validation_errors_to_error_messages

photo_routes = Blueprint('photos', __name__)


@photo_routes.route('/')
def photos():
    """
    Query for all photos and returns them in a list of user dictionaries
    """
    # photos = Photo.query.all()
    photos = Photo.query.order_by(Photo.created_at.desc()).all()

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
    print('---------------HITTING THE ROUTER ON THE BACK----------------')

    form = PhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data)
    if form.validate_on_submit():
        print('----------hitting validate_on_submit--------')
        data = form.data
        print('data', data)
        tag_list = []
        tag_list_tags = data['tags'].split()
        if data['tags']:
            print('----Hit if ONe-------')
            for tag in tag_list_tags:
                print(tag)
                old_tag = Tag.query.filter(Tag.tag == tag).first() 
                if old_tag:
                    tag_list.append(old_tag)
                else:
                    new_tag = Tag(
                        tag = tag
                    )
                    db.session.add(new_tag)
                    db.session.commit()
                    newer_tag = Tag.query.filter(Tag.tag == tag).first()
                    tag_list.append(newer_tag) 

        if data['tags'] and not data['albumId']:
            print('-------hit two-------')
            new_photo = Photo(
                user_id = current_user.id,
                url = data['url'],
                name = data['name'],
                about = data['about'],

                taken_on = data['takenOn'],

                private = data['private'],
                tags = tag_list
                )
            db.session.add(new_photo)
            db.session.commit()
            return jsonify(new_photo.to_dict())
        if data['albumId'] and not data['tags']:
             print('-------HIT THREE-------')
             new_photo = Photo(
                user_id = current_user.id,
                album_id = data['albumId'],
                url = data['url'],
                name = data['name'],
                about = data['about'],
                taken_on = data['takenOn'],
                private = data['private'],
                )
             db.session.add(new_photo)
             db.session.commit()
             return jsonify(new_photo.to_dict())
        if data['albumId'] and data['tags']:
            print('------HIT FOUR--------')
            new_photo = Photo(
                user_id = current_user.id,
                album_id = data['albumId'],
                url = data['url'],
                name = data['name'],
                about = data['about'],
                taken_on = data['takenOn'],
                private = data['private'],
                tags = tag_list,
                )
            db.session.add(new_photo)
            db.session.commit()
            return jsonify(new_photo.to_dict())
        else:
            print('-------HIT ELSE------')
            new_photo = Photo(
                user_id = current_user.id,
                url = data['url'],
                name = data['name'],
                about = data['about'],
                taken_on = data['takenOn'],
                private = data['private']
                )
            db.session.add(new_photo)
            db.session.commit()
            return jsonify(new_photo.to_dict())
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401




@photo_routes.route('/<int:id>')
def photo(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    photo = Photo.query.get(id)
    return jsonify(photo.to_dict())


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
        new_tags = data['tags'].split('')
        for tag in new_tags:
            if tag not in tags_list:
                db.session.add(Tag(tag=tag))
            new = Tag.query(tag=tag).first()
            photo.tags.append(new)
        db.session.commit()
        return jsonify(photo.to_dict())
    return jsonify('Tags not added')


@photo_routes.route('/<int:photo_id>/tags/<int:tag_id>', methods=["DELETE"])
@login_required
def delete_tag(photo_id, tag_id):
    tag = tags_to_photos.query(photo_id=photo_id, tag_id=tag_id).first()
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
            user_id=current_user.id,
            photo_id=id,
            comment=data["comment"]
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
