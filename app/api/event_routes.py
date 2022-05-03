from flask import Blueprint, request, render_template, redirect
from ..models import db, Event
from ..forms import NewEvent

event_routes = Blueprint('events', __name__)

#Get routes for all events
@event_routes.route('/', methods=['POST'])
def events():


    form = NewEvent()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = request.get_json(force=True)
        new_event = Event(
            owner_id = data["ownerId"],
            trip_id = data["tripId"],
            name = data["name"],
            description = data["description"],
            image_url = data["imageUrl"],
            location = data["location"],
            start_date = data["startDate"],
            end_date = data["endDate"],
        )
        db.session.add(new_event)
        db.session.commit()
        return new_event.to_dict

    else:
        print(form.errors)
        return "Bad Data"

    #GET for all events, events should be inside single trip
