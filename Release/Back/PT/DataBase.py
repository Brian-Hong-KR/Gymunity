from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

import datetime

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

class PTLog(Base):
    __tablename__ = "pt_log"
    pt_log_id = Column(Integer, primary_key=True) 
    daily_program = Column(String(64))
    done_datetime = Column(String(64))
    user_id = Column(Integer) 
    
class PTQnA(Base):
    __tablename__ = "pt_qna"
    pt_qna_id = Column(Integer, primary_key=True) 
    unit_name = Column(String(64))
    question = Column(String(1024))
    answer = Column(String(1024)) 

def AddPoint(user_id, amount ):
    # TODO : 반드시 Refactoring 필요 user_id 의 point 를 갱신
    user_list = session.query(Users).all()
    for user_unit in user_list:
        if user_unit.user_id == user_id:
            user_unit.point += 20

    session.commit()

def SavePTLog(daily_program, done_datetime):
    #TODO : user_id 는 user table 이 생성된 이후에     
    log_unit = PTLog(daily_program=daily_program, done_datetime=done_datetime)
    session.add(log_unit)
    session.commit()

def LoadPTLog( ):
    log_list = session.query(PTLog).all()
    for log_unit in log_list:
        print(f"log_id : {log_unit.pt_log_id}, user_id: {log_unit.user_id}, daily_program: {log_unit.daily_program}, done_datetime :{log_unit.done_datetime}")

def SavePTQnA(unit_name, question, answer):
    qna_unit = PTQnA(unit_name=unit_name, question=question, answer=answer)
    session.add(qna_unit)
    session.commit()

def LoadPTQnA():
    qna_list = session.query(PTQnA).all()
    for qna_unit in qna_list:
        print(f"qna_id : {qna_unit.pt_qna_id}, unit_name: {qna_unit.unit_name}, question: {qna_unit.question}, answer :{qna_unit.answer}")




if __name__ == "__main__":
    # SavePTLog(daily_program="요요 다이어트 1일차", done_datetime= str(datetime.datetime.today()))
    # SavePTLog(daily_program="요요 다이어트 2일차", done_datetime= str(datetime.datetime.today()))

    # SavePTQnA(unit_name = "스쿼트 입문", question="방구가 나와요", answer="참으면서 하세용")
    # SavePTQnA(unit_name = "스쿼트 중급", question="방구가 나옵니다요", answer="꾹 참으면서 하세용")

    # LoadPTLog()
    # LoadPTQnA()

    session.close()