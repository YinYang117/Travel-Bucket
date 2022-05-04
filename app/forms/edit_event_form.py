from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, SelectField, BooleanField, DateField
from wtforms.validators import DataRequired
from datetime import datetime

class EditEvent(FlaskForm):
    name = StringField("Event Name", validators=[DataRequired()])
    description = StringField("Description", validators=[DataRequired()])
    image_url = StringField("Image URL", validators=[DataRequired()])
    location = StringField("Location", validators=[DataRequired()])
    start_date = DateField("Start Date", validators=[DataRequired()])
    end_date = DateField("End Date", validators=[DataRequired()])
    current_time = datetime.utcnow()
    updated_at = current_time
    submit = SubmitField("Submit")
