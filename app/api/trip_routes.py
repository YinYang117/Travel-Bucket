from flask import Blueprint, request, render_template, redirect
from ..forms import NewTrip, EditTrip
from ..models import db, Trip, User, Event, trip_invites
from datetime import date


trip_routes = Blueprint('trips', __name__)

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


@trip_routes.route('/', methods=['POST'])
def trips():
    form = NewTrip()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_trip = Trip(
            owner_id=form.data["ownerId"],
            name=form.data["name"],
            destination=form.data["destination"],
            lng=form.data["lng"],
            lat=form.data["lat"],
            image_url=form.data["imageUrl"],
            start_date=form.data["startDate"],
            end_date=form.data["endDate"],

        )
        db.session.add(new_trip)
        db.session.commit()
        return new_trip.to_dict
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@trip_routes.route("/users/<int:id>")
def users_owned_trips(id):
    trips = Trip.query.filter(Trip.owner_id == id).all()
    user = User.query.get(id)
    invited_on_trips = user.invited_trips

    if trips and invited_on_trips:
        made_trips = {}
        other_trips = {}
        for trip in trips:
            made_trips[trip.id] = trip.to_dict
        for invited_trip in invited_on_trips:
            other_trips[invited_trip.id] = invited_trip.to_dict
        return {**made_trips, **other_trips}
    elif trips and not invited_on_trips:
        made_trips = {}
        for trip in trips:
            made_trips[trip.id] = trip.to_dict
        return made_trips
    # else:
    #     return {'error': ['No Trips found for this User']}
    # causing an error rendering, and refactored so this isnt needed.


@trip_routes.route("/<int:id>", methods=["GET", "PUT", "DELETE"])
def change_trip(id):
    if request.method == 'GET':
        trip = Trip.query.get(id)
        if trip:
            return trip.to_dict
        else:
            return {'error': ['No Trip Found']}
    if request.method == 'PUT':
        form = EditTrip()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            trip = Trip.query.get(id)
            trip.name= form.data["name"]
            trip.destination = form.data["destination"]
            trip.image_url = form.data["imageUrl"]
            trip.start_date = form.data["startDate"]
            trip.end_date = form.data["endDate"]
            current_time = date.today()
            trip.updated_at = current_time

            db.session.add(trip)
            db.session.commit()
            return trip.to_dict
        else:
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    else:
        trip = Trip.query.get(id)
        db.session.delete(trip)
        db.session.commit()
        return {}


@trip_routes.route("/<int:id>/users", methods=["GET", "POST", "DELETE"])
def trip_users(id):

    if request.method == "GET":
        trip = Trip.query.get(id)
        all_users = trip.invited_users
        users = {}
        for user in all_users:
            users[user.id] = user.to_dict()
        return users

    if request.method == "POST":
        data = request.get_json(force=True)
        # data should look like {"userId: 1, tripId: 1"}
        user_id = data["invitedUserId"]
        user = User.query.get(user_id)
        trip = Trip.query.get(id)
        if user and trip:
            trip.invited_users.append(user)
        else:
            return {'error': ['Either User or Trip was not found']}

        db.session.commit()
        return trip.to_dict

    if request.method == "DELETE":
        data = request.get_json(force=True)
        userId = data["invitedUserId"]
        user = User.query.get(userId)
        trip = Trip.query.get(id)
        trip.invited_users.remove(user)
        db.session.commit()
        return {}


#Get routes for all events in a single trip
@trip_routes.route('/<int:id>/events', methods=['GET'])
def trip_events(id):
    trip_events = Event.query.filter(Event.trip_id == id).all()
    if trip_events:
        all_events = {}
        for event in trip_events:
            all_events[event.id] = event.to_dict
        return all_events
    else:
        return {'error': ['No Events found for this Trip']}
