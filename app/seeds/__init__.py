from flask.cli import AppGroup
from .users import seed_users, undo_users
from .trips import seed_trips, undo_trips
from .invited_users import seed_invited_users, undo_invited_users
from .events import seed_events, undo_events
from .notes import seed_notes, undo_notes
from .locations import seed_locations, undo_locations
from .event_locations import seed_event_locations, undo_event_locations


# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
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
