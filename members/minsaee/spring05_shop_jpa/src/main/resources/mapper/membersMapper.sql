CREATE TABLE   members(
  memberEmail varchar2(50) ,  --이메일
  memberPass varchar2(30),  --비밀번호
  memberName varchar2(30), --이름
  memberPhone char(11),  --전화번호  
  memberType number(1),  --회원구분 일반회원 1, 관리자 2
  constraint members_email primary key(memberEmail)
);

-- MYSQL JPA===================================================================================
CREATE TABLE members2 (
  member_email VARCHAR(50),
  member_pass VARCHAR(100),
  member_name VARCHAR(30),
  member_phone CHAR(11),
  member_type INT DEFAULT 1,
  PRIMARY KEY (member_email)
);

-- memberType컬럼 삭제
ALTER TABLE members
DROP column memberType;

-- memberType컬럼 추가
ALTER TABLE members
ADD COLUMN  memberType int default 1;

-- default 변경
ALTER TABLE members
ALTER column memberType  SET DEFAULT 1;

DELETE FROM members
WHERE memberType=0;

SELECT * FROM members;



SELECT * FROM board;

DELETE FROM members;

ALTER TABLE board
DROP constraint board_memberEmail;

ALTER TABLE board
ADD CONSTRAINT board_memberEmail FOREIGN KEY(memberEmail) REFERENCES members(memberEmail)
ON DELETE CASCADE;




 






