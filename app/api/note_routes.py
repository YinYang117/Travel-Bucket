from flask import Blueprint, request, render_template, redirect
from ..models import db, Note
from ..forms import NewNote
from datetime import date

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
#         return stuff
#     else:
#         return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#Get routes for all notes
@note_routes.route('/', methods=['POST'])
def new_note():
    form = NewNote()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # data = request.get_json(force=True) # not needed if using form.
        new_note = Note(
            owner_id = form.data["ownerId"],
            trip_id = form.data["tripId"],
            trip_date = form.data["tripDate"],
            note = form.data["note"],
        )
        db.session.add(new_note)
        db.session.commit()
        return new_note.to_dict
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@note_routes.route("/<int:id>", methods=["PUT", "DELETE"])
def note_changes(id):
    if request.method == "DELETE":
        note = Note.query.get(id)
        db.session.delete(note)
        db.session.commit()
        return {}
    
    else:
        if form.validate_on_submit():
            this_note = Note.query.get(id)
            this_note.note = form.data["note"],
            this_note.trip_date = form.data["tripDate"],
            current_time = date.today()
            this_note.updated_at = current_time

            db.session.add(this_note)
            db.session.commit()
            return this_note.to_dict
        else:
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@note_routes.route('/trips/<int:id>')
def get_trip_notes(id):
    notes = Note.query.filter(Note.trip_id == id).all()
    # if notes:
    all_notes = {}
    for note in notes:
        all_notes[note.id] = note.to_dict
    return all_notes
    # else:
    #     return {'error': ['No Notes found']}

