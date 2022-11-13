from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, date


today = str(date.today())
date_str = datetime.strptime(today, '%Y-%m-%d')


tags_to_photos = db.Table(
    'tags_to_photos',
    db.Column('tag_id', db.Integer, db.ForeignKey('tags.id'), primary_key=True),
    db.Column('photo_id', db.Integer, db.ForeignKey('photos.id'), primary_key=True)
  )

class Photo(db.Model):
    __tablename__ = "photos"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    album_id = db.Column(db.Integer, db.ForeignKey('albums.id'), nullable=True)
    url = db.Column(db.String(500), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    about = db.Column(db.String(500), nullable=False)
    taken_on = db.Column(db.String(50), nullable=True)
    private = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.String(50), nullable=False, default=date_str)

    user = db.relationship('User', back_populates='photos')

    album = db.relationship('Album', back_populates='photos')

    comments = db.relationship('Comment', back_populates= 'photo')

    tags = db.relationship('Tag',
    secondary = tags_to_photos,
    back_populates='photos'
    )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'album_id': self.album_id,
            'url': self.url,
            'name': self.name,
            'about': self.about,
            'taken_on': self.taken_on,
            'private': self.private,
            'created_at': self.created_at
        }
