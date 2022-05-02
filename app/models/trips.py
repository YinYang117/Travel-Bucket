from .db import db


class Trip(db.Model):
    __tablename__ = 'trips'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    destination = db.Column(db.String(255), nullable=False)
    image_url = db.Column(db.String(510), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    created_at = db.Column(db.Date, nullable=False)
    updated_at = db.Column(db.Date, nullable=False)

    # events is a variable name that will be in the other models
    # events = db.relationship("Event", back_populates=("trip"))

    # notes = db.relationship("Note", back_populates=("trip"))

    @property
    def to_dict(self):
        return {
            "id": self.id,
            "owner_id": self.owner_id,
            "name": self.name,
            "destination": self.destination,
            "image_url": self.image_url,
            "start_date": self.start_date,
            "end_date": self.end_date,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }

    # We could have a helper funciton to return a limited scope trip aka. a trip with no notes or events for displaying on a sers profile
