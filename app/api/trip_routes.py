from flask import Blueprint, request, render_template, redirect
from ..forms import NewTrip
from ..models import db, Trip


trip_routes = Blueprint('trips', __name__)

# Get route for all trips
@trip_routes.route('/', methods=['GET', 'POST'])
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

    else:
        trips = Trip.query.all()
        return {'trips': [trip.to_dict() for trip in trips]}

# Get route for a singular trip
@trip_routes.route('/<int:id>')
def trip(id):
    trip = Trip.query.get(id)
    return trip.to_dict()
