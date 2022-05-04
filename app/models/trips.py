from .db import db
from datetime import datetime
from .trip_invites import trip_invites
from .user import User

class Trip(db.Model):
    __tablename__ = 'trips'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    destination = db.Column(db.String(255), nullable=False)
    image_url = db.Column(db.String(510), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime(), nullable=False, default=datetime.utcnow)

    user = db.relationship("User", back_populates="trips")
    invited_users = db.relationship("User", secondary=trip_invites,back_populates="invited_trips")
    events = db.relationship("Event", back_populates="trip")
    notes = db.relationship("Note", back_populates="trip", cascade="all, delete-orphan")


    @property
    def to_dict(self):
        return {
            "id": self.id,
            "ownerId": self.owner_id,
            "name": self.name,
            "destination": self.destination,
            "imageUrl": self.image_url,
            "startDate": self.start_date,
            "endDate": self.end_date,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
        }

    # We could have a helper funciton to return a limited scope trip aka. a trip with no notes or events for displaying on a sers profile