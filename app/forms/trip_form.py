from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, SelectField, BooleanField, DateField
from wtforms.validators import DataRequired

class NewTrip(FlaskForm):
    name = StringField("Trip Name", validators=[DataRequired()])
    destination = StringField("Destination", validators=[DataRequired()])
    imageUrl = StringField("Image URL", validators=[DataRequired()])
    startDate = DateField("Start Date", validators=[DataRequired()])
    endDate = DateField("Start Date", validators=[DataRequired()])
    submit = SubmitField("Submit")
