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
    BOOK_IMAGE          VARCHAR(100)            ,
    BOOK_TAG            VARCHAR(30)             ,
    BOOK_BORROWED       INT             DEFAULT 0,
    BOOK_URL            VARCHAR(130)    NOT NULL,
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
    REVIEW_BOOK_TITLE   vARCHAR(100)    NOT NULL,
    REVIEW_CONTENT      VARCHAR(2000)   NOT NULL,
    REVIEW_DATE         TIMESTAMP       ,
    REVIEW_LIKE         INT             DEFAULT 0,
    REVIEW_VIEW         INT             DEFAULT 0,
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

INSERT INTO BOOK_TB VALUES(1, "(EBS 다큐프라임) 자본주의 : 금융·소비·돈에 관한 33가지 비밀; EBS Media 기획", "한국교육방송공사; 자본주의 제작팀; EBS Media", "가나출판사 : 가나문화콘텐츠", "9788957365793", "330.122 ㅎ155ㅈ", "https://image.yes24.com/goods/11081680/XL", "경영 경제", 0, "https://lib.skku.edu/suwon/#/search/detail/4342801");
INSERT INTO BOOK_TB VALUES(2, "컴퓨터시스템", "Bryant, Randal; O'Hallaron, David Richard; 김형신", "Pearson", "9791185475219", "004 B915c1 2016", "https://image.yes24.com/goods/31950404/XL", "컴퓨터", 4, "https://lib.skku.edu/suwon/#/search/detail/11145692");
INSERT INTO BOOK_TB VALUES(3, "운영체제 : 아주 쉬운 세 가지 이야기", "Arpaci-Dusseau, Remzi H.; Arpaci-Dusseau, Andrea C.; 원유집; 박민규; 이성진", "홍릉", "	9791156007937", "005.43 A772o7 2020", "https://image.yes24.com/goods/93738334/XL", "컴퓨터", 3, "https://lib.skku.edu/suwon/#/search/detail/14800666");
INSERT INTO BOOK_TB VALUES(4, "(윤성우의)열혈 TCP/IP 소켓 프로그래밍", "윤성우", "오렌지미디어", "9788996094036", "004.62 ㅇ479ㅇ 2009", "https://image.yes24.com/goods/3630373/XL", "컴퓨터", 2, "https://lib.skku.edu/suwon/#/search/detail/3081209");
INSERT INTO BOOK_TB VALUES(5, "클라우드 네이티브 스프링 : 클라우드 플랫폼을 위한 자바 마이크로서비스", "Mahajan, Ajay; Gupta, Munish Kumar; Sundar, Shyam; 박규태", "서울 : 에이콘", "9791161752457", "004.6782 M214c5", "https://image.yes24.com/goods/66913902/XL", "컴퓨터", 1, "https://lib.skku.edu/suwon/#/search/detail/12386498");
INSERT INTO BOOK_TB VALUES(6, "쿠버네티스 패턴", "Ibryam, Bilgin; Huss, Roland; 안승규; 서한배", "책만", "9791189909123", "004.6782 I14k7", "https://image.yes24.com/goods/89861207/XL", "컴퓨터", 0, "https://lib.skku.edu/suwon/#/search/detail/13734532");
INSERT INTO BOOK_TB VALUES(7, "머신 러닝 교과서 with 파이썬, 사이킷런, 텐서플로", "Raschka, Sebastian; Mirjalili, Vahid; 박해선", "길벗", "9791165215187", "006.31 R223p5 2021", "https://image.yes24.com/goods/98809693/XL", "컴퓨터", 2, "https://lib.skku.edu/suwon/#/search/detail/14847735");
INSERT INTO BOOK_TB VALUES(8, "철학 개론", "최명관; 곽신환", "창", "9788974532161", "102 ㅊ182ㅊ 2014", "https://image.yes24.com/momo/TopCate327/MidCate005/32642684.jpg", "인문 철학", 1, "https://lib.skku.edu/suwon/#/search/detail/4640766");
INSERT INTO BOOK_TB VALUES(9, "철학의 교실", "오가와,히또시", "파이카", "9788996421269", "102 ㅇ271ㅊ", "https://image.yes24.com/momo/TopCate112/MidCate01/11103502.jpg", "인문 철학", 1, "https://lib.skku.edu/suwon/#/search/detail/3472987");
INSERT INTO BOOK_TB VALUES(10, "쓸모 있는 철학", "유키하라, 나리", "쓸모 있는 철학 : 철학의 거장 33인에게 배우다!", "9788967541019", "102 ㅇ411ㅆ", "https://image.yes24.com/goods/89924391/XL", "인문 철학", 0, "https://lib.skku.edu/suwon/#/search/detail/13734572");
INSERT INTO BOOK_TB VALUES(11, "플랫폼 전쟁", "김조한", "메디치", "9791157060979", "302.23 ㄱ859ㅍ", "https://image.yes24.com/goods/55268681/XL", "사회 문화", 1, "https://lib.skku.edu/suwon/#/search/detail/11687004");
INSERT INTO BOOK_TB VALUES(12, "미디어 격차 : 사회적 불평등의 새로운 흐름과 탐색", "김미경; 김은진; 조인숙", "한울아카데미", "9788946073357", "	302.23 ㅁ355ㄱ", "https://image.yes24.com/goods/120257230/XL", "사회 문화", 1, "https://lib.skku.edu/suwon/#/search/detail/14951646");
INSERT INTO BOOK_TB VALUES(13, "현대 사회학", "	Giddens, Anthony", "을유문화사", "8932451303", "301 G453s1", "https://image.yes24.com/momo/TopCate130/MidCate07/12968742.jpg", "사회 문화", 1, "https://lib.skku.edu/suwon/#/search/detail/795235");
INSERT INTO BOOK_TB VALUES(14, "불편한 편의점", "김호연", "나무옆의자", "9791161571188", "811.36 ㄱ976ㅂ", "https://image.yes24.com/goods/99308021/XL", "소설", 0, "https://lib.skku.edu/suwon/#/search/detail/14903220");
INSERT INTO BOOK_TB VALUES(15, "녹나무의 파수꾼", "히가시노, 게이고", "소미미디어", "9791165075064", "813.36 ㅎ344ㄴ", "https://image.yes24.com/goods/89386272/XL", "소설", 1, "https://lib.skku.edu/suwon/#/search/detail/13554870");
INSERT INTO BOOK_TB VALUES(16, "무진기행", "김승옥", "민음사", "9788937461491", "811.3015 ㄱ734ㅁ 2007", "https://image.yes24.com/goods/2661477/XL", "소설", 1, "https://lib.skku.edu/suwon/#/search/detail/14835803");
INSERT INTO BOOK_TB VALUES(17, "괴테 자서전 : 나의 인생, 시와 진실", "Goethe, Johann Wolfgang von", "우물이 있는 집", "9791190631211", "831.6 G599 2021", "https://image.yes24.com/goods/98830790/XL", "소설", 0, "https://lib.skku.edu/suwon/#/search/detail/14847594");
INSERT INTO BOOK_TB VALUES(18, "공업수학", "Kreyszig, Erwin", "텍스트북스", "9791191679045", "510.2462 K92a6 2022 v.1", "https://image.yes24.com/goods/107639337/XL", "수학", 1, "https://lib.skku.edu/suwon/#/search/detail/21980326");
INSERT INTO BOOK_TB VALUES(19, "Calculus", "Stewart, James", "Cengage", "9788962184105", "515 S849c", "https://image.yes24.com/momo/TopCate1109/MidCate001/110803652.jpg", "수학", 3, "https://lib.skku.edu/suwon/#/search/detail/11579619");
INSERT INTO BOOK_TB VALUES(20, "전자기학", "Hayt, William Hart", "맥그로힐에듀케이션코리아", "9791132101727", "537 H426e1 2019", "https://image.yes24.com/goods/68145670/XL", "공학", 1, "https://lib.skku.edu/suwon/#/search/detail/16951442");
INSERT INTO BOOK_TB VALUES(21, "유체역학", "Gerhart, Philip M.", "퍼스트북", "9791185475387", "620.106 G368m1", "https://image.yes24.com/goods/112390243/XL", "공학", 0, "https://lib.skku.edu/suwon/#/search/detail/11720340");
INSERT INTO BOOK_TB VALUES(22, "고전역학", "문희태", "서울대학교 출판부", "8952107128", "531 ㅁ327ㄱ 2006", "https://image.yes24.com/momo/TopCate49/MidCate05/4843964.jpg", "공학", 0, "https://lib.skku.edu/suwon/#/search/detail/2330258");
INSERT INTO BOOK_TB VALUES(23, "돈의 속성", "김승호", "스노우폭스북스", "9791188331796", "332.024 ㄱ735ㄷ", "https://image.yes24.com/goods/90428162/XL", "경영 경제", 1, "https://lib.skku.edu/suwon/#/search/detail/14002748");
INSERT INTO BOOK_TB VALUES(24, "현명한 투자자", "Graham, Benjamin", "국일증권경제연구소", "9788957821305", "332.678 G738i7 2020", "https://image.yes24.com/goods/90299861/XL", "경영 경제", 2, "https://lib.skku.edu/suwon/#/search/detail/14798761");

