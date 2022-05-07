from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    ryan = User(
        username='Ryan', email='ryan@aa.io', password='password')
    huyen = User(
        username='Huyen', email='huyen@aa.io', password='password')
    kicky = User(
        username='Kicky', email='kicky@aa.io', password='password')
    suwan = User(
        username='Suwan', email='suwan@aa.io', password='password')

    db.session.add(demo)
    db.session.add(ryan)
    db.session.add(huyen)
    db.session.add(kicky)
    db.session.add(suwan)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
