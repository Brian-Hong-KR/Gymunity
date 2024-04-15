from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
import config

db = SQLAlchemy()
migrate = Migrate()

if __name__=="__main__":
    app = Flask(__name__, template_folder='templates')
    app.config.from_object(config)

    db.init_app(app)
    migrate.init_app(app, db)
    import models

    from views import main_views
    app.register_blueprint(main_views.bp)
    
    app.run( debug = True )

    # return app
