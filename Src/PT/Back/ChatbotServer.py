
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/samantha", methods=["GET"])
def process():
    return samantha()


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
    
    