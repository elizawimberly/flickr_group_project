from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField, TextAreaField, IntegerField, BooleanField, RadioField, DateField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Album

class AlbumForm(FlaskForm):
  name = StringField('name', validators=[DataRequired()])
  about = StringField('about', validators=[DataRequired()])
