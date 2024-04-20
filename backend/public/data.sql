DROP DATABASE GP_DB1;
CREATE DATABASE IF NOT EXISTS GP_DB1;

USE GP_DB1;

CREATE TABLE IF NOT EXISTS USER_TB(
    USER_ID             INT             NOT NULL,
    USER_NUMBER         VARCHAR(13)     NOT NULL,
    USER_EMAIL          VARCHAR(45)     NOT NULL,
    USER_NAME           VARCHAR(45)     NOT NULL,
    USER_PASSWORD       VARCHAR(45)     NOT NULL,
    PRIMARY KEY(USER_ID)
);

# CLASSIFIER 내용
# 인문 철학
# 사회 문화
# 소설
# 수학
# 공학
# 경영 경제
# 컴퓨터

CREATE TABLE IF NOT EXISTS BOOK_TB(
    BOOK_ID             INT             NOT NULL,
    BOOK_NAME           VARCHAR(80)     NOT NULL,
    BOOK_AUTHOR         VARCHAR(80)     NOT NULL,
    BOOK_PUBLISHER      VARCHAR(60)             ,
    BOOK_ISBN           VARCHAR(15)     NOT NULL,
    BOOK_CLASSIFIER     VARCHAR(45)             ,
    BOOK_IMAGE          VARCHAR(60)             ,
    BOOK_TAG            VARCHAR(30)             ,
    BOOK_BORROWED       INT             DEFAULT 0,
    PRIMARY KEY(BOOK_ID)
);

CREATE TABLE IF NOT EXISTS USER_BOOKLIST_TB(
    USER_ID             INT             NOT NULL,
    BOOK_ID             INT             NOT NULL,
    PRIMARY KEY(USER_ID, BOOK_ID)
);

CREATE TABLE IF NOT EXISTS REVIEW_TB(
    REVIEW_ID           INT             NOT NULL,
    REVIEW_AUTHOR       INT             NOT NULL,
    REVIEW_AUTHOR_NAME  VARCHAR(100)    NOT NULL,
    REVIEW_TITLE        VARCHAR(100)    NOT NULL,
    REVIEW_CONTENT      VARCHAR(2000)   NOT NULL,
    REVIEW_DATE         TIMESTAMP       ,
    REVIEW_LIKE         INT             DEFAULT 0,
    PRIMARY KEY(REVIEW_ID)
);

INSERT INTO USER_TB VALUES(1, "2019314665", "rladbgus@g.skku.edu", "김유현", "1234");
INSERT INTO USER_TB VALUES(2, "2019310123", "dbrhkdgh@g.skku.edu", "유광호", "1234");
INSERT INTO USER_TB VALUES(3, "2019311392", "rlatkdduq@g.skku.edu", "김상엽", "1234");
INSERT INTO USER_TB VALUES(4, "2020132423", "dldbstjd@g.skku.edu", "이윤성", "1234");
INSERT INTO USER_TB VALUES(5, "2023312323", "qustjddbs@g.skku.edu", "변성윤", "1234");
INSERT INTO USER_TB VALUES(6, "2024316243", "rlatkdgur@g.skku.edu", "김상혁", "1234");
INSERT INTO USER_TB VALUES(7, "2022310231", "rladmltjq@g.skku.edu", "김의섭", "1234");
INSERT INTO USER_TB VALUES(8, "2021314236", "dlwodnr@g.skku.edu", "이재욱", "1234");

INSERT INTO BOOK_TB VALUES(1, "(EBS 다큐프라임) 자본주의 : 금융·소비·돈에 관한 33가지 비밀 / EBS <자본주의> 제작팀 지음 ; EBS Media 기획", "한국교육방송공사; 자본주의 제작팀; EBS Media", "가나출판사 : 가나문화콘텐츠", "9788957365793", "330.122 ㅎ155ㅈ", "https://image.yes24.com/goods/11081680/XL", "경영 경제", 0);
INSERT INTO BOOK_TB VALUES(2, "컴퓨터시스템", "Bryant, Randal; O'Hallaron, David Richard; 김형신", "Pearson", "9791185475219", "004 B915c1 2016", "https://image.yes24.com/goods/31950404/XL", "컴퓨터", 3);
INSERT INTO BOOK_TB VALUES(3, "운영체제 : 아주 쉬운 세 가지 이야기", "Arpaci-Dusseau, Remzi H.; Arpaci-Dusseau, Andrea C.; 원유집; 박민규; 이성진", "홍릉", "	9791156007937", "005.43 A772o7 2020", "https://image.yes24.com/goods/93738334/XL", "컴퓨터", 1);

INSERT INTO REVIEW_TB VALUES(1, 2, "유광호", "운영체제 책 후기입니다", "재미있었습니다", "2024-04-20 12:42:34", 0);

