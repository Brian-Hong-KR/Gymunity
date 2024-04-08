from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker, declarative_base
# from sqlalchemy.ext.declarative import declarative_base

from datetime import datetime, timedelta

engine = create_engine("mysql+pymysql://gm:1234@112.169.231.62:6060/gm")
Base = declarative_base()
session_maker = sessionmaker(bind=engine)
session = session_maker()

class Users(Base):
    __tablename__ = "users"
    user_id = Column(Integer, primary_key=True) 
    user_account_id = Column(String(45))
    nickname = Column(String(45))
    admin_yn = Column(String(3))
    point = Column(Integer)
    grade_id = Column(Integer)
    last_point_time = Column(String(45))

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
    done_datetime = Column(String(64))
    user_id = Column(Integer) 
    
class PTQnA(Base):
    __tablename__ = "pt_qna"
    pt_qna_id = Column(Integer, primary_key=True) 
    unit_name = Column(String(64))
    question = Column(String(1024))
    answer = Column(String(1024)) 

def AddPoint(user_id, amount ):
    
    user_unit = session.query(Users).filter(Users.user_id == user_id).first()
    
    if not user_unit:
        return False 

    last_point_time_str = user_unit.last_point_time.split(".")[0]
    now_time = datetime.now()

    if last_point_time_str:
        last_point_time = datetime.strptime(last_point_time_str, """%Y-%m-%d %H:%M:%S""")
          
        if now_time - last_point_time > timedelta(hours=20):
            user_unit.point += amount
            user_unit.last_point_time = now_time
            session.commit()
        else:
            print ("20시간이 경과하지 않았음")
    else:
        user_unit.point += amount
        user_unit.last_point_time = now_time
        session.commit()

    return True


def LoadSurveyData ( user_id ):
    survey_unit = session.query(Survey).filter(Survey.user_id == user_id).first()
    if survey_unit:
        return survey_unit.gender, survey_unit.age, survey_unit.goal, survey_unit.level, survey_unit.abnormal
    else:
        return "female", "old", "Overall health improvement", "beginner", "cardiovascular disease"  # Return placeholder values

def SavePTLog(daily_program, done_datetime):
    #TODO : user_id 는 user table 이 생성된 이후에     
    log_unit = PTLog(daily_program=daily_program, done_datetime=done_datetime)
    session.add(log_unit)
    session.commit()

def SavePTQnA(unit_name, question, answer):
    qna_unit = PTQnA(unit_name=unit_name, question=question, answer=answer)
    session.add(qna_unit)
    session.commit()

def LoadPTQnA():
    return session.query(PTQnA).all()


if __name__ == "__main__":
    AddPoint(1, 11 )


    session.close()