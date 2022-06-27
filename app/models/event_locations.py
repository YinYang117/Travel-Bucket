from .db import db
import simplejson as json


class Event_location(db.Model):

    __tablename__= 'event_locations'

    id = db.Column(db.Integer, primary_key= True)
    event_id = db.Column(db.Integer, db.ForeignKey("events.id"), nullable=False)
    info = db.Column(db.String)
    location = db.Column(db.String)
    address = db.Column(db.String)
    city = db.Column(db.String)
    state = db.Column(db.String)
    country = db.Column(db.String)
    lat = db.Column(db.Numeric(15, 10))
    lng = db.Column(db.Numeric(15, 10))

    event = db.relationship("Event", back_populates="event_locations")

    # @property
    def to_dict(self):
        return {
            'id': self.id,
            "tripId":self.event_id,
            'info': self.info,
            'location': self.location,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'country': self.country,
            'lat': json.dumps(self.lat, use_decimal=True),
            'lng': json.dumps(self.lng, use_decimal=True)
        }