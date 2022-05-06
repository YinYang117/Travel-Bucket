from flask import Blueprint, request, render_template, redirect
from ..forms import NewTrip, EditTrip
from ..models import db, Trip, User
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
        data = request.get_json(force=True)
        new_trip = Trip(
            owner_id=data["ownerId"],
            name=data["name"],
            destination=data["destination"],
            image_url=data["imageUrl"],
            start_date=data["startDate"],
            end_date=data["endDate"],
        )
        db.session.add(new_trip)
        db.session.commit()
        return new_trip.to_dict
      
    else:
        print(form.errors)
        # Make a better form bad data return
        return "Bad Data"


# Get route for a singular trip
@trip_routes.route('/<int:id>')
def trip(id):
    trip = Trip.query.get(id)
    return trip.to_dict()


@trip_routes.route("/users/<int:id>")
def all_user_trips(id):
    trips = Trip.query.filter(Trip.owner_id == id).all()
    # return {"trip_id": [trip.to_dict() for trip in trips]}
    all_trips = {}
    for trip in trips:
        all_trips[trip.id] = trip.to_dict
    return all_trips


@trip_routes.route("/<int:id>", methods=["PUT"])
def edit_trip(id):
    if request.method == 'PUT':
        form = EditTrip()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            data = request.get_json(force=True)
            trip = Trip.query.filter(Trip.id == id).one()

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


@trip_routes.route("/<int:id>", methods=["DELETE"])
def delete_trip(id):
    trip = Trip.query.filter(Trip.id == id).one()
    db.session.delete(trip)
    db.session.commit()
    return {}


@trip_routes.route("/<int:id>/users", methods=["GET", "POST", "DELETE"])
# @login_required
def adding_user(id):

    if request.method == "GET":
        trip = Trip.query.get(id)
        users = trip.invited_users
        # print("THIS IS TRIP", trip.to_dict)
        # print("THIS IS USERS", users)
        return {"users":[user.to_dict() for user in users]}

    
    if request.method == "POST":
        data = request.get_json(force=True)
        # so data should look like {"userId: 1, tripId: 1"} when hitting the backend with data
        print("THIS IS DATA FROM INVITED USERS BACKEND------------------------", data)
        # need to query for the selected user that wants to be added
        user_id_from_data = data["invitedUserId"]
        print("THIS IS ID--------------------------", user_id_from_data)
        selected_user = User.query.filter(User.id == 1)
        print("THIS IS SELECTED USER-------------------------------", selected_user)
        individual_trip = Trip.query.get(id)
        individual_trip.invited_users.append(selected_user)

        db.session.commit()
        return data

    # if request.method == "DELETE":
    #     trip = Trip.query.filter(Trip.id == id).one()
    #     db.session.delete(trip)
    #     db.session.commit()
    #     return {}


#Get routes for all events in a single trip
@trip_routes.route('/<int:id>/events', methods=['GET'])
def events(id):
    events = Event.query.filter(event.trip_id == id).all()
    return events.to_dict()