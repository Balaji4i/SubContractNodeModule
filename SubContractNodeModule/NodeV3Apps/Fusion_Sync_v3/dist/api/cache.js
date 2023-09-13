"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SchedulerStatus {
    constructor() {
        this.scheduler_status = {};
        this.addScheduleStatus = (schedule_id, param_seq_no) => {
            this.scheduler_status[schedule_id][param_seq_no] = 'RUNNING';
        };
        this.removeScheduleStatus = (schedule_id, param_seq_no) => {
            delete this.scheduler_status[schedule_id][param_seq_no];
        };
        this.getScheduleStatus = (schedule_id, param_seq_no) => {
            return this.scheduler_status[schedule_id][param_seq_no];
        };
        this.resetScheduleStatus = () => {
            console.log('reset schedule status called');
            this.scheduler_status = {};
        };
    }
}
exports.default = SchedulerStatus;
//# sourceMappingURL=cache.js.map