from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField, TextAreaField, IntegerField, BooleanField, RadioField, DateField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Tag

class TagForm(FlaskForm):
  tag = StringField('tag', validators=[DataRequired()])
