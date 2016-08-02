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
* You may want to add a hosts entry to point `respondreact.com` to `127.0.0.1`. Otherwise, change the /front/js/constants.js `ApiUrl` field to your preferred url