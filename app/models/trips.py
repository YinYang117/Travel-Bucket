from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import date
from .trip_invites import trip_invites
import simplejson as json

class Trip(db.Model):
    __tablename__ = 'trips'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    destination = db.Column(db.String(255), nullable=False)
    lat = db.Column(db.Numeric(15, 10), nullable=False)
    lng = db.Column(db.Numeric(15, 10), nullable=False)
    image_url = db.Column(db.String, nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    created_at = db.Column(db.Date, nullable=False, default=date.today)
    updated_at = db.Column(db.Date, nullable=False, default=date.today)

    user = db.relationship("User", back_populates="trips")
    invited_users = db.relationship("User", secondary=trip_invites, back_populates="invited_trips")
    events = db.relationship("Event", back_populates="trip", cascade="all, delete-orphan")
    notes = db.relationship("Note", back_populates="trip", cascade="all, delete-orphan")
    location = db.relationship("Location", back_populates="trip", cascade="all, delete-orphan", uselist=False)


    @property
    def to_dict(self):
        return {
            "id": self.id,
            "ownerId": self.owner_id,
            "name": self.name,
            "destination": self.destination,
            'lat': json.dumps(self.lat, use_decimal=True),
            'lng': json.dumps(self.lng, use_decimal=True),
            "imageUrl": self.image_url,
            "startDate": self.start_date,
            "endDate": self.end_date,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
        }

    # We could have a helper funciton to return a limited scope trip
    # aka. a trip with no notes or events for displaying on a user profile page
