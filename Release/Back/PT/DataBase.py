from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.orm import sessionmaker, declarative_base
# from sqlalchemy.ext.declarative import declarative_base

from datetime import datetime, time

engine = create_engine("mysql+pymysql://gm:1234@112.169.231.62:6060/gm")
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

def AddPoint(user_id, amount ):

    done_sign = "Today Workout Complete"
    now_time = datetime.now()
    today_4am = datetime.combine(now_time.date(), time(hour=4))
    
    user_unit = session.query(Users).filter(Users.user_id == user_id).first()
    
    if not user_unit:
        print ("User ID 가 없습니다.")
        return False

    add_logs = session.query(PointAdd).filter(PointAdd.reason == done_sign).all()

    for add_log_unit in add_logs:

        # last_point_time_str = add_log_unit.added_at.split(".")[0]
        # last_point_time = datetime.strptime(last_point_time_str, """%Y-%m-%d %H:%M:%S""")

        # if last_point_time > today_4am:
        if add_log_unit.added_at > today_4am:
            print ( "중복 보상")
            return False

    point_add_unit = PointAdd(points_added=amount, reason=done_sign, added_at=now_time, user_id=user_id)
    session.add(point_add_unit)
    session.commit()
    return True


#
# def LoadSurveyData ( user_id ):
#     survey_unit = session.query(Survey).filter(Survey.user_id == user_id).first()
#     if survey_unit:
#         return survey_unit.gender, survey_unit.age, survey_unit.goal, survey_unit.level, survey_unit.abnormal
#     else:
#         return "female", "old", "Overall health improvement", "beginner", "cardiovascular disease"  # Return placeholder values

def SavePTLog(daily_program):
    #TODO : user_id 는 user table 이 생성된 이후에
    log_unit = PTLog(daily_program=daily_program, done_datetime=datetime.now())
    session.add(log_unit)
    session.commit()

def SavePTQnA(unit_name, question, answer):
    qna_unit = PTQnA(unit_name=unit_name, question=question, answer=answer, answer_at=datetime.now())
    session.add(qna_unit)
    session.commit()

# def LoadPTQnA():
#     return session.query(PTQnA).all()

#
# if __name__ == "__main__":
#     AddPoint(1, 11 )
#
#
#     session.close()