from .db import db
import simplejson as json


class Location(db.Model):

    __tablename__= 'locations'

    id = db.Column(db.Integer, primary_key= True)
    trip_id = db.Column(db.Integer, db.ForeignKey("trips.id"), nullable=False)
    lat = db.Column(db.Numeric(15, 10), nullable=False)
    lng = db.Column(db.Numeric(15, 10), nullable=False)

    trip = db.relationship("Trip", back_populates="location")

    # @property
    def to_dict(self):
        return {
            'id': self.id,
            "tripId":self.trip_id,
            'lat': json.dumps(self.lat, use_decimal=True),
            'lng': json.dumps(self.lng, use_decimal=True)
        }