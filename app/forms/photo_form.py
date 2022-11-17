from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField, TextAreaField, IntegerField, BooleanField, RadioField, DateField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Photo

class PhotoForm(FlaskForm):
  url = StringField('url', validators=[DataRequired()])
  name = StringField('name', validators=[DataRequired()])
  about = StringField('about', validators=[DataRequired()])
  takenOn = StringField('takenOn')
  private = BooleanField('private')
  tags = StringField('tags')
  albumId = IntegerField('albumId')
  
