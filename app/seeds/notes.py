from app.models import db, Note
from datetime import date


# Adds some events, you can add other events here if you want
def seed_notes():
    today = date.today()
    note1 = Note(
        owner_id=1,
        trip_id=1,
        note="Attend the Beach Party! You know who will be there ;) ",
        created_at=today,
        updated_at=today )

    db.session.add(note1)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_notes():
    db.session.execute('TRUNCATE notes RESTART IDENTITY CASCADE;')
    db.session.commit()
