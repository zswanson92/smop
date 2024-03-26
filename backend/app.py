from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
from flask_httpauth import HTTPBasicAuth
from flask_sqlalchemy import SQLAlchemy
from models import db
from models.BlogPost import BlogPost
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from flask_bcrypt import Bcrypt
from datetime import timedelta
from models.User import User

app = Flask(__name__)
bcrypt = Bcrypt(app)
CORS(app)
auth = HTTPBasicAuth()
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
app.config['JWT_SECRET_KEY'] = 'your-secret-key'
jwt = JWTManager(app)

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

# Assuming this structure for each blog post
blog_posts = [
    {
        'id': 1,
        'title': 'First Post',
        'content': 'Content of the first post.',
        # Include other blog post attributes here
    },
    # ... other posts
]

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
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'Username already exists'}), 400

    new_user = User(username=username)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity=username)

    return jsonify(access_token=access_token), 201

@app.route('/api/login', methods=['GET'])
@jwt_required()
def login():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    # This example uses plain text for simplicity. Implement proper password hashing in production.
    user = users.get(username)
    print(user)
    if user:
        access_token = create_access_token(identity=username, expires_delta=timedelta(hours=1))
        print(access_token)
        return jsonify(access_token=access_token)
    return jsonify({"msg": "Bad username or password"}), 401


# Blog CRUD Operations
@app.route('/api/blog', methods=['GET'])
def get_blog_posts():
    all_posts = BlogPost.query.all()
    return jsonify([{'id': post.id, 'title': post.title, 'content': post.content} for post in all_posts])

@app.route('/api/blog', methods=['POST'])
@jwt_required()
def create_blog_post():
    post_data = request.json
    if not post_data or not post_data.get('title') or not post_data.get('content'):
        return make_response(jsonify({'error': 'Missing title or content'}), 400)

    new_post = BlogPost(title=post_data['title'], content=post_data['content'])
    db.session.add(new_post)
    db.session.commit()
    return jsonify({'id': new_post.id, 'title': new_post.title, 'content': new_post.content}), 201

@app.route('/api/blog/<int:post_id>', methods=['GET'])
def get_single_blog_post(post_id):
    post = BlogPost.query.get_or_404(post_id)
    return jsonify({'id': post.id, 'title': post.title, 'content': post.content})

@app.route('/api/blog/<int:post_id>', methods=['PUT'])
@jwt_required()
def update_blog_post(post_id):
    post = BlogPost.query.get_or_404(post_id)
    post_data = request.json
    post.title = post_data.get('title', post.title)
    post.content = post_data.get('content', post.content)
    db.session.commit()
    return jsonify({'id': post.id, 'title': post.title, 'content': post.content})

@app.route('/api/blog/<int:post_id>', methods=['DELETE'])
@jwt_required()
def delete_blog_post(post_id):
    post = BlogPost.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()
    return jsonify({'message': 'Post deleted'})


# with app.app_context():
#     db.create_all()


if __name__ == '__main__':
    app.run(debug=True)
