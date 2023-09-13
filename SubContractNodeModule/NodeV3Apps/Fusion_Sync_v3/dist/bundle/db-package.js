"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xxfnd_node_scheduler = void 0;
exports.xxfnd_node_scheduler = {
    get_schedule: `
        BEGIN
            xxfnd_node_scheduler.get_schedule(
                p_cursor => :cursor,
                p_fusion_domain => :domain,
                p_fusion_uname => :username,
                p_fusion_pwd => :password,
                p_err_code => :err_code,
                p_err_msg => :err_msg
            );
        END;
        `,
    get_table_columns: `
        BEGIN
            xxfnd_node_scheduler.get_table_columns(
                p_table_name => :table_name,
                p_cursor => :cursor,
                p_err_code => :err_code,
                p_err_msg => :err_msg
            );
            END;
        `,
    ins_schdl_list: `
        BEGIN
            xxfnd_node_scheduler.ins_schdl_list(
                p_schedule_id => :schedule_id,
                p_table_name => :table_name,
                p_seq_no => :seq_no,
                p_schdl_list => :schedule_list,
                p_table_struct => :table_structure,
                p_err_code => :err_code,
                p_err_msg => :err_msg
            );
            END;
        `,
    execute_merge_query: `
        BEGIN
            xxfnd_node_scheduler.execute_merge_query(
                p_table_name => :table_name,
                p_merge => :query,
                p_err_code => :err_code,
                p_err_msg => :err_msg
            );
            END;
        `,
    upd_schdl_list_status: `
        BEGIN
            xxfnd_node_scheduler.upd_schdl_list_status(
                p_schdl_list_id => :schdl_list_id,
                p_seq_no => :seq_no,
                p_last_seq => :last_seq,
                p_report_record_count => :record_count,
                p_status => :status,
                p_err_msg => :err_msg
            );
            END;
        `,
    reset_schdl_list_status: `
        BEGIN
            xxfnd_node_scheduler.reset_schdl_list_status(
                p_err_code => :err_code,
                p_err_msg => :err_msg
            );
            END;
        `,
    get_schedule_params: `
        BEGIN
            xxfnd_node_scheduler.get_schedule_params(
                p_schedule_id => :schedule_id,
                p_param_count => :params_count,
                p_cursor => :params,
                p_already_running => :already_running,
                p_err_code => :err_code,
                p_err_msg => :err_msg
            );
            END;
        `,
    mail_notification: `
        BEGIN
            xxfnd_node_scheduler.mail_notification(
                p_mail_notification_flag => :mailNotificationFlag,
                p_record_count => :recordCount,
                p_mail_from => :mailFrom,
                p_mail_to => :mailTo,
                p_mail_subject => :mailSubject,
                p_cursor => :mailContent,
                p_err_code => :err_code,
                p_err_msg => :err_msg
            );
            END;
        `,
};
//# sourceMappingURL=db-package.js.map