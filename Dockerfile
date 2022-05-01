# Start with the python:3.9 image
FROM python:3.9
# Set the following enviroment variables
#
# REACT_APP_BASE_URL -> Your deployment URL
ENV REACT_APP_BASE_URL=https://travel-bucket-app.herokuapp.com/

# FLASK_APP -> entry point to your flask app
ENV FLASK_APP=app

# FLASK_ENV -> Tell flask to use the production server
ENV FLASK_ENV=production

# SQLALCHEMY_ECHO -> Set to True
ENV SQLALCHEMY_ECHO=True

# Some things are done for us as part of the continous deployment (CICD)

# Set the directory for upcoming commands to /var/www
WORKDIR /var/www

# Copy all the files from your repo to the working directory
COPY . .

# Copy the built react app (it's built for us) from the  
# /react-app/build/ directory into your flasks app/static directory
COPY /react-app/build/* app/static/

# Run the next two python install commands with PIP
RUN pip install -r requirements.txt
RUN pip install psycopg2


# Start the flask environment by setting our
# closing command to gunicorn app:app
# or another (sgui or guni?) server
CMD gunicorn app:app