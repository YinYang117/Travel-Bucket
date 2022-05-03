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






pipenv run alembic revision -m "the message about the revision"
