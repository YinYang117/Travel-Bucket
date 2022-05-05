from app.models import db, trip_invites

def seed_invited_users():

    seed1 = trip_invites.insert().values(user_id = 1, trip_id = 1)
    seed2 = trip_invites.insert().values(user_id = 2, trip_id = 2)
   

    db.session.execute(seed1)
    db.session.execute(seed2)
    db.session.commit()


def undo_invited_users():

    db.session.execute("TRUNCATE trip_invites RESTART IDENTITY CASCADE")
    db.session.commit()
