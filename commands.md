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
git fetch origin
git checkout name_of_branch
git pull



<<<<<<< HEAD
Add a model
Run   pipenv run flask db migrate     to autogenerate a migration
Run   pipenv run flask db upgrade     to apply it to the database


pipenv run flask db migrate -m "create a table message"
pipenv run flask db upgrade


<!-- possibly try
created_at = db.Column(db.DateTime(), default=datetime.utcnow, nullable=False)
psql -c "INSERT INTO trips(id, owner_id, name,blah blah blah) VALUES (your stuff)" -->


pipenv run alembic revision -m "the message about the revision"