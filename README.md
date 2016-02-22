## Backend setup (REQUIRES PYTHON 3)
* `pip install virtualenv`
* `mkdir ~/.venv/` (if necessary)
* `which python3`
* `virtualenv ~/.venv/untitled -p /usr/local/bin/python3 [use path to python from previous command]` 
* `source ~/.venv/untitled/bin/activate`
* `pip install -r back/requirements.txt`
* `cd back`
* `python manage.py runserver 8100`
* `python manage.py syncdb`

## Frontend setup
* `npm i`
* `gulp`

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

### Misc.
* You may want to add a hosts entry to point `squ.ad` to `127.0.0.1`. Otherwise, change the /front/js/constants.js `ApiUrl` field to your preferred url