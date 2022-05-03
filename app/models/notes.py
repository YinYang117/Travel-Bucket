from .db import db
from datetime import datetime


class Note(db.Model):
    __tablename__ = 'notes'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    trip_id = db.Column(db.Integer, db.ForeignKey("trips.id"), nullable=False)
    trip_date = db.Column(db.Date, nullable=True)
    note = db.Column(db.String(1000), nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime(), nullable=False, default=datetime.utcnow)

    trip = db.relationship("Trip", back_populates="notes")
    owner = db.relationship("User", back_populates="owned_notes")

    @property
    def to_dict(self):
        return {
            "id": self.id,
            "ownerId": self.owner_id,
            "tripId":self.trip_id,
            "tripDate": self.trip_date,
            "note": self.note,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
        }
