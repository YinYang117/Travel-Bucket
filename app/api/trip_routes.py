from flask import Blueprint
from ..models import db, Trip

trip_routes = Blueprint('trips', __name__)