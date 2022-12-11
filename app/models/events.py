from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import date, datetime
import simplejson as json


class Event(db.Model):
    __tablename__ = 'events'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    trip_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("trips.id")), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(4000), nullable=False)
    image_url = db.Column(db.String, nullable=False)
    location = db.Column(db.String(255), nullable=False)
    lat = db.Column(db.Numeric(15, 10), nullable=False)
    lng = db.Column(db.Numeric(15, 10), nullable=False)
    start_date = db.Column(db.DateTime, nullable=True)
    end_date = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.Date, nullable=False, default=date.today)
    updated_at = db.Column(db.Date, nullable=False, default=date.today)


    owner = db.relationship("User", back_populates="owned_events")
    trip = db.relationship("Trip", back_populates="events")
    event_locations = db.relationship("Event_location", back_populates="event", cascade="all, delete-orphan")

    @property
    def to_dict(self):
        return {
            "id": self.id,
            "ownerId": self.owner_id,
            "tripId":self.trip_id,
            "name": self.name,
            "description": self.description,
            "imageUrl": self.image_url,
            "location": self.location,
            'lat': json.dumps(self.lat, use_decimal=True),
            'lng': json.dumps(self.lng, use_decimal=True),
            "startDate": self.start_date,
            "endDate": self.end_date,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
        }
