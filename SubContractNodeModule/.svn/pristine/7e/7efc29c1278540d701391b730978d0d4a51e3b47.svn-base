CREATE TABLE "XXFND_SCHEDULE_T" 
   (	"SCHEDULE_ID" NUMBER, 
	"SCHEDULE_NAME" VARCHAR2(240 BYTE), 
	"FREQUENCY_MIN" NUMBER, 
	"BI_REPORT_PATH" VARCHAR2(240 BYTE), 
	"BI_REPORT_NAME" VARCHAR2(240 BYTE),  
	"CREATED_BY" VARCHAR2(60 BYTE), 
	"CREATION_DATE" TIMESTAMP (6), 
	"LAST_UPDATED_BY" VARCHAR2(60 BYTE), 
	"LAST_UPDATE_DATE" TIMESTAMP (6), 
	"LAST_UPDATE_LOGIN" VARCHAR2(60 BYTE), 
	"STATUS" VARCHAR2(30 BYTE) DEFAULT 'Y', 
	"RESET_DATA" CHAR(1) DEFAULT 'N',
	"DB_TABLE_NAME" VARCHAR2(250 BYTE), 
	"DB_COLUMN_NAMES" VARCHAR2(4000 BYTE),
	"OPERATION" VARCHAR2(10) DEFAULT 'MERGE',
	"PACKAGE_TO_RUN_AFTER_PROCESS" VARCHAR2(500),
	"RUN_PACKAGE_AT_LAST_SEQ" CHAR(1) DEFAULT 'Y'
   );
/   
CREATE TABLE "XXFND_SCHEDULE_PARAMETERS_T"
	(
		"PARAM_ID" NUMBER,
		"SCHEDULE_ID" NUMBER,
		"PARAM_NAME" VARCHAR2(240),
		"PARAM_VALUE" VARCHAR2(1000),
		"SEQUENCE_NO" NUMBER, 
		"NEXT_SCHEDULE_TIME" TIMESTAMP (6),
		"NEXT_SCHEDULE_TIME_TEMP" TIMESTAMP(6),
		"CREATED_BY" VARCHAR2(60), 
		"CREATION_DATE" TIMESTAMP (6), 
		"LAST_UPDATED_BY" VARCHAR2(60), 
		"LAST_UPDATE_DATE" TIMESTAMP (6)
	);
   
