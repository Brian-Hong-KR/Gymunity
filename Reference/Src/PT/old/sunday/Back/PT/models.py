from app import db

class pt(db.Model):
    pt_code = db.Column(db.Integer, primary_key=True) 
    user_code = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String(50), nullable=False)
    age = db.Column(db.String(50), nullable=False)
    goal = db.Column(db.String(50), nullable=False)
    level = db.Column(db.String(50), nullable=False)
    abnormal = db.Column(db.String(150), nullable=False)
    plan_name = db.Column(db.String(100), nullable=False)
    plan_desc = db.Column(db.Text(), nullable=False)

class pt_log(db.Model):
    pt_log_code = db.Column(db.Integer, primary_key=True)
    pt_code = db.Column(db.Integer, db.ForeignKey('pt.pt_code', ondelete='CASCADE'))
    daily_program = db.Column(db.Text(), nullable=False)
    done_datetime = db.Column(db.DateTime(), nullable=False)
    pt = db.relationship('pt', backref=db.backref('pt_set'))
    
class pt_qna(db.Model):
    qna_code = db.Column(db.Integer, primary_key=True)
    unit_name = db.Column(db.String(50), nullable=False)
    question = db.Column(db.Text(), nullable=False)
    anwer = db.Column(db.Text(), nullable=False)
