from flask import Flask
from flask_cors import CORS
import Router

def create_app():
    app = Flask(__name__,
                static_url_path='',
                static_folder='../../Front/',
                template_folder='../../Front/'          
                )

    app.register_blueprint(Router.bp)

    CORS(app)

    return app

