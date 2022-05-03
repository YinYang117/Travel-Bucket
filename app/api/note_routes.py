from flask import Blueprint, request, render_template, redirect
from ..models import db, Note
from ..forms import NewNote

note_routes = Blueprint('notes', __name__)

#Get routes for all notes
@note_routes.route('/', methods=['POST'])
def notes():


    form = NewNote()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = request.get_json(force=True)
        new_note = Note(
            owner_id = data["ownerId"],
            trip_id = data["tripId"],
            trip_date = date["tripDate"],
            note = data["note"],
        )
        db.session.add(new_note)
        db.session.commit()
        return new_note.to_dict

    else:
        print(form.errors)
        return "Bad Data"

    #GET for all notes, all notes should be inside single trip page
