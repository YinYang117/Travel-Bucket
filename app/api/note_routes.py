from flask import Blueprint
from ..models import db, Note

note_routes = Blueprint('notes', __name__)