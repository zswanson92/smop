# app.py
from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
from flask_httpauth import HTTPBasicAuth

app = Flask(__name__)
CORS(app)  # This enables CORS for all domains on all routes
auth = HTTPBasicAuth()

# Your existing code for mock data and routes
books = [
    {"id": 1, "title": "Moby Dick", "description": "A tale of a whale and revenge.", "cover": "https://m.media-amazon.com/images/M/MV5BYzg0MjFmMjAtMmNlMC00ZmEzLWE0ZDQtYTFhZjAyNzIxZWU3XkEyXkFqcGdeQXVyMjQwMjk0NjI@._V1_.jpg"},
    # Add more books as needed
]

users = {
    "user1": "password1",
    "user2": "password2"
}

@auth.verify_password
def verify_password(username, password):
    if username in users and users[username] == password:
        return username

@auth.error_handler
def unauthorized():
    return make_response(jsonify({'error': 'Unauthorized access'}), 401)

@app.route('/api/books', methods=['GET'])
def get_books():
    return jsonify(books)

@app.route('/api/signup', methods=['POST'])
def signup():
    username = request.json.get('username')
    password = request.json.get('password')
    if not username or not password:
        return make_response(jsonify({'error': 'Missing username or password'}), 400)
    if username in users:
        return make_response(jsonify({'error': 'User already exists'}), 400)
    users[username] = password
    return jsonify({'message': 'User created successfully'}), 201

@app.route('/api/login', methods=['GET'])
@auth.login_required
def login():
    return jsonify({'message': 'Welcome, {}!'.format(auth.current_user())})

if __name__ == '__main__':
    app.run(debug=True)
