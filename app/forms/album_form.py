from flask_wtf import FlaskForm
from wtforms import TextAreaField, StringField, SelectField, SubmitField, TextAreaField, IntegerField, BooleanField, RadioField, DateField
from wtforms.validators import DataRequired, Email, ValidationError


class AlbumForm(FlaskForm):
  name = StringField('name', validators=[DataRequired()])
  about = StringField('about', validators=[DataRequired()])
  photos = StringField('photos')