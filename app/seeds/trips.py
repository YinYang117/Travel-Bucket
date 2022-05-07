from app.models import db, Trip
from datetime import date


# Adds some trips, you can add other trips here if you want
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

    trip4 = Trip(
        owner_id=1,
        name="On to Everest",
        destination='Nepal', 
        image_url="https://cdn.pixabay.com/photo/2019/12/13/08/21/gokyo-ri-4692458__340.jpg",
        start_date=date(2022,7,10),
        end_date=date(2022,7,25),
        created_at=today,
        updated_at=today )

    trip5 = Trip(
        owner_id=2,
        name="Other side of the Pond",
        destination='UK', 
        image_url="https://cdn.pixabay.com/photo/2014/11/22/08/37/thames-541456_960_720.jpg",
        start_date=date(2022,6,10),
        end_date=date(2022,6,15),
        created_at=today,
        updated_at=today )

    trip6 = Trip(
        owner_id=3,
        name="Trip through History",
        destination='Egypt', 
        image_url="https://cdn.pixabay.com/photo/2017/08/24/05/21/pyramid-2675466__340.jpg",
        start_date=date(2022,8,8),
        end_date=date(2022,8,14),
        created_at=today,
        updated_at=today )

    trip6 = Trip(
        owner_id=4,
        name="Machu Picchu visit",
        destination='Peru', 
        image_url="https://cdn.pixabay.com/photo/2016/01/13/17/48/machupicchu-1138641__340.jpg",
        start_date=date(2022,5,28),
        end_date=date(2022,6,6),
        created_at=today,
        updated_at=today )

    trip7 = Trip(
        owner_id=1,
        name="Ice Cold Serenity",
        destination='Iceland', 
        image_url="https://cdn.pixabay.com/photo/2016/10/18/21/28/seljalandsfoss-1751463__340.jpg",
        start_date=date(2022,6,11),
        end_date=date(2022,6,19),
        created_at=today,
        updated_at=today )

    trip8 = Trip(
        owner_id=2,
        name="Out in the Outback",
        destination='Australia', 
        image_url="https://cdn.pixabay.com/photo/2018/05/07/22/08/opera-house-3381786__340.jpg",
        start_date=date(2022,7,11),
        end_date=date(2022,7,20),
        created_at=today,
        updated_at=today )

    trip9 = Trip(
        owner_id=3,
        name="Trip to the South East",
        destination='Singapore', 
        image_url="https://cdn.pixabay.com/photo/2020/05/24/12/06/jewel-5213953__340.jpg",
        start_date=date(2022,8,5),
        end_date=date(2022,8,11),
        created_at=today,
        updated_at=today )

    trip10 = Trip(
        owner_id=4,
        name="Athens and more...",
        destination='Greece', 
        image_url="https://cdn.pixabay.com/photo/2014/08/12/00/01/santorini-416135__340.jpg",
        start_date=date(2022,9,5),
        end_date=date(2022,9,15),
        created_at=today,
        updated_at=today )

    db.session.add(trip1)
    db.session.add(trip2)
    db.session.add(trip3)
    db.session.add(trip4)
    db.session.add(trip5)
    db.session.add(trip6)
    db.session.add(trip7)
    db.session.add(trip8)
    db.session.add(trip9)
    db.session.add(trip10)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_trips():
    db.session.execute('TRUNCATE trips RESTART IDENTITY CASCADE;')
    db.session.commit()
