from flask import Blueprint, request, render_template, redirect
from ..models import db, Note
from ..forms import NewNote

note_routes = Blueprint('notes', __name__)

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
#         return
#     return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#Get routes for all notes
@note_routes.route('/', methods=['POST'])
def notes():
    form = NewNote()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = request.get_json(force=True)
        print("THIS IS BACKEND NOTE DATA------------------------->", data)
        new_note = Note(
            owner_id = data["ownerId"],
            trip_id = data["tripId"],
            # Add trip date later
            # trip_date = data["tripDate"],
            note = data["note"],
        )
        db.session.add(new_note)
        db.session.commit()
        return new_note.to_dict

    else:
        print(form.errors)
        return "Bad Data"

    #GET for all notes, all notes should be inside single trip page

@note_routes.route('/trips/<int:id>')
def get_notes(id):

    notes = Note.query.filter(Note.trip_id == id).all()
    # return {"trip_id": [trip.to_dict() for trip in trips]}
    all_notes = {}
    for note in notes:
        all_notes[note.id] = note.to_dict
    return all_notes

@note_routes.route("/<int:id>", methods=["DELETE"])
def delete_note(id):
    note = Note.query.filter(Note.id == id).one()
    db.session.delete(note)
    db.session.commit()
    return {}
