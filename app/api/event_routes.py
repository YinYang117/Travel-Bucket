from flask import Blueprint, request, render_template, redirect
from ..models import db, Event
from ..forms import NewEvent, EditEvent
from datetime import date

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

# # example: if good return normal, else return errors
# # so that we can catch those errors on the front end
# # form.errors come from using a Form() to validate or run custom functions
#     if current_user.is_authenticated:
#         return current_user.to_dict()
#     return {'errors': ['Unauthorized']}

#     if form.validate_on_submit():
#         return stuff
#     else:
#         return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@event_routes.route('/', methods=['POST'])
def events():
    form = NewEvent()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # data = request.get_json(force=True) # not needed if using form.
        new_event = Event(
            owner_id = form.data["ownerId"],
            trip_id = form.data["tripId"],
            name = form.data["name"],
            description = form.data["description"],
            image_url = form.data["imageUrl"],
            location = form.data["location"],
            start_date = form.data["startDate"],
            end_date = form.data["endDate"],
        )
        db.session.add(new_event)
        db.session.commit()
        return new_event.to_dict
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@event_routes.route('/<int:id>', methods=["GET", "PUT", "DELETE"])
def event(id):
    if request.method == "GET":
        event = Event.query.get(id)
        if event:
            return event.to_dict
        else:
            return {'error': ['Event not found']}

    if request.method == "PUT":
        data = request.get_json(force=True) # not needed if using form.
        print("data for PUT event api--------------------------------", data)
        form = EditEvent()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            event = Event.query.get(id)
            event.name = form.data["name"],
            event.description = form.data["description"],
            event.image_url = form.data["imageUrl"],
            event.location = form.data["location"],
            event.start_date = form.data["startDate"],
            event.end_date = form.data["endDate"],
            current_time = date.today()
            event.updated_at = current_time

            db.session.add(event)
            db.session.commit()
            return event.to_dict
        else:
            print("errors ---------", form.errors)
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401

    if request.method == "DELETE":
        event = Event.query.get(id)
        db.session.delete(event)
        db.session.commit()
        return {}
