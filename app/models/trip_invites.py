from .db import db, environment, SCHEMA, add_prefix_for_prod

trip_invites = db.Table("trip_invites",
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column("trip_id", db.Integer, db.ForeignKey(add_prefix_for_prod("trips.id")), primary_key=True)
)

if environment == "production":
    trip_invites.schema = SCHEMA
