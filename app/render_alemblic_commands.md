import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# After each create_table function in migration files:

def upgrade(): # ... logic to create tables

    if environment == "production":
        op.execute(f"ALTER TABLE <table_name> SET SCHEMA {SCHEMA};")
        #  add an ALTER TABLE command here for each table created in the file
