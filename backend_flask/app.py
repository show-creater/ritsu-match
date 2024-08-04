from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///hobbies.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Hobby(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)

def create_initial_data():
    with app.app_context():
        db.create_all()
        if not Hobby.query.first():
            initial_hobbies = ['読書', '映画', 'アニメ', 'スポーツ']
            for hobby_name in initial_hobbies:
                new_hobby = Hobby(name=hobby_name)
                db.session.add(new_hobby)
            db.session.commit()

@app.route('/hobbies', methods=['GET'])
def get_hobbies():
    search_query = request.args.get('q', '')
    hobbies = Hobby.query.filter(Hobby.name.contains(search_query)).all()
    return jsonify([hobby.name for hobby in hobbies])

@app.route('/hobbies', methods=['POST'])
def add_hobby():
    data = request.get_json()
    new_hobby = Hobby(name=data['name'])
    db.session.add(new_hobby)
    db.session.commit()
    return jsonify({'message': 'Hobby added successfully!'}), 201

if __name__ == '__main__':
    create_initial_data()
    app.run(debug=True)
