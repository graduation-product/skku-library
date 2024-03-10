DROP DATABASE GP_DB1;
CREATE DATABASE IF NOT EXISTS GP_DB1;

USE GP_DB1;

CREATE TABLE IF NOT EXISTS USER_TB(
    USER_ID             INT             NOT NULL,
    USER_EMAIL          VARCHAR(45)     NOT NULL,
    USER_NAME           VARCHAR(45)     NOT NULL,
    USER_PASSWORD       VARCHAR(45)     NOT NULL,
    PRIMARY KEY(USER_ID)
);

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

INSERT INTO USER_TB VALUES(1, "rladbgus@g.skku.edu", "김유현", "1234");
INSERT INTO USER_TB VALUES(2, "dbrhkdgh@g.skku.edu", "유광호", "1234");

INSERT INTO BOOK_TB VALUES(1, "(EBS 다큐프라임) 자본주의 : 금융·소비·돈에 관한 33가지 비밀 / EBS <자본주의> 제작팀 지음 ; EBS Media 기획", "한국교육방송공사; 자본주의 제작팀; EBS Media", "가나출판사 : 가나문화콘텐츠", "9788957365793", "330.122 ㅎ155ㅈ", "https://image.yes24.com/goods/11081680/XL", "economics", 0);
INSERT INTO BOOK_TB VALUES(2, "컴퓨터시스템", "Bryant, Randal; O'Hallaron, David Richard; 김형신", "Pearson", "9791185475219", "004 B915c1 2016", "https://image.yes24.com/goods/31950404/XL", "computer", 3);
INSERT INTO BOOK_TB VALUES(3, "운영체제 : 아주 쉬운 세 가지 이야기", "Arpaci-Dusseau, Remzi H.; Arpaci-Dusseau, Andrea C.; 원유집; 박민규; 이성진", "홍릉", "	9791156007937", "005.43 A772o7 2020", "https://image.yes24.com/goods/93738334/XL", "computer", 1);


