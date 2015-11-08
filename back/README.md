# untitled
As-yet untitled Angular/Django-rest-framework project for an as-yet undecided subject

## Build
```
$ mkdir ~/.venv && ~/.venv
$ pyvenv-3.4 <project_name> && source ./<project_name>/bin/activate
$ cd <projects>
$ git clone git@github.com:keubs/untitled.git && cd untitled
$ pip install -r back/requirements.txt
```

Either set a 'KEUBS_SECRET_KEY' environment variable:
```
export KEUBS_SECRET_KEY="<secret_key>"
```
...or create a conf.py module at the root of the 'back' project:
```
CONF = {
    "KEUBS_SECRET_KEY": "<secret_key>"
}
```
