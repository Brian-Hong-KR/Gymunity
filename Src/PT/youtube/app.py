from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/")
def home():
    video_list = """YWpKc1R2HBE,rBMgABLzXUQ"""

    return render_template("index.html", video_list=video_list)

@app.route("/get", methods=["POST"])
def chatbot_response():
    msg = request.form["msg"]    
    return msg + "qwe"

if __name__ == "__main__":
    app.run(debug=True)