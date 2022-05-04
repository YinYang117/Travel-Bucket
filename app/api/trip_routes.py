from flask import Blueprint, request, render_template, redirect
from ..forms import NewTrip, EditTrip
from ..models import db, Trip
from datetime import datetime


trip_routes = Blueprint('trips', __name__)

# Get route for all trips
# this can have a get if want
@trip_routes.route('/', methods=['POST'])
def trips():

    if request.method == 'POST':
        form = NewTrip()
        form['csrf_token'].data = request.cookies['csrf_token']
        print("FORM---------------", form)
        if form.validate_on_submit():
            data = request.get_json(force=True)
            # Could be NewTrip() below
            # new_trip = Trip()
            # print("NEW TRIP ----------------", new_trip)
            # form.populate_obj(new_trip)
            print("BACKEND FORM---------", form)
            print("THIS IS DATA---------------", data)
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