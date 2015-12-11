## Backend setup
* `pip install virtualenv`
* `mkdir ~/.venv/` (if necessary)
* `virtualenv ~/.venv/untitled`
* `source ~/.venv/untitled/bin/activate`
* `pip install -r back/requirements.txt`
* `cd back`
* `python manage.py runserver 8100`

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

* This part sucks: the opengraph package doesn't work with python 3 yet, so you need to make some changes to your `~/.venvs/untitled/lib/site-packages/opengraph/__init__.py` it should say
`from .opengraph import OpenGraph`

* you also need to update your `~/.venvs/untitled/lib/site-packages/opengraph/opengraph.py` file. The urllib import is now incorrect. It should instead say
<pre><code> try:
     import urllib2
 except ImportError:
     from urllib import request as urllib2
</code></pre>