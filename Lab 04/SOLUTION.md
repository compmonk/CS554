## Scenario 1: Logging

### How would you store your log entries ?
I would store log entries in MongoDB as documents with some required fields like, `timestamp`, `source`, `text` and then the customizable fields.
 
### How would you allow users to submit log entries ?
User would submit log entries via POST request to an API endpoint `api/logs` which can be via HTML form or API request.

### How would you allow them to query log entries? 
Users can query for logs by submitting GET request to `api/search?key1=value1&key=value2&key3=value3` via HTML forms or API requests. Here `key` would be the fields in the log document.

### How would you allow them to see their log entries ? 
Users can see log entries in a table in HTML and the data can be requested by hitting a GET request to `api/source/logs` API which will return all the logs for the `source` in JSON

### What would be your web server?
I would use Node JS web server framework as it will suffice this requirement.

## Scenario 2: Expense Reports

### How would you store your expenses ?
I would store the expenses as records in a SQL database, where the table `Expenses` would look like

| id | user | isReimbursed | reimbursedBy | submittedOn | paidOn | amount |
|:----:|:------:|:--------------:|:--------------:|:-------------:|:--------:|:-------:|
| 1 | Tom | True | 2 | 2020-03-02 14:56:19 | 2020-03-04 10:06:27 | 100 |
| 2 | Harry | False |  | 2020-03-1 19:31:53 |  | 500 |


### What web server would you choose, and why ?
I would choose Django web server as it provides easy integration with SQL databases with its models framework

### How would you handle the emails?
I would create a  [`django-celery-beat`](https://pypi.org/project/django-celery-beat/) job which would be triggered an email to send a generated PDF whenever the user's`Expense`  
request is reimbursed.

### How would you handle the PDF generation ?
I would use python packages like [`xhtml2pdf`](https://pypi.org/project/xhtml2pdf/) or 
[`pdfkit`](https://pypi.org/project/pdfkit/) or [`WeasyPrint`](https://pypi.org/project/WeasyPrint/) to generate pdf
from templates.

### How are you going to handle all the templating for the web application ?
Django provides handling of HTML templates via its templates framework which is another reason to use Django. HTML
templates can be stored in a folder and loaded via tha 
[`django.template.loader.get_template`](https://docs.djangoproject.com/en/3.0/topics/templates/) function.

## Scenario 3: A Twitter Streaming Safety Service

### Which Twitter API do you use ?
i would use Twitter's official Python wrapper for its API [`twitter-ads`](https://pypi.org/project/twitter-ads/) 

### How would you build this so its expandable to beyond your local precinct ?
I would build this in Django using MongoDB for the database so this is scalable with realtime data.

### What would you do to make sure that this system is constantly stable ?
I would use Continuous Integration and Tests to make sure the system is stable along with multiple test suites like smoke
testing, load testing and integrity tests for the database. Automatic replication of the database would also be enabled.

### What would be your web server technology ?
I would used Django web server.

### What databases would you use for triggers ?
i would use influxdb for triggers as it is highly recommended for realtime data like sensor data, or time series data

### For the historical log of tweets ?
MongoDB as the twitter tweets are non structured and not fixed in size. Moreover we would need related tweets and comments
for some tweets as well which is why MongoDB is suitable for this.

### How would you handle the real time, streaming incident report ?
I would use [`django-celery-beat`](https://pypi.org/project/django-celery-beat/) a background job scheduler and task queue
which would run jobs and triggers to notify about the incidents.

### How would you handle storing all the media that you have to store as well ?
I would something like Amazon S3 or Google Cloud Storage to store the media on the cloud for fast and cheap storage in
with regards to the volume of media that would be generated.

### What web server technology would you use ?
I would use Django as it would integrate with lot of third party libraries easily which would help in accomplishing this
task easily

## Scenario 4: A Mildly Interesting Mobile Application

### How would you handle the geospatial nature of your data ?
MongoDB provides `GeoJSON` type. I would use it to store the data as it can handle the geospatial nature of the data. 

### How would you store images, both for long term, cheap storage and for short term, fast retrieval ?
I would something like Amazon S3 or Google Cloud Storage to store the media on the cloud for fast and cheap storage for
long term

### What would you write your API in ?
I would write my API in Express JS as it would integrate easily with MongoDB and as we need a Mobile application we can
even use javascript framework for mobile application development like React Native or Ionic which makes the development
easier and fast.

### What would be your database ?
I would use MongoDB for the geospatial nature of the database, it can also be used to store media files in GridFS if
needed. It is easy to integrate mongoDb with Express JS.