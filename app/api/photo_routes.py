from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Photo

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
    return {'Photos': [photo.to_dict() for photo in photos]}


@photo_routes.route('/<int:id>')
def photo(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    photo = Photo.query.get(id)
    return photo.to_dict()

@photo_routes.route('/current')
@login_required
def current():
    photos = current_user.photos

    # normalized
    # return { 'Photos': { photo['id'] : photo.to_dict(True) for photo in photos} }

    # not normalized
    return {'Photos': [photo.to_dict(True) for photo in photos]}

