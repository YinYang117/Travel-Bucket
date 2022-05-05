from flask import Blueprint, request, render_template, redirect
from ..forms import NewTrip, EditTrip
from ..models import db, Trip, User
from datetime import datetime
# from flask_login import login_required, current_user


trip_routes = Blueprint('trips', __name__)

# Get route for all trips
# this can have a get if want
@trip_routes.route('/', methods=['POST'])
def trips():

    if request.method == 'POST':
        form = NewTrip()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            data = request.get_json(force=True)
            # Could be NewTrip() below
            # new_trip = Trip()
            # print("NEW TRIP ----------------", new_trip)
            # form.populate_obj(new_trip)
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
            # return redirect('/trips')

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
            current_time = datetime.utcnow()
            print("CURRENT TIME -----------", current_time)
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
        return {
            "users":[user.to_dict() for user in users]
        }

    
    if request.method == "POST":
        data = request.get_json(force=True)
        # so data should look like {"userId: 1, tripId: 1"} when hitting the backend with data
        # print("THIS IS DATA FROM INVITED USERS BACKEND------------------------", data)
        # need to query for the selected user that wants to be added
        user_id_from_data = data["invitedUserId"]
        # print("THIS IS ID--------------------------", user_id_from_data)
        selected_user = User.query.filter(User.id == user_id_from_data).one()
        # print("THIS IS SELECTED USER-------------------------------", selected_user)
        individual_trip = Trip.query.get(id)
        individual_trip.invited_users.append(selected_user)

        db.session.commit()
        print("THIS IS USER TRIP-------------------------------", selected_user.invited_trips)
        return data

    # if request.method == "DELETE":
    #     trip = Trip.query.filter(Trip.id == id).one()
    #     db.session.delete(trip)
    #     db.session.commit()
    #     return {}




