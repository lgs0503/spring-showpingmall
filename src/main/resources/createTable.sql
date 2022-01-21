-- 제품 테이블
CREATE table PRODUCT
 (
    IDX VARCHAR2(20) not null,
    PRODUCT_NAME VARCHAR2(50),
    PRODUCT_PRICE int,
    PRODUCT_CNT int,
    PRODUCT_DESCRIPTION VARCHAR2(2000),
    PRODUCT_IMAGE_NO VARCHAR2(20),
    PRODUCT_CLASS1 VARCHAR2(20),
    PRODUCT_CLASS2 VARCHAR2(20),
    DELETED VARCHAR2(20),
    USE_YN VARCHAR2(10),
    CREATE_DATE DATE,
    UPDATE_DATE DATE,
    CREATE_USER VARCHAR2(20),
    UPDATE_USER VARCHAR2(20)
 );

comment on table PRODUCT is '제품';
comment on column PRODUCT.IDX is '일련번호';
comment on column PRODUCT.PRODUCT_NAME is '제품명';
comment on column PRODUCT.PRODUCT_PRICE is '제품가격';
comment on column PRODUCT.PRODUCT_CNT is '제품수량';
comment on column PRODUCT.PRODUCT_DESCRIPTION is '제품설명';
comment on column PRODUCT.PRODUCT_IMAGE_NO is '제품 섬네일 파일번호';
comment on column PRODUCT.PRODUCT_CLASS1 is '대분류';
comment on column PRODUCT.PRODUCT_CLASS2 is '소분류';
comment on column PRODUCT.DELETED is '삭제여부';
comment on column PRODUCT.USE_YN is '사용여부';
comment on column PRODUCT.CREATE_DATE is '생성일';
comment on column PRODUCT.UPDATE_DATE is '수정일';
comment on column PRODUCT.CREATE_USER is '생성자';
comment on column PRODUCT.UPDATE_USER is '수정자';
create unique index PRODUCT_IDX_uindex
    on PRODUCT (IDX);
alter table PRODUCT
    add constraint PRODUCT_pk
        primary key (IDX);

-- 유저 테이블
CREATE TABLE "USER_INFO"
(
    USER_ID VARCHAR2(20),
    PASSWORD VARCHAR2(500),
    USER_NAME VARCHAR2(20),
    AGE INT,
    GENDER VARCHAR2(20),
    EMAIL VARCHAR2(20),
    LOCATION VARCHAR2(20),
    LOCATION_DTL VARCHAR2(20),
    IMAGE_FILE_NO VARCHAR2(500),
    USER_URLE VARCHAR2(500),
    DELETED VARCHAR2(20),
    CREATE_USER VARCHAR2(20),
    CREATE_DATE DATE,
    UPDATE_USER VARCHAR2(20),
    UPDATE_DATE DATE,
    PHONE_NUM VARCHAR2(50)
);
comment on table USER_INFO is '사용자';
comment on column USER_INFO.USER_ID is '계정';
comment on column USER_INFO.PASSWORD is '비밀번호';
comment on column USER_INFO.USER_NAME is '성명';
comment on column USER_INFO.AGE is '나이';
comment on column USER_INFO.GENDER is '성별';
comment on column USER_INFO.EMAIL is '이메일';
comment on column USER_INFO.LOCATION is '주소';
comment on column USER_INFO.LOCATION_DTL is '주소 상세';
comment on column USER_INFO.IMAGE_FILE_NO is '프로필 사진';
comment on column USER_INFO.DELETED is '삭제여부';
comment on column USER_INFO.CREATE_DATE is '생성일';
comment on column USER_INFO.UPDATE_DATE is '수정일';
comment on column USER_INFO.CREATE_USER is '생성자';
comment on column USER_INFO.UPDATE_USER is '수정자';
comment on column USER_INFO.PHONE_NUM is '연락처';
create unique index USER_IDX_uindex
    on USER_INFO (USER_ID);
alter table USER_INFO
    add constraint USER_pk
        primary key (USER_ID);

-- 구매신청 테이블


-- 공통코드 테이블
CREATE TABLE "CODE"
(
    CODE_ID VARCHAR2(20),
    CODE_NAME VARCHAR2(500),
    UPPER_CODE_ID VARCHAR2(20),
    CODE_VALUE VARCHAR2(50),
    USE_YN VARCHAR2(20),
    DELETED VARCHAR2(20),
    CODE_INFO VARCHAR2(500),
    CREATE_USER VARCHAR2(20),
    CREATE_DATE DATE,
    UPDATE_USER VARCHAR2(20),
    UPDATE_DATE DATE
);
comment on table "CODE" is '공통코드';
comment on column "CODE".CODE_ID is '공통코드 일련번호';
comment on column "CODE".CODE_NAME is '공통코드 명칭';
comment on column "CODE".UPPER_CODE_ID is '공통코드 부모 일련번호';
comment on column "CODE".CODE_VALUE is '공통코드 값';
comment on column "CODE".USE_YN is '사용여부';
comment on column "CODE".DELETED is '삭제여부';
comment on column "CODE".CREATE_USER is '생성자';
comment on column "CODE".CREATE_DATE is '생성일';
comment on column "CODE".UPDATE_USER is '수정자';
comment on column "CODE".UPDATE_DATE is '수정일';

create unique index CODE_IDX_uindex
    on CODE (CODE_ID);

alter table CODE
    add constraint CODE_pk
        primary key (CODE_ID);


-- 파일 테이블
CREATE TABLE "FILE_INFO"
(
	FILE_NO VARCHAR2(20),
	FILE_PATH VARCHAR2(500),
	FILE_NAME VARCHAR2(100),
	FILE_PHYSICAL_NAME VARCHAR2(100),
	FILE_EXTEN VARCHAR2(20),
	FILE_SIZE VARCHAR2(50),
	USE_YN VARCHAR2(20),
	DELETED VARCHAR2(20),
	CREATE_USER VARCHAR2(20),
	CREATE_DATE DATE,
	UPDATE_USER VARCHAR2(20),
	UPDATE_DATE DATE
);

comment on table "FILE_INFO" is '파일';
comment on column "FILE_INFO".FILE_NO is '파일 일련번호';
comment on column "FILE_INFO".FILE_PATH is '파일 경로';
comment on column "FILE_INFO".FILE_NAME is '파일 명';
comment on column "FILE_INFO".FILE_PHYSICAL_NAME is '파일 물리명(중복방지)';
comment on column "FILE_INFO".FILE_EXTEN is '파일 확장자';
comment on column "FILE_INFO".FILE_SIZE is '파일 사이즈';
comment on column "FILE_INFO".USE_YN is '사용여부';
comment on column "FILE_INFO".DELETED is '삭제여부';
comment on column "FILE_INFO".CREATE_USER is '생성자';
comment on column "FILE_INFO".CREATE_DATE is '생성일';
comment on column "FILE_INFO".UPDATE_USER is '수정자';
comment on column "FILE_INFO".UPDATE_DATE is '수정일';

create unique index FILE_IDX_uindex
    on FILE_INFO (FILE_NO);

alter table FILE_INFO
    add constraint FILE_pk
        primary key (FILE_NO);