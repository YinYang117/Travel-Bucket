from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, SelectField, BooleanField, DateField
from wtforms.validators import DataRequired

class NewTrip(FlaskForm):
    name = StringField("Trip Name", validators=[DataRequired()])
    destination = StringField("Destination", validators=[DataRequired()])
    image_url = StringField("Image URL", validators=[DataRequired()])
    start_date = DateField("Start Date", validators=[DataRequired()])
    end_date = DateField("Start Date", validators=[DataRequired()])
    submit = SubmitField("Submit")