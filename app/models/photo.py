from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


date_str = str(datetime.now())


tags_to_photos = db.Table(
    'tags_to_photos',
    db.Column('tag_id', db.Integer, db.ForeignKey(
        add_prefix_for_prod('tags.id')), primary_key=True),
    db.Column('photo_id', db.Integer, db.ForeignKey(
        add_prefix_for_prod('photos.id')), primary_key=True)
)

if environment == "production":
    tags_to_photos.schema = SCHEMA


class Photo(db.Model):
    __tablename__ = "photos"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    album_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('albums.id')), nullable=True)
    url = db.Column(db.String(500), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    about = db.Column(db.String(500), nullable=False)
    taken_on = db.Column(db.String(50), nullable=True)
    private = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.String(50), nullable=False, default=date_str)

    user = db.relationship('User', back_populates='photos')

    album = db.relationship('Album', back_populates='photos')

    comments = db.relationship('Comment',
                                back_populates='photo',
                                cascade="all, delete-orphan"
                                )

    tags = db.relationship('Tag',
                           secondary=tags_to_photos,
                           back_populates='photos'
                           )

    def to_dict(self, current=False):
        if current == False:
            return {
                'id': self.id,
                'userId': self.user_id,
                'User': self.user.to_dict(),
                'albumId': self.album_id,
                'url': self.url,
                'name': self.name,
                'about': self.about,
                'private': self.private,
                'takenOn': self.taken_on,
                'createdAt': self.created_at
            }
        else:
            return {
                'id': self.id,
                'userId': self.user_id,
                'User': self.user.to_dict(),
                'albumId': self.album_id,
                'url': self.url,
                'name': self.name,
                'about': self.about,
                'private': self.private,
                'takenOn': self.taken_on,
                'Comments': [comment.to_dict() for comment in self.comments],
                'Tags': [tag.to_dict() for tag in self.tags],
                'createdAt': self.created_at
            }
