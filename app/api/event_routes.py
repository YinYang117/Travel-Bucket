from flask import Blueprint, request, render_template, redirect
from ..models import db, Event
from ..forms import NewEvent, EditEvent

event_routes = Blueprint('events', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# example: if good return normal, else return errors
# so that we can catch those errors on the front end
# form.errors come from using a Form() to validate or run custom functions
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}

    if form.validate_on_submit():
        return
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


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



    #events should be inside single trip
@event_routes.route('/<int:id>')
def event(id):
    events = Event.query.get(id)
    all_trip_events = {}
    for event in events:
        all_trip_events[event.id] = event.to_dict
    return all_trip_events


#edit the single event
@event_routes.route("/<int:id>", methods=["PUT"])
def edit_event(id):

    form = EditEvent()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print("backend event api route edited event form validated")
        #same as above if we want another way
        data = request.get_json(force=True)
        event = Event.query.filter(Event.id == id).one()

        event.name = data["name"],
        event.description = data["description"],
        event.image_url = data["imageUrl"],
        event.location = data["location"],
        event.start_date = data["startDate"],
        event.end_date = data["endDate"],

        db.session.add(event)
        db.session.commit()
        return event.to_dict


#delete the single event
@event_routes.route("/<int:id>", methods=["DELETE"])
def delete_event(id):
    event = Event.query.filter(Event.id == id).one()
    db.session.delete(event)
    db.session.commit()
    return {}
