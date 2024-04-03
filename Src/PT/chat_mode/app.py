# libraries
import random
import numpy as np
import pickle
import json
from flask import Flask, render_template, request


app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")

@app.route("/get", methods=["POST"])
def chatbot_response():
    msg = request.form["msg"]    
    return msg + "qwe"

if __name__ == "__main__":
    app.run()