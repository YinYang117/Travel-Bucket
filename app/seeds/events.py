from app.models import db, Event
from datetime import date


# Adds some events, you can add other events here if you want
def seed_events():
    today = date.today()
    event1 = Event(
        owner_id=1,
        trip_id=1,
        name="Beach Party",
        description='Party on the Beach', 
        image_url="https://cdn.pixabay.com/photo/2017/06/23/04/49/beach-2433476__480.jpg",
        location='The Beach', 
        start_date=date(2022,5,10),
        end_date=date(2022,5,11),
        created_at=today,
        updated_at=today )

    db.session.add(event1)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_events():
    db.session.execute('TRUNCATE events RESTART IDENTITY CASCADE;')
    db.session.commit()