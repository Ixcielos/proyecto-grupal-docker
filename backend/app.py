from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "ok", "service": "backend-api"}), 200

@app.route('/data', methods=['GET'])
def get_data():
    return jsonify({"id": 1, "message": "Hola desde el Backend Dockerizado"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)