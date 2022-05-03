from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, SelectField, BooleanField, DateField
from wtforms.validators import DataRequired

class EditTrip(FlaskForm):
    name = StringField("Trip Name", validators=[DataRequired()])
    destination = StringField("Destination", validators=[DataRequired()])
    image_url = StringField("Image URL")
    start_date = DateField("Start Date")
    end_date = DateField("Start Date")
    updated_at = DateField("Updated At")
    submit = SubmitField("Submit")
