from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField, TextAreaField, IntegerField, BooleanField, RadioField, DateField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Comment

class CommentForm(FlaskForm):
  comment = StringField('comment', validators=[DataRequired()])
