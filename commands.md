Note: App is the flask backend. react-app is frontend

pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt

psql
create user travel_bucket_dev with password 'arst1234';
create database travel_bucket_app with owner travel_bucket_dev;

Back End --------------
other readme commands
pipenv run flask run

Front End -------------
cd react-app
npm i
npm start


Seeds are not automatically done
heroku run -a travel-bucket-app flask seed all
heroku run -a travel-bucket-app flask seed undo


github cheats
git fetch origin branchName  -- should pull changes into the branch your on from branchName


Add a model
pipenv run flask db migrate     to autogenerate a migration
pipenv run flask db upgrade     to apply table and model changes to the database


pipenv run flask db migrate -m "create a table message"
pipenv run flask db upgrade


<!-- possibly try
created_at = db.Column(db.DateTime(), default=datetime.utcnow, nullable=False)

Dont run alembic directly:
<!-- pipenv run alembic revision -m "the message about the revision" -->