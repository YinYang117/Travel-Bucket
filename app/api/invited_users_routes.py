from flask import Blueprint, request, render_template, redirect
from flask_login import login_required
from ..models import db, User

invited_users_routes = Blueprint('invited_users', __name__)

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


@invited_users_routes.route('/', methods=["POST"])
@login_required
def users():
    data = request.get_json(force=True)
    print ("THIS IS DATA IN THE INVITED USERS ROUTES------------", data)
    tripId = data["tripId"]
    user = User.query.filter(User.username == data["userName"]).one()
    print("THIS IS USER FOR THE BACKEND ROUTES--------------", user)
    if user:
        return {
            "invitedUser": user.to_dict(), "tripId": tripId
        }
    else:
        return {
            "error" : "This user does not exist. Please type an existing user."
        }