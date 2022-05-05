from flask import Blueprint, request, render_template, redirect
from flask_login import login_required
from ..models import db, User


invited_users_routes = Blueprint('invited_users', __name__)

@invited_users_routes.route('/', methods=["POST"])
@login_required
def users():
    data = request.get_json(force=True)
    print ("THIS IS DATA IN THE INVITED USERS ROUTES------------", data)
    tripId = data["tripId"]
    user = User.query.filter(User.username == data["userName"]).one()
    print("THIS IS USER FOR THE BACKEND ROUTES--------------", user)
    return {
        "invitedUser": user.to_dict(), "tripId": tripId
    }