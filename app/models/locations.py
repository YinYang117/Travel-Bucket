from .db import db
import simplejson as json


class Location(db.Model):

    __tablename__= 'locations'

    id = db.Column(db.Integer, primary_key= True)
    trip_id = db.Column(db.Integer, db.ForeignKey("trips.id"), nullable=False)
    city = db.Column(db.String)
    state = db.Column(db.String)
    country = db.Column(db.String)
    lat = db.Column(db.Numeric(15, 10))
    lng = db.Column(db.Numeric(15, 10))

    trip = db.relationship("Trip", back_populates="location")

    # @property
    def to_dict(self):
        return {
            'id': self.id,
            "tripId":self.trip_id,
            'city': self.city,
            'state': self.state,
            'country': self.country,
            'lat': json.dumps(self.lat, use_decimal=True),
            'lng': json.dumps(self.lng, use_decimal=True)
        }