## Backend setup
* `pip install virtualenv`
* `mkdir ~/.venv/` (if necessary)
* `virtualenv ~/.venv/untitled`
* `source ~/.venv/bin/activate`
* `pip install -r requirements.txt`
* `cd back`
* `python manage.py runserver`

### If you want a fresh db
* delete db.sqlite3
* `python manage.py migrate`
* `python manage.py makemigrations`
* `python manage.py syncdb`

### To view the db
* cd back
* `sqlite3 db.sqlite3`
* to display tables: `.tables`
* to display headers: `.headers on`
## Frontend setup
`gulp dev`