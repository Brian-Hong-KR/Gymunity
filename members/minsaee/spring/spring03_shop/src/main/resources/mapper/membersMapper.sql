CREATE TABLE   members(
  memberEmail varchar2(50) ,  --이메일
  memberPass varchar2(30),  --비밀번호
  memberName varchar2(30), --이름
  memberPhone char(11),  --전화번호  
  memberType number(1),  --회원구분 일반회원 1, 관리자 2
  constraint members_email primary key(memberEmail)
);

-- MYSQL ===================================================================================
CREATE TABLE members (
  memberEmail VARCHAR(50),
  memberPass VARCHAR(30),
  memberName VARCHAR(30),
  memberPhone CHAR(11),
  memberType INT DEFAULT 1,
  PRIMARY KEY (memberEmail)
);

INSERT INTO members(memberEmail, memberPass, memberName, memberPhone)
VALUES('ddd@daum.net', '1212', 'SQL직접입력', '12345678901');

-- 1 지우기
DROP TABLE members;

-- 2 수정
ALTER TABLE members
MODIFY column memberPass VARCHAR(100);

-- 3 추가
ALTER TABLE members
ADD COLUMN memberType INT DEFAULT 1;

DESCRIBE members;

-- 
ALTER TABLE members
ALTER column memberType SET DEFAULT 1;

DELETE FROM members
WHERE memberType=1;

-- memberType column 삭제
ALTER TABLE members
DROP column memberType;

SELECT * FROM board;
SELECT * FROM members;

DELETE FROM members;

ALTER TABLE board
DROP CONSTRAINT board_memberEmail;

ALTER TABLE board
ADD CONSTRAINT board_memberEmail FOREIGN KEY(memberEmail) REFERENCES members(memberEmail)
ON DELETE CASCADE;