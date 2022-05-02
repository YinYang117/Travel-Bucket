from flask import Blueprint
from ..models import db, Event

event_routes = Blueprint('events', __name__)