from .db import db
from datetime import datetime



class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, nullable=False)
    trip_id = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(4000), nullable=False)
    image_url = db.Column(db.String(510), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime(), nullable=False, default=datetime.utcnow)


    #not sure the relationship with trip
   # events = db.relationship("Event", back_populates=("trip"))

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
            "startDate": self.start_date,
            "endDate": self.end_date,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
        }