/
   
   CREATE TABLE "XXFND_SCHEDULE_LIST_T" 
   (	"SCHEDULE_LIST_ID" NUMBER, 
	"SCHEDULE_ID" NUMBER, 
	"PARAM_SEQUENCE_NO" NUMBER,
	"SCHEDULE_NAME" VARCHAR2(240 BYTE), 
	"BI_REPORT_PATH" VARCHAR2(240 BYTE), 
	"BI_REPORT_NAME" VARCHAR2(240 BYTE),  
	"LAST_REFRESH_TIME" TIMESTAMP (6), 
	"SCHEDULE_STATUS" VARCHAR2(30 BYTE), 
	"ERROR_MESSAGE" VARCHAR2(2000 BYTE), 
	"REPORT_RECORD_COUNT" NUMBER,
	"CREATED_BY" VARCHAR2(60 BYTE), 
	"CREATION_DATE" TIMESTAMP (6), 
	"LAST_UPDATED_BY" VARCHAR2(60 BYTE), 
	"LAST_UPDATE_DATE" TIMESTAMP (6), 
	"LAST_UPDATE_LOGIN" VARCHAR2(60 BYTE)
   );
   
   /
   
   CREATE TABLE "XXFND_SCHEDULE_ERR_LOG_T" 
   (	"ERR_ID" NUMBER(6,0), 
	"TABLE_NAME" VARCHAR2(30 BYTE), 
	"MERGE_QUERY" CLOB, 
	"ERR_CODE" VARCHAR2(10 BYTE), 
	"ERR_MSG" VARCHAR2(2000 BYTE), 
	"CREATION_DATE" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   
   /
   
    CREATE TABLE "XXFND_SETUP_DETAIL" 
   (	"SETUP_ID" NUMBER,
	"FUSION_DOMAIN" VARCHAR2(240 BYTE), 
	"FUSION_USERNAME" VARCHAR2(240 BYTE), 
	"FUSION_PASSWORD" VARCHAR2(240 BYTE),
	"MAIL_NOTIFICATION" CHAR(1)
   );
   
   /
   
 -- *** SEQUENCE ***
 
 CREATE SEQUENCE xxfnd_schedule_list_s MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START
WITH 100;

/

CREATE SEQUENCE xxfnd_schdl_err_id_seq MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START
WITH 100;

/

CREATE SEQUENCE XXFND_SCHEDULE_PARAMETERS_seq MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START
WITH 100;

/

CREATE SEQUENCE xxfnd_schedule_s MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START
WITH 100;

-- *** PACKAGE ***

create or replace PACKAGE XXFND_NODE_SCHEDULER AS
    PROCEDURE get_schedule (
        p_cursor     OUT   SYS_REFCURSOR,
        p_fusion_domain   OUT   VARCHAR2,
        p_fusion_uname    OUT   VARCHAR2,
        p_fusion_pwd      OUT   VARCHAR2,
        p_err_code   OUT   VARCHAR2,
        p_err_msg    OUT   VARCHAR2
    );

    PROCEDURE ins_schdl_list (
        p_schedule_id    IN    NUMBER,
        p_table_name     IN    VARCHAR2,
		p_seq_no		 IN	   NUMBER,
        p_schdl_list     OUT   SYS_REFCURSOR,
        p_table_struct   OUT   SYS_REFCURSOR,
        p_err_code       OUT   VARCHAR2,
        p_err_msg        OUT   VARCHAR2
    );

    PROCEDURE get_table_columns (
        p_table_name   IN    VARCHAR2,
        p_cursor       OUT   SYS_REFCURSOR,
        p_err_code     OUT   VARCHAR2,
        p_err_msg      OUT   VARCHAR2
    );

    PROCEDURE execute_merge_query (
        p_table_name   IN OUT  VARCHAR2,
        p_merge        IN OUT  VARCHAR2,
        p_err_code     OUT     VARCHAR2,
        p_err_msg      OUT     VARCHAR2
    );

    PROCEDURE ins_err_log (
        p_table_name   IN   VARCHAR2,
        p_merge        IN   VARCHAR2,
        p_err_code     IN   VARCHAR2,
        p_err_msg      IN   VARCHAR2
    );

    PROCEDURE upd_schdl_list_status (
        p_schdl_list_id   IN   VARCHAR2,
		p_seq_no 		  IN   NUMBER,
		p_last_seq		  IN   VARCHAR2,
		p_report_record_count IN NUMBER,
        p_status          IN   VARCHAR2,
        p_err_msg         IN   VARCHAR2
    );
    
    PROCEDURE reset_schdl_list_status (
        p_err_code     OUT   VARCHAR2,
        p_err_msg      OUT   VARCHAR2
    );
	
	PROCEDURE get_schedule_params (
		p_schedule_id    IN    NUMBER,
        p_param_count     OUT    NUMBER,
		p_cursor       OUT   SYS_REFCURSOR,
		 p_already_running OUT NUMBER,
        p_err_code     OUT   VARCHAR2,
        p_err_msg      OUT   VARCHAR2
    );
	
	procedure mail_notification (
		p_mail_notification_flag OUT VARCHAR2,
		p_record_count OUT NUMBER,
		p_mail_from	   OUT VARCHAR2,
		p_mail_to	   OUT VARCHAR2,
		p_mail_subject OUT VARCHAR2,
		p_cursor OUT SYS_REFCURSOR,
		p_err_code     OUT   VARCHAR2,
        p_err_msg      OUT   VARCHAR2	
	);

END XXFND_NODE_SCHEDULER;
/

create or replace PACKAGE BODY XXFND_NODE_SCHEDULER AS

    PROCEDURE get_schedule (
        p_cursor          OUT   SYS_REFCURSOR,
        p_fusion_domain   OUT   VARCHAR2,
        p_fusion_uname    OUT   VARCHAR2,
        p_fusion_pwd      OUT   VARCHAR2,
        p_err_code        OUT   VARCHAR2,
        p_err_msg         OUT   VARCHAR2
    ) AS
    BEGIN
    
        SELECT
            fusion_domain,
            fusion_username,
            fusion_password
        INTO
            p_fusion_domain,
            p_fusion_uname,
            p_fusion_pwd
        FROM
            xxfnd_setup_detail
        WHERE
            setup_id = 1;

        OPEN p_cursor FOR SELECT
                             schedule_id,
                             schedule_name,
                             frequency_min,
                             operation,
                             bi_report_path,
                             bi_report_name,
                             created_by,
                             creation_date,
                             last_updated_by,
                             last_update_date,
                             last_update_login,
                             status,
							 reset_data,
                             upper(db_table_name) db_table_name,
                             upper(db_column_names) db_column_names,
							 upper(PACKAGE_TO_RUN_AFTER_PROCESS) package_to_run_after_process,
							 RUN_PACKAGE_AT_LAST_SEQ
                         FROM
                             xxfnd_schedule_t
                         WHERE
                              status = 'Y'
                             AND db_table_name IS NOT NULL
                             AND db_column_names IS NOT NULL;

        p_err_code := NULL;
        p_err_msg := NULL;
    EXCEPTION
        WHEN OTHERS THEN
            p_err_code := sqlcode;
            p_err_msg := sqlerrm;
    END get_schedule;

    PROCEDURE ins_schdl_list (
        p_schedule_id    IN    NUMBER,
        p_table_name     IN    VARCHAR2,
		p_seq_no		 IN	   NUMBER,
        p_schdl_list     OUT   SYS_REFCURSOR,
        p_table_struct   OUT   SYS_REFCURSOR,
        p_err_code       OUT   VARCHAR2,
        p_err_msg        OUT   VARCHAR2
    ) AS

        l_schedule_list_id     xxfnd_schedule_list_t.schedule_list_id%TYPE;
        l_schedule_name        xxfnd_schedule_list_t.schedule_name%TYPE;
        l_last_refresh_time    xxfnd_schedule_list_t.last_refresh_time%TYPE;
        l_next_schedule_time   xxfnd_schedule_list_t.last_refresh_time%TYPE;
        l_bi_report_path       xxfnd_schedule_list_t.bi_report_path%TYPE;
        l_bi_report_name       xxfnd_schedule_list_t.bi_report_name%TYPE;
        l_schedule_status      xxfnd_schedule_list_t.schedule_status%TYPE;
    BEGIN
        SELECT
            schedule_name,
            (select max(next_schedule_time) from XXFND_SCHEDULE_PARAMETERS_T where schedule_id = p_schedule_id and SEQUENCE_NO = p_seq_no) last_refresh_time,
            SYSDATE + ( ( 0 - 5 ) / 24 / 60 ) next_schedule_time,
            bi_report_path,
            bi_report_name,
            'RUNNING' schedule_status
        INTO
            l_schedule_name,
            l_last_refresh_time,
            l_next_schedule_time,
            l_bi_report_path,
            l_bi_report_name,
            l_schedule_status
        FROM
            xxfnd_schedule_t
        WHERE
            schedule_id = p_schedule_id;

        INSERT INTO xxfnd_schedule_list_t (
            schedule_list_id,
            schedule_id,
			PARAM_SEQUENCE_NO,
            schedule_name,
            last_refresh_time,
            bi_report_path,
            bi_report_name,
            schedule_status,
            created_by,
            creation_date,
            last_updated_by,
            last_update_date,
            last_update_login
        ) VALUES (
            xxfnd_schedule_list_s.NEXTVAL,
            p_schedule_id,
			p_seq_no,
            l_schedule_name,
            l_last_refresh_time,
            l_bi_report_path,
            l_bi_report_name,
            l_schedule_status,
            '-1',
            SYSDATE,
            '-1',
            SYSDATE,
            '-1'
        ) RETURNING schedule_list_id INTO l_schedule_list_id;
		
		
			UPDATE XXFND_SCHEDULE_PARAMETERS_T
			SET
	--            next_schedule_time = to_timestamp(p_nxt_schdl, 'DD-Mon-RR HH24:MI:SS.FF'),
				next_schedule_time_temp = l_next_schedule_time,
				last_update_date = SYSDATE
			WHERE
				schedule_id = p_schedule_id
				and sequence_no=p_seq_no;

        COMMIT;
        OPEN p_schdl_list FOR SELECT
                                  *
                              FROM
                                  xxfnd_schedule_list_t
                              WHERE
                                  schedule_list_id = l_schedule_list_id
                                  AND schedule_id = p_schedule_id;

        OPEN p_table_struct FOR SELECT distinct
                                   column_name,
                                   data_type
                               FROM
                                   all_tab_columns
                               WHERE
                                   table_name LIKE upper(p_table_name);

        p_err_code := NULL;
        p_err_msg := NULL;
    EXCEPTION
        WHEN OTHERS THEN
            p_err_code := sqlcode;
            p_err_msg := sqlerrm;
    END ins_schdl_list;

    PROCEDURE get_table_columns (
        p_table_name   IN    VARCHAR2,
        p_cursor       OUT   SYS_REFCURSOR,
        p_err_code     OUT   VARCHAR2,
        p_err_msg      OUT   VARCHAR2
    ) AS
    BEGIN
        OPEN p_cursor FOR SELECT distinct
                                   column_name,
                                   data_type
                               FROM
                                   all_tab_columns
                          WHERE
                              table_name LIKE upper(p_table_name);

        p_err_code := NULL;
        p_err_msg := NULL;
    EXCEPTION
        WHEN OTHERS THEN
            p_err_code := sqlcode;
            p_err_msg := sqlerrm;
    END get_table_columns;

    PROCEDURE execute_merge_query (
        p_table_name   IN OUT  VARCHAR2,
        p_merge        IN OUT  VARCHAR2,
        p_err_code     OUT     VARCHAR2,
        p_err_msg      OUT     VARCHAR2
    ) AS
    BEGIN
        EXECUTE IMMEDIATE p_merge;
        COMMIT;
        p_err_code := NULL;
        p_err_msg := NULL;
    EXCEPTION
        WHEN OTHERS THEN
			p_err_code := sqlcode;
            p_err_msg := sqlerrm;
            INSERT INTO xxfnd_schedule_err_log_t (
                err_id,
                table_name,
                merge_query,
                err_code,
                err_msg
            ) VALUES (
                xxfnd_schdl_err_id_seq.NEXTVAL,
                p_table_name,
                p_merge,
                p_err_code,
                p_err_msg
            );

            COMMIT;     
    END execute_merge_query;

    PROCEDURE ins_err_log (
        p_table_name   IN   VARCHAR2,
        p_merge        IN   VARCHAR2,
        p_err_code     IN   VARCHAR2,
        p_err_msg      IN   VARCHAR2
    ) AS
    BEGIN
        INSERT INTO xxfnd_schedule_err_log_t (
            err_id,
            table_name,
            merge_query,
            err_code,
            err_msg
        ) VALUES (
            xxfnd_schdl_err_id_seq.NEXTVAL,
            p_table_name,
            p_merge,
            p_err_code,
            p_err_msg
        );

        COMMIT;
    END ins_err_log;

    PROCEDURE upd_schdl_list_status (
        p_schdl_list_id   IN   VARCHAR2,
		p_seq_no 		  IN   NUMBER,
		p_last_seq		  IN   VARCHAR2,
		p_report_record_count IN NUMBER,
        p_status          IN   VARCHAR2,
        p_err_msg         IN   VARCHAR2
    ) AS
    BEGIN
        UPDATE xxfnd_schedule_list_t
        SET
            schedule_status = p_status,
			REPORT_RECORD_COUNT = p_report_record_count,
            error_message = p_err_msg,
            last_update_date = SYSDATE
        WHERE
            schedule_list_id = p_schdl_list_id
			and PARAM_SEQUENCE_NO=p_seq_no;
        
        IF p_status='COMPLETED' THEN
            UPDATE 
            XXFND_SCHEDULE_PARAMETERS_T 
            SET 
            NEXT_SCHEDULE_TIME=NEXT_SCHEDULE_TIME_TEMP
            WHERE
            SCHEDULE_ID=(
            SELECT SCHEDULE_ID FROM XXFND_SCHEDULE_LIST_T where schedule_list_id = p_schdl_list_id
            )
			and sequence_no = p_seq_no;
        END IF;

        COMMIT;
    END upd_schdl_list_status;
    
    PROCEDURE reset_schdl_list_status (
        p_err_code     OUT   VARCHAR2,
        p_err_msg      OUT   VARCHAR2
    )AS
    BEGIN
        update xxfnd_schedule_list_t set schedule_status = 'STOPPED' where schedule_status='RUNNING';
        commit;
        p_err_code := NULL;
        p_err_msg := NULL;
    EXCEPTION
        WHEN OTHERS THEN
            p_err_code := sqlcode;
            p_err_msg := sqlerrm;
    END reset_schdl_list_status;
	
	PROCEDURE get_schedule_params (
		p_schedule_id    IN    NUMBER,
        p_param_count     OUT    NUMBER,
		p_cursor       OUT   SYS_REFCURSOR,
		p_already_running OUT NUMBER,
        p_err_code     OUT   VARCHAR2,
        p_err_msg      OUT   VARCHAR2
    )AS
    BEGIN
		SELECT nvl(MAX(SEQUENCE_NO),0) into p_param_count from XXFND_SCHEDULE_PARAMETERS_T where schedule_id=p_schedule_id;
		
		select nvl(count(*),0) into p_already_running from xxfnd_schedule_list_t where schedule_id=p_schedule_id and schedule_status='RUNNING' and extract(hour from sysdate-creation_date)<4;
		
		OPEN p_cursor FOR select PARAM_ID, SCHEDULE_ID, PARAM_NAME, PARAM_VALUE, SEQUENCE_NO from XXFND_SCHEDULE_PARAMETERS_T where schedule_id=p_schedule_id;
		
	 EXCEPTION
        WHEN OTHERS THEN
            p_err_code := sqlcode;
            p_err_msg := sqlerrm;
		
	END get_schedule_params;
	
	  procedure mail_notification (
		p_mail_notification_flag OUT VARCHAR2,
		p_record_count OUT NUMBER,
		p_mail_from	   OUT VARCHAR2,
		p_mail_to	   OUT VARCHAR2,
		p_mail_subject OUT VARCHAR2,
		p_cursor OUT SYS_REFCURSOR,
		p_err_code     OUT   VARCHAR2,
        p_err_msg      OUT   VARCHAR2	
	)AS
        l_mail_content VARCHAR2(2000) := '';
	BEGIN
		
		select mail_notification into p_mail_notification_flag from XXFND_SETUP_DETAIL where setup_id=1;
		
		select count(*) into p_record_count from xxfnd_schedule_parameters_t where extract(day from sysdate-next_schedule_time)>1 and schedule_id IN (select schedule_id from xxfnd_Schedule_t where status='Y') and param_value='FETCH_TIME';
		
		p_mail_from := 'events@4iapps.com';
		
		p_mail_to := 'govindaraj.m@4iapps.com';
		
		p_mail_subject := 'Sync stopped in Omniyat test instance for the below schedules';
		
		l_mail_content := l_mail_content || '<p>Hi,</p>
		<p>The below schedules are not working in the Omniyat test instance</p>
		<table style="border: 1px solid black;border-collapse: collapse;">
		<tr>
		<th style="border: 1px solid black;">
		Schedule Id
		</th>
		<th style="border: 1px solid black;">
		Schedule Name
		</th>
		<th style="border: 1px solid black;">
		BI Report Path
		</th>
		<th style="border: 1px solid black;">
		BI Report Name
		</th>
		<th style="border: 1px solid black;">
		Next Schedule Time
		</th>
		<th style="border: 1px solid black;">
		Days Stopped working
		</th>
		</tr>';
		
		IF p_mail_notification_flag='Y' AND p_record_count>0 THEN
		  FOR cur_schedules IN (
				select st.schedule_id,st.schedule_name,st.bi_report_path,st.bi_report_name,spt.next_schedule_time,extract(day from sysdate-spt.next_schedule_time) days_not_run
				from xxfnd_schedule_t st, xxfnd_schedule_parameters_t spt 
				where st.schedule_id=spt.schedule_id
			) LOOP
			 l_mail_content := l_mail_content || '<tr>
				<td style="border: 1px solid black;">'
				||cur_schedules.schedule_id
				||'</td>
				<td style="border: 1px solid black;">'
				||cur_schedules.schedule_name
				|| '</td>
				<td style="border: 1px solid black;">'
				||cur_schedules.bi_report_path
				||'</td>
				<td style="border: 1px solid black;">'
				||cur_schedules.bi_report_name
				||'</td>
				<td style="border: 1px solid black;">'
				||cur_schedules.next_schedule_time
				||'</td>
				<td style="border: 1px solid black;">'
				||cur_schedules.days_not_run
				||'</td>
				</tr>';
		  END LOOP;	
		  l_mail_content := l_mail_content ||'</table>';
		END IF;
		OPEN p_cursor FOR select l_mail_content as mail_content from dual;
	
	EXCEPTION
        WHEN OTHERS THEN
            p_err_code := sqlcode;
            p_err_msg := sqlerrm;
		
	END mail_notification;

END XXFND_NODE_SCHEDULER;
/

CREATE SEQUENCE XXFND_SCHEDULE_PARAMETERS_seq MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START
WITH 100;

create index XXFND_SCHEDULE_PARAMETERS_I on XXFND_SCHEDULE_PARAMETERS_T (SCHEDULE_ID,SEQUENCE_NO);

