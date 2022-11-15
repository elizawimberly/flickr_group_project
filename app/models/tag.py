from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, date
from .photo import tags_to_photos


date_str = str(datetime.now())

class Tag(db.Model):
    __tablename__ = 'tags'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    tag = db.Column(db.String(50), nullable=False)

    photos = db.relationship('Photo',
    secondary = tags_to_photos,
    back_populates = 'tags'
    )

    def to_dict(self):
        return {
            'id': self.id,
            'tag': self.tag
        }

    def tag_list(self):
        return self.tag
