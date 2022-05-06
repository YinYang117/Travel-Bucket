from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, SelectField, BooleanField, DateField
from wtforms.validators import DataRequired


class NewNote(FlaskForm):
    ownerId = IntegerField("Owner", validators=[DataRequired()])
    tripId = IntegerField("Associated Trip", validators=[DataRequired()])
    tripDate = DateField("Date", validators=[DataRequired()])
    note = StringField("Note", validators=[DataRequired()])
    submit = SubmitField("Submit")


class EditNote(FlaskForm):
    tripDate = DateField("Date", validators=[DataRequired()])
    note = StringField("Note", validators=[DataRequired()])
    submit = SubmitField("Submit")