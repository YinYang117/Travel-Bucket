from flask_wtf import FlaskForm
from wtforms import IntegerField, SubmitField
from wtforms.validators import DataRequired


class NewTripInvite(FlaskForm):
    ownerId = IntegerField("Owner", validators=[DataRequired()])
    tripId = IntegerField("Associated Trip", validators=[DataRequired()])
    submit = SubmitField("Submit")
