# libraries
from flask import Flask, render_template, request

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html", video_list='PLPPetu1spkeZBvp2eLJEAyzr1e6quiJAM')

# playlist?list=PLPPetu1spkeZBvp2eLJEAyzr1e6quiJAM&si=FUlsLj5wdXcNCICW


if __name__ == "__main__":
    app.run(debug=True)