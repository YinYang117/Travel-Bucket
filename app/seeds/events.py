from app.models import db, Event
from datetime import date


def seed_events():
    today = date.today()
    event1 = Event(
        owner_id=1,
        trip_id=1,
        name="Beach Party",
        description='Party on the Beach', 
        image_url="https://cdn.pixabay.com/photo/2017/06/23/04/49/beach-2433476__480.jpg",
        location='Kūhiō Beach',
        lat=21.280693,
        lng=-157.834549,
        start_date=date(2022,5,10),
        end_date=date(2022,5,10),
        created_at=today,
        updated_at=today )
    
    event2 = Event(
        owner_id=1,
        trip_id=1,
        name="2-Day CoastLine Tour",
        description='East Side of the Island', 
        image_url="https://images.pexels.com/photos/2521619/pexels-photo-2521619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        location='Kailua Beach Park',
        lat=21.3991667,
        lng=-157.7263889,
        start_date=date(2022,5,11),
        end_date=date(2022,5,12),
        created_at=today,
        updated_at=today )

    event3 = Event(
        owner_id=1,
        trip_id=1,
        name="Dinner Plans!",
        description='The Grand Hotel Restraurant Reservations', 
        image_url="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
        location='Waikīkī Grand Hotel',
        lat=21.271931,
        lng=-157.821655,
        start_date=date(2022,5,12),
        end_date=date(2022,5,12),
        created_at=today,
        updated_at=today )

    event4 = Event(
        owner_id=1,
        trip_id=1,
        name="Cooking Class",
        description='Learn how to make classic Hawian Food', 
        image_url="https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
        location='The Royal Hawaiian',
        lat=21.277620,
        lng=-157.829147,
        start_date=date(2022,5,18),
        end_date=date(2022,5,18),
        created_at=today,
        updated_at=today )

    event5 = Event(
        owner_id=1,
        trip_id=1,
        name="Morning Hike",
        description='A very fun and highly recommended hiking spot', 
        image_url="https://images.unsplash.com/photo-1465188162913-8fb5709d6d57?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
        location='Diamond Head Crater Hike',
        lat=21.274380,
        lng=-157.816060,
        start_date=date(2022,5,15),
        end_date=date(2022,5,15),
        created_at=today,
        updated_at=today )

    event6 = Event(
        owner_id=1,
        trip_id=2,
        name="Dinner in Denver",
        description='This place is very highly recommended, gonna check it out first day', 
        image_url="https://cdn.pixabay.com/photo/2015/05/31/11/18/table-setting-791148_960_720.jpg",
        location='Corinne Restaurant',
        lat=39.744060,
        lng=-104.993720,
        start_date=date(2022,6,5),
        end_date=date(2022,6,5),
        created_at=today,
        updated_at=today )


    db.session.add(event1)
    db.session.add(event2)
    db.session.add(event3)
    db.session.add(event4)
    db.session.add(event5)
    db.session.add(event6)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_events():
    db.session.execute('TRUNCATE events RESTART IDENTITY CASCADE;')
    db.session.commit()
