from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, SelectField, BooleanField, DateField
from wtforms.validators import DataRequired

class NewNote(FlaskForm):
    # trip_date = DateField("Date", validators=[DataRequired()])
    note = StringField("Note")
    submit = SubmitField("Submit")
