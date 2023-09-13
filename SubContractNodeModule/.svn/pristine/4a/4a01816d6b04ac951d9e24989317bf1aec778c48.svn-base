CREATE OR REPLACE PACKAGE xxfnd_node_scheduler AS
    PROCEDURE get_schedule (
        p_cursor     OUT   SYS_REFCURSOR,
        p_err_code   OUT   VARCHAR2,
        p_err_msg    OUT   VARCHAR2
    );

    PROCEDURE ins_schdl_list (
        p_schedule_id    IN    NUMBER,
        p_table_name     IN    VARCHAR2,
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
        p_status          IN   VARCHAR2,
        p_err_msg         IN   VARCHAR
    );

END xxfnd_node_scheduler;

/


CREATE OR REPLACE PACKAGE BODY xxfnd_node_scheduler AS

    PROCEDURE get_schedule (
        p_cursor     OUT   SYS_REFCURSOR,
        p_err_code   OUT   VARCHAR2,
        p_err_msg    OUT   VARCHAR2
    ) AS
    BEGIN
        OPEN p_cursor FOR SELECT
                              schedule_id,
                              schedule_name,
                              frequency_min,
                              program_name,
                              bi_report_path,
                              bi_report_name,
                              db_refresh_pkg,
                              application_name,
                              next_schedule_time,
                              created_by,
                              creation_date,
                              last_updated_by,
                              last_update_date,
                              last_update_login,
                              run_status,
                              status,
                              upper(db_table_name) db_table_name,
                              upper(db_column_names) db_column_names
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
        p_schdl_list     OUT   SYS_REFCURSOR,
        p_table_struct   OUT   SYS_REFCURSOR,
        p_err_code       OUT   VARCHAR2,
        p_err_msg        OUT   VARCHAR2
    ) AS

        l_db_refresh_pkg       xxfnd_schedule_list_t.db_refresh_pkg%TYPE;
        l_schedule_list_id     xxfnd_schedule_list_t.schedule_list_id%TYPE;
        l_schedule_name        xxfnd_schedule_list_t.schedule_name%TYPE;
        l_program_name         xxfnd_schedule_list_t.program_name%TYPE;
        l_last_refresh_time    xxfnd_schedule_list_t.last_refresh_time%TYPE;
        l_next_schedule_time   xxfnd_schedule_list_t.last_refresh_time%TYPE;
        l_bi_report_path       xxfnd_schedule_list_t.bi_report_path%TYPE;
        l_bi_report_name       xxfnd_schedule_list_t.bi_report_name%TYPE;
        l_schedule_status      xxfnd_schedule_list_t.schedule_status%TYPE;
    BEGIN
        SELECT
            schedule_name,
            program_name,
            next_schedule_time last_refresh_time,
--            SYSDATE + ( ( frequency_min - 334 ) / 24 / 60 ) next_schedule_time,
            SYSDATE + ( ( frequency_min - 245 ) / 24 / 60 ) next_schedule_time,
--            cast(SYSDATE + ( ( frequency_min - 10 ) / 24 / 60 )  as timestamp) AT TIME ZONE 'GMT' next_schedule_time,
            bi_report_path,
            bi_report_name,
            db_refresh_pkg,
            'RUNNING' schedule_status
        INTO
            l_schedule_name,
            l_program_name,
            l_last_refresh_time,
            l_next_schedule_time,
            l_bi_report_path,
            l_bi_report_name,
            l_db_refresh_pkg,
            l_schedule_status
        FROM
            xxfnd_schedule_t
        WHERE
            schedule_id = p_schedule_id;

        INSERT INTO xxfnd_schedule_list_t (
            schedule_list_id,
            schedule_id,
            schedule_name,
            program_name,
            last_refresh_time,
            bi_report_path,
            bi_report_name,
            db_refresh_pkg,
            schedule_status,
            created_by,
            creation_date,
            last_updated_by,
            last_update_date,
            last_update_login
        ) VALUES (
            xxfnd_schedule_list_s.NEXTVAL,
            p_schedule_id,
            l_schedule_name,
            l_program_name,
            l_last_refresh_time,
            l_bi_report_path,
            l_bi_report_name,
            l_db_refresh_pkg,
            l_schedule_status,
            '-1',
            SYSDATE,
            '-1',
            SYSDATE,
            '-1'
        ) RETURNING schedule_list_id INTO l_schedule_list_id;

        UPDATE xxfnd_schedule_t
        SET
--            next_schedule_time = to_timestamp(p_nxt_schdl, 'DD-Mon-RR HH24:MI:SS.FF'),
            next_schedule_time = l_next_schedule_time,
            last_update_date = SYSDATE
        WHERE
            schedule_id = p_schedule_id;

        COMMIT;
        OPEN p_schdl_list FOR SELECT
                                  *
                              FROM
                                  xxfnd_schedule_list_t
                              WHERE
                                  schedule_list_id = l_schedule_list_id
                                  AND schedule_id = p_schedule_id;

        OPEN p_table_struct FOR SELECT
                                   column_name,
                                   data_type
                               FROM
                                   user_tab_columns
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
        OPEN p_cursor FOR SELECT
                              column_name,
                              data_type
                          FROM
                              user_tab_columns
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
        p_status          IN   VARCHAR2,
        p_err_msg         IN   VARCHAR
    ) AS
    BEGIN
        UPDATE xxfnd_schedule_list_t
        SET
            schedule_status = p_status,
            error_message = p_err_msg,
            last_update_date = SYSDATE
        WHERE
            schedule_list_id = p_schdl_list_id;

        COMMIT;
    END upd_schdl_list_status;

END xxfnd_node_scheduler;
/
