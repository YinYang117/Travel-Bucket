from flask import Blueprint, jsonify
from flask_login import login_required
import os
from app.models import Location, Event_location
from sqlalchemy import text

map_routes = Blueprint('map', __name__)


@map_routes.route('/key', methods=['POST'])
@login_required
def load_map_key():
    key = os.environ.get('MAPS_API_KEY')
    return {'googleMapsAPIKey': key}


@map_routes.route('/<string:lat>/<string:lng>/<string:zoom>')
@login_required
def get_places(lat, lng, zoom):

    zoom = int(zoom)
    distance = 15
    if zoom > 10:
        distance = distance / pow(2, zoom - 10)
    if zoom < 10:
        distance = distance * pow(2, 10 - zoom)


    clause = "SQRT(POW(69.1 * (lat - :lati),2) + POW(69.1 * (:long - lng) * COS(lat / 57.3),2)) < :d"

    # places = Event_location.query.filter(text(clause)).params(lati=lat, long=lng, d=distance).all()

    places_trip = Location.query.filter(text(clause)).params(lati=lat, long=lng, d=distance).all()

    print("THIS IS PLACES BACKEND-----------", places_trip)

    return {'places': [place.to_dict() for place in places_trip]}

@map_routes.route('/<int:id>') 
@login_required
def get_location(id):

    trip_map = Location.query.filter(Location.trip_id == id).one()
    
    return trip_map.to_dict()
