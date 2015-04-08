String.prototype.contain = function(it) { return this.indexOf(it) != -1; };
moment.locale("pl");
var config = {
  datePattern: "YYYY-MM-DDHH:mm:ss",
  deadlineIndex:5,
  limitUsedTimeIndex:7,
  limitTimeIndex:8,
  ticketTitleIndex:2,
  filteredColors: ["#a2dced","#fdf4dd","#EEF3D1"],
  hoursAlarmLimit:208,
  minuteAlarmLimit:161
}
