from .db import db
from datetime import datetime


class Note(db.Model):
    __tablename__ = 'notes'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, nullable=False)
    trip_id = db.Column(db.Integer, nullable=False)
    trip_date = db.Column(db.Date, nullable=False)
    note = db.Column(db.String(1000), nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime(), nullable=False, default=datetime.utcnow)


#relations?

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
