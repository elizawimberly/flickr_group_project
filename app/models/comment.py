from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, date


today = str(date.today())
date_str = datetime.strptime(today, '%Y-%m-%d')


class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id =  db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    photo_id = db.Column(db.Integer, db.ForeignKey('photos.id'), nullable=False)
    comment = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.String(50), nullable=False, default=date_str)

    user = db.relationship('User', back_populates='comments')

    photo = db.relationship('Photo', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'photo_id': self.photo_id,
            'comment': self.comment,
            'created_at': self.created_at
        }
