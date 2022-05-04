from flask import Blueprint, request, render_template, redirect
from ..models import db, Event
from ..forms import NewEvent, EditEvent

event_routes = Blueprint('events', __name__)

#Post routes for all events
@event_routes.route('/', methods=['POST'])
def events():
    #print("WE ARE IN POST ROUTE BACK END ---------------")

    form = NewEvent()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        #print("FORM HAS VALIDATED -----------------")
        data = request.get_json(force=True)
        #print("DATA IN API ROUTE -----------------", data)
        # no need this line data = request.get_json(force=True)
        # just need to change data[] into form.data[]
        new_event = Event(

            owner_id = data["ownerId"],
            trip_id = data["tripId"],
            name = data["name"],
            description = data["description"],
            image_url = data["imageUrl"],
            location = data["location"],
            start_date = data["startDate"],
            end_date = data["endDate"],
        )
        db.session.add(new_event)
        db.session.commit()
        return new_event.to_dict

    else:
        print(form.errors)
        return "Bad Data"



    #events should be inside single trip
@event_routes.route('/<int:id>')
def event(id):
    events = Event.query.get(id)
    all_trip_events = {}
    for event in events:
        all_trip_events[event.id] = event.to_dict
    return all_trip_events


#edit the single event
@event_routes.route("/<int:id>", methods=["PUT"])
def edit_event(id):


    form = EditEvent()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        #same as above if we want another way
        data = request.get_json(force=True)
        event = Event.query.filter(Event.id == id).one()


        event.name = data["name"],
        event.description = data["description"],
        event.image_url = data["imageUrl"],
        event.location = data["location"],
        event.start_date = data["startDate"],
        event.end_date = data["endDate"],

        db.session.add(event)
        db.session.commit()
        return event.to_dict

#delete the single event
@event_routes.route("/<int:id>", methods=["DELETE"])
def delete_event(id):
    event = Event.query.filter(Event.id == id).one()
    db.session.delete(event)
    db.session.commit()
    return {}
