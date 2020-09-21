from flask import Flask, request, render_template, redirect, url_for
from flask_cors import CORS
from google.cloud import storage
from validate import validate_gameid
from time import time
from subscriber import get_current_sfen

# 自身の名称を app という名前でインスタンス化する
app = Flask(__name__)
CORS(app)

# default response header
headers = {
    'Access-Control-Allow-Origin': '*'
}

# GCS bucket
bucketname = "shogiban4research"
client = storage.Client()
bucket = client.get_bucket(bucketname)

# sfenreader URL
sfenreader_url = "https://sfenreader-dot-shogiban2kif.appspot.com/sfen?sfen="
sfenreader_url_twitter = "https://sfenreader-dot-shogiban2kif.appspot.com/sfen?sfen="

@app.after_request
def after_request(response):
    # response.headers.add('Access-Control-Allow-Origin','*')
    response.headers.add('Access-Control-Allow-Headers','Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods','GET,POST,OPTIONS')
    return response

@app.route('/')
def routeHTML():
    """Return a routeHTML."""
    err_reason = request.args.get('err_reason')
    return render_template('index.html', err_reason=err_reason)

@app.route('/validate', methods=['POST'])
def validate():
    # TODO: check whether gameid is already published or not.
    gameid = request.form["gameid"]
    if validate_gameid(gameid) == None:
        return redirect(url_for('/', err_reason="regex"))
    else:
        return redirect(url_for('browse', gameid=gameid))

@app.route('/browse')
def browse():
    gameid = request.args.get('gameid')
    twitterid = str(time())[:-3]
    imageurl = sfenreader_url + get_current_sfen()
    return render_template('browse.html', gameid=gameid, twitterid=twitterid, imageurl=imageurl)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, threaded=True)
