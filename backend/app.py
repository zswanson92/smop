from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
from flask_httpauth import HTTPBasicAuth

app = Flask(__name__)
CORS(app)
auth = HTTPBasicAuth()

books = [
    {"id": 1, "title": "Gerard's Fortune", "description": "A boy grows up hunting, a gamekeeper for the castle. A hunting guide by day, who dreams each night of the sea. Old enough to sign aboard a ship, he sails away from home to follow his dreams. The shipwreck leaves him stranded on an island. the natives adopt him, and he becomes part of the village. Five years pass before another ship arrives; but instead of a rescue, Pirates attack the island. The village fights back, and Gerard helps them capture the ship. the crew needs a captain, and he needs a way back home. Can he keep them safe? Can Gerard hold onto the treasure he has found?", "cover": "https://sevenminutesofpiracy.com/wp-content/uploads/2022/12/Fortune-ebook-1-188x300.png"},
    {"id": 2, "title": "Gerard's Homecoming", "description": "It’s been five long years since Gerard sailed away from home. Shipwrecked on an island, he became one of the natives. Now he has found a way back home, but wonders how much has changed in his absence. Are his parents still alive? Do the Duke and Duchess still reside in the castle? Does he still have a job? Will Sophie remember him? Will anyone remember him? Gerard is still captain but for how much longer? The owners want to fire him, and his ship is full of holes. Dancing at sea with pirate ships is hazardous work. Gerard must fight to protect his ship, his crew, and his family. If he can manage that, then all he needs to worry about are the pirates who want to kill him.", "cover": "https://sevenminutesofpiracy.com/wp-content/uploads/2022/12/Homecoming-ebook-1-188x300.png"},
    {"id": 3, "title": "Gerard's Jeopardy", "description": "When somebody threatens to kill you, it makes you think. when the tenth person says it, it makes you laugh. a strange way to live, but Gerard was getting used to it. The ship owners wanted him fired, and the duke wants him beheaded. A smuggler wants to burn the ship he loves, and a wolf wants to have him for dinner. He used to think that sailing was the dangerous part; but now he knows better. the most dangerous animals know how to smile. they lie, and then they kill you. Gerard will need all of his training to stay one step ahead in this game of life and death. Protect the ship, protect the crew, and stay alive for one more day.", "cover": "https://sevenminutesofpiracy.com/wp-content/uploads/2022/12/Jeopardy-ebook-1-188x300.png"},
    {"id": 4, "title": "Gerard's Trials", "description": "The only thing Captain Sharp wants is to keep sailing. He loves his ship, his crew, and the open sea. What he doesn’t like are liars, prison, and people trying to kill him. It’s nice to be wanted; but it’s hard to be a wanted man. Trouble at sea usually gives you a warning sign, but trouble on land is harder to spot. His fiancÉ wants to love him, and his ex-girlfriend wants to kill him. You can avoid the angry sea, but you can’t avoid an angry woman. Caught in a net of lies, the captain now must fight for his life. Can he defend himself? Can he stay out of prison? Does the truth even matter anymore? From the North Sea to the South Pacific, Captain Sharp must outrun the competition, outgun the pirates, and outfox everyone else.", "cover": "https://sevenminutesofpiracy.com/wp-content/uploads/2022/12/Trials-ebook--200x300.png"},
    {"id": 5, "title": "Gerard's Map", "description": "Captain Sharp was not being chased. Nobody was trying to kill him, and nobody was shooting holes in his ship. This was new territory for Gerard, but he knew it wouldn’t last. His mind kept drifting to the treasure map. The idea was so preposterous, he didn’t believe it himself. The map, the clues, the promise of treasure; it had to be part of some joke. The treasure was along the route his ship planned to take. Only they would need to turn west instead of east, sail a thousand miles off course, and not tell anyone where they were going. The crew starts fighting, and everyone picks sides. Can Gerard keep them from killing each other? Can he protect himself? Maybe, but only if he finds a treasure he doesn’t believe in.", "cover": "https://sevenminutesofpiracy.com/wp-content/uploads/2023/09/9-11-Map-ebook-1-2-199x300.jpg"},
    {"id": 6, "title": "???", "description": "The sixth and final book in the SHARP-TALES series is expected in the fall of 2024. Subscribe now to stay up to date.", "cover": "https://i.imgur.com/FjsjqyD.png"}
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
