from flask import Flask
import Router

if __name__=="__main__":
    app = Flask(__name__, 
                static_url_path='',
                static_folder='../../Front/',
                template_folder='../../Front/'          
                )

    app.register_blueprint(Router.bp)
    
    app.run( debug = True )

