from flask import Flask, send_from_directory
from flask_cors import CORS

app = Flask(__name__, static_url_path='', static_folder='client/build')
CORS(app)

@app.route('/')
@app.route('/analytics')
def index():
    return send_from_directory(app.static_folder, 'index.html')