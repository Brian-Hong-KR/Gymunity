from flask import Flask
import Router

def create_app():
    app = Flask(__name__,
                static_url_path='',
                static_folder='../../Front/',
                template_folder='../../Front/'          
                )

    app.register_blueprint(Router.bp)
    
    return app

