from flask.cli import AppGroup
from .users import seed_users, undo_users
from .trips import seed_trips, undo_trips
from .invited_users import seed_invited_users, undo_invited_users
from .events import seed_events, undo_events
from .notes import seed_notes, undo_notes
from .locations import seed_locations, undo_locations
from .event_locations import seed_event_locations, undo_event_locations
from app.models.db import db, environment, SCHEMA


# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding, truncate all tables prefixed with schema name
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        # TODO EACH TABLE NEEDS THIS db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        # In the starter they have a seed undo command with truncate isntead
        # Add a truncate command here for every table that will be seeded.
        db.session.commit()
    seed_users()
    seed_trips()
    seed_invited_users()
    seed_events()
    seed_notes()
    seed_locations()
    seed_event_locations()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():

    undo_invited_users()
    undo_trips()
    undo_users()
    undo_events()
    undo_notes()
    undo_locations()
    undo_event_locations()
    # Add other undo functions here
