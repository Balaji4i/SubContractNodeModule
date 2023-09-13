CREATE TABLE XXFND_SCHEDULE_T 
   (
    SCHEDULE_ID NUMBER, 
	SCHEDULE_NAME VARCHAR2(240), 
	FREQUENCY_MIN NUMBER, 
	PROGRAM_NAME VARCHAR2(240), 
	BI_REPORT_PATH VARCHAR2(240), 
	BI_REPORT_NAME VARCHAR2(240), 
	DB_REFRESH_PKG VARCHAR2(240), 
	APPLICATION_NAME VARCHAR2(240), 
	NEXT_SCHEDULE_TIME TIMESTAMP (6), 
	CREATED_BY VARCHAR2(60), 
	CREATION_DATE TIMESTAMP (6), 
	LAST_UPDATED_BY VARCHAR2(60), 
	LAST_UPDATE_DATE TIMESTAMP (6), 
	LAST_UPDATE_LOGIN VARCHAR2(60), 
	RUN_STATUS VARCHAR2(30), 
	STATUS VARCHAR2(30), 
	DB_TABLE_NAME VARCHAR2(250), 
	DB_COLUMN_NAMES VARCHAR2(4000)
   );
   
/

CREATE TABLE XXFND_SCHEDULE_ERR_LOG_T 
   (
    ERR_ID NUMBER(6,0), 
	TABLE_NAME VARCHAR2(30 ), 
	MERGE_QUERY VARCHAR2(4000 ), 
	ERR_CODE VARCHAR2(10 ), 
	ERR_MSG VARCHAR2(2000 )
   );
/   

CREATE SEQUENCE xxfnd_schdl_err_id_seq MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1;

/

CREATE TABLE xxfnd_schedule_list_t (
    schedule_list_id    NUMBER,
    schedule_id         NUMBER,
    schedule_name       VARCHAR2(240),
    program_name        VARCHAR2(240),
    bi_report_path      VARCHAR2(240),
    bi_report_name      VARCHAR2(240),
    db_refresh_pkg      VARCHAR2(240),
    last_refresh_time   TIMESTAMP(6),
    schedule_status     VARCHAR2(30),
    error_message       VARCHAR2(2000),
    created_by          VARCHAR2(60),
    creation_date       TIMESTAMP(6),
    last_updated_by     VARCHAR2(60),
    last_update_date    TIMESTAMP(6),
    last_update_login   VARCHAR2(60)
);

   