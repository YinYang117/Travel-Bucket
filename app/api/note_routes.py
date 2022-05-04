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
