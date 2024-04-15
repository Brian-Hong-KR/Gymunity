from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.orm import sessionmaker, declarative_base
# from sqlalchemy.ext.declarative import declarative_base

from datetime import datetime, time

engine = create_engine("mysql+pymysql://gm:1234@localhost:3306/gymunity")
Base = declarative_base()
session_maker = sessionmaker(bind=engine)
session = session_maker()

class Users(Base):
    __tablename__ = "users"
    user_id = Column(Integer, primary_key=True)


class PointAdd(Base):
    __tablename__ = "point_add"
    point_add_id = Column(Integer, primary_key=True)
    points_added = Column(Integer)
    reason = Column(String(255))
    added_at = Column(DateTime)
    user_id = Column(Integer)

class Survey(Base):
    __tablename__ = "survey"
    survey_id = Column(Integer, primary_key=True) 
    user_id = Column(Integer) 
    gender = Column(String(64))
    age = Column(String(64))
    goal = Column(String(64))
    level = Column(String(64))
    abnormal = Column(String(128))    

class PTLog(Base):
    __tablename__ = "pt_log"
    pt_log_id = Column(Integer, primary_key=True) 
    daily_program = Column(String(1024))
    done_datetime = Column(DateTime)
    user_id = Column(Integer) 
    
class PTQnA(Base):
    __tablename__ = "pt_qna"
    pt_qna_id = Column(Integer, primary_key=True) 
    unit_name = Column(String(64))
    question = Column(String(1024))
    answer = Column(String(1024))
    answer_at = Column(DateTime)
    user_id = Column(Integer) 

def AddPoint(user_id, amount ):

    done_sign = "Today Workout Complete"
    now_time = datetime.now()
    today_4am = datetime.combine(now_time.date(), time(hour=4))
    
    user_unit = session.query(Users).filter(Users.user_id == user_id).first()
    
    if not user_unit:
        print ("User ID 가 없습니다.")
        return False

    # TODO : order_by ( date. desc)
    add_logs = session.query(PointAdd).filter(PointAdd.user_id == user_id, PointAdd.reason == done_sign).all()

    for add_log_unit in add_logs:
        if add_log_unit.added_at > today_4am:
            print ( "중복 보상")
            return False

    point_add_unit = PointAdd(points_added=amount, reason=done_sign, added_at=now_time, user_id=user_id)
    session.add(point_add_unit)
    session.commit()
    return True


def SavePTLog(daily_program):
    #TODO : user_id 는 user table 이 생성된 이후에
    log_unit = PTLog(daily_program=daily_program, done_datetime=datetime.now())
    session.add(log_unit)
    session.commit()

def SavePTQnA(unit_name, question, answer):
    qna_unit = PTQnA(unit_name=unit_name, question=question, answer=answer, answer_at=datetime.now())
    session.add(qna_unit)
    session.commit()

def load_lastest_daily_program ( user_id ):
    log_unit = session.query(PTLog).filter(PTLog.user_id == user_id).order_by(PTLog.done_datetime.desc()).limit(1).first()
    return log_unit.daily_program

def load_lastest_qna ( user_id ) :   
    qna_logs = session.query(PTQnA).filter(PTQnA.user_id == user_id).order_by(PTQnA.answer_at.desc()).limit(5).first()

    response = ""
    for qna_log in qna_logs:
        response += f"""{qna_log.question} (about {qna_log.unit_name})"""

    return response    


# def LoadSurveyData ( user_id ):
#     survey_unit = session.query(Survey).filter(Survey.user_id == user_id).first()
#     if survey_unit:
#         return survey_unit.gender, survey_unit.age, survey_unit.goal, survey_unit.level, survey_unit.abnormal
#     else:
#         return "female", "old", "Overall health improvement", "beginner", "cardiovascular disease"  # Return placeholder values
