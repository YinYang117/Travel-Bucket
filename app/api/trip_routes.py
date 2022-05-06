from flask import Blueprint, request, render_template, redirect
from ..forms import NewTrip, EditTrip
from ..models import db, Trip, User, Event
from datetime import datetime
# from flask_login import login_required, current_user


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

# example: if good return normal, else return errors
# so that we can catch those errors on the front end
# form.errors come from using a Form() to validate or run custom functions
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}

    if form.validate_on_submit():
        return stuff
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@trip_routes.route('/', methods=['POST'])
def trips():
    form = NewTrip()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_trip = Trip(
            owner_id=form.data["ownerId"],
            name=form.data["name"],
            destination=form.data["destination"],
            image_url=form.data["imageUrl"],
            start_date=form.data["startDate"],
            end_date=form.data["endDate"],
        )
        db.session.add(new_trip)
        db.session.commit()
        return new_trip.to_dict
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# Get route for a singular trip
@trip_routes.route('/<int:id>')
def trip(id):
    trip = Trip.query.get(id)
    return trip.to_dict()


@trip_routes.route("/users/<int:id>")
def users_owned_trips(id):
    trips = Trip.query.filter(Trip.owner_id == id).all()
    if trips:
        all_trips = {}
        for trip in trips:
            all_trips[trip.id] = trip.to_dict
        return all_trips
    else:
        return {'error': ['No Trips found for this User']}


@trip_routes.route("/<int:id>", methods=["PUT", "DELETE"])
def change_trip(id):
    if request.method == 'PUT':
        form = EditTrip()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            trip = Trip.get(id)
            trip.name= data["name"]
            trip.destination = data["destination"]
            trip.image_url = data["imageUrl"]
            trip.start_date = data["startDate"]
            trip.end_date = data["endDate"]
            current_time = date.today
            trip.updated_at = current_time

            db.session.add(trip)
            db.session.commit()
            return trip.to_dict
        else:
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    else:
        trip = Trip.get(id)
        db.session.delete(trip)
        db.session.commit()
        return {}   


@trip_routes.route("/<int:id>/users", methods=["GET", "POST", "DELETE"])
def trip_users(id):

    if request.method == "GET":
        trip = Trip.get(id)
        all_users = trip.invited_users
        if all_users:
            users = {}
            for user in all_users:
                users[user.id] = user.to_dict()
            return users
        else:
            return {'error': ['No Users found for this Trip']}

    if request.method == "POST":
        data = request.get_json(force=True)
        # data should look like {"userId: 1, tripId: 1"}
        user_id = data["invitedUserId"]
        user = User.get(user_id)
        trip = Trip.query.get(id)
        if user and trip:
            trip.invited_users.append(user)
        else:
            return {'error': ['Either User or Trip was not found']}

        db.session.commit()
        # print(trip.invited_users)
        # can return anything really
        return trip

    if request.method == "DELETE":
        # I think we need relation.c.the_id == incoming ID to check
        # When interacting with a table instead of a model.
        # as is, id ^ is for trip.
        results = trip_invites.query.filter(invited_users.c.user_id == UserId).filter(invited_trips.c.trip_id == id).all()
        db.session.delete(results)
        db.session.commit()
        return {}


#Get routes for all events in a single trip
@trip_routes.route('/<int:id>/events', methods=['GET'])
def trip_events(id):
    trip_events = Event.query.filter(event.trip_id == id).all()
    if trip_events:
        all_events = {}
        for event in trips_events:
            all_events[event.id] = event.to_dict
        return all_events
    else:
        return {'error': ['No Events found for this Trip']}