INSERT INTO REVIEW_TB VALUES(1, 2, "유광호", "운영체제 책 후기입니다", "운영체제 : 아주 쉬운 세 가지 이야기", "재미있었습니다", "2024-04-20 12:42:34", 0, 0);

INSERT INTO USER_BOOKLIST_TB VALUES(1, 2);
INSERT INTO USER_BOOKLIST_TB VALUES(1, 23);
INSERT INTO USER_BOOKLIST_TB VALUES(1, 24);
INSERT INTO USER_BOOKLIST_TB VALUES(2, 2);
INSERT INTO USER_BOOKLIST_TB VALUES(2, 3);
INSERT INTO USER_BOOKLIST_TB VALUES(2, 7);
INSERT INTO USER_BOOKLIST_TB VALUES(2, 18);
INSERT INTO USER_BOOKLIST_TB VALUES(2, 19);
INSERT INTO USER_BOOKLIST_TB VALUES(2, 24);
INSERT INTO USER_BOOKLIST_TB VALUES(3, 2);
INSERT INTO USER_BOOKLIST_TB VALUES(3, 3);
INSERT INTO USER_BOOKLIST_TB VALUES(3, 4);
INSERT INTO USER_BOOKLIST_TB VALUES(3, 15);
INSERT INTO USER_BOOKLIST_TB VALUES(3, 16);
INSERT INTO USER_BOOKLIST_TB VALUES(4, 2);
INSERT INTO USER_BOOKLIST_TB VALUES(5, 3);
INSERT INTO USER_BOOKLIST_TB VALUES(5, 7);
INSERT INTO USER_BOOKLIST_TB VALUES(5, 8);
INSERT INTO USER_BOOKLIST_TB VALUES(5, 9);
INSERT INTO USER_BOOKLIST_TB VALUES(5, 13);
INSERT INTO USER_BOOKLIST_TB VALUES(6, 4);
INSERT INTO USER_BOOKLIST_TB VALUES(6, 5);
INSERT INTO USER_BOOKLIST_TB VALUES(6, 11);
INSERT INTO USER_BOOKLIST_TB VALUES(6, 12);
INSERT INTO USER_BOOKLIST_TB VALUES(6, 19);
INSERT INTO USER_BOOKLIST_TB VALUES(7, 19);
INSERT INTO USER_BOOKLIST_TB VALUES(7, 20);

