from app.models import db, Trip
from datetime import date


# Adds a demo trip, you can add other trips here if you want
def seed_trips():
    today = date.today()
    trip1 = Trip(
        owner_id=1,
        name="Spring Break Trip",
        destination='Hawaii', 
        image_url="https://images.unsplash.com/photo-1598135753163-6167c1a1ad65?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80",
        start_date=date(2022,5,10),
        end_date=date(2022,5,24),
        created_at=today,
        updated_at=today )

    trip2 = Trip(
        owner_id=1,
        name="App Academy Graduation Trip",
        destination='Colorado', 
        image_url="https://images.unsplash.com/photo-1423450822265-fcd97e52ecb5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1204&q=80",
        start_date=date(2022,6,5),
        end_date=date(2022,6,17),
        created_at=today,
        updated_at=today )

    trip3 = Trip(
        owner_id=2,
        name="I Quit My Job Trip",
        destination='Japan', 
        image_url="https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        start_date=date(2022,7,5),
        end_date=date(2022,7,19),
        created_at=today,
        updated_at=today )

    db.session.add(trip1)
    db.session.add(trip2)
    db.session.add(trip3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_trips():
    db.session.execute('TRUNCATE trips RESTART IDENTITY CASCADE;')
    db.session.commit()
