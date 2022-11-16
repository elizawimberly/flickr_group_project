from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Tag

class TagForm(FlaskForm):
  tags = StringField('tags', validators=[DataRequired()])
