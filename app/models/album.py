from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


date_str = str(datetime.now())

class Album(db.Model):
    __tablename__ = 'albums'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id =  db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    about = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.String(50), nullable=False, default=date_str)

    user = db.relationship('User', back_populates='albums')
    photos = db.relationship('Photo', back_populates= 'album')

    def to_dict(self, by_id = False):

        if by_id == False:
            return {
                'id': self.id,
                'user_id': self.user_id,
                'name': self.name,
                'about': self.about,
                'created_at': self.created_at
            }
        else:
            return {
                'id': self.id,
                'user_id': self.user_id,
                'name': self.name,
                'about': self.about,
                'created_at': self.created_at,
                'Photos': [photo.to_dict() for photo in self.photos]
            }

