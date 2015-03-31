var Ticket = function(deadlineEl,ticketTitle){

  var now = moment();

  this.deadlineEl = deadlineEl;
  this.ticketTitle = ticketTitle;

  this.getTitle = function(){
    return this.ticketTitle.text();
  }

  this.getDeadlineMoment = function(){
    return moment(this.deadlineEl.text(), config.datePattern);
  }

  this.isAfterDeadline = function(){
    return now.isAfter(this.getDeadlineMoment());
  }

  this.isCloseDeadline = function(){
    var hoursLeft = this.getDeadlineMoment().diff(now,"hours");
    var minutesLeft = this.getDeadlineMoment().diff(now,"minutes");
    var isHoursLeft = hoursLeft < config.hoursAlarmLimit;
    var isMinutesLeft =  minutesLeft < config.minuteAlarmLimit;
    var isClose = isHoursLeft || isMinutesLeft;
    var msg = "Pamiętaj zakończyć zadanie. <br/>" + this.getTitle();
    return {
      isClose: isClose,
      msg: msg
    }
  }

  this.getTimeLeftText = function(){
    return "Termin zadania mija " + this.getDeadlineMoment().from(now);
  }

  this.getInfo = function(){
    var str = "";
    str = str + "<h4>" + this.getTitle() + "</h4>";
    //str = str + "\nisAfterDeadline " + this.isAfterDeadline();
    str = str + "<h5>" + this.getTimeLeftText() + "</h5>";
    str = str + "<h6>" + this.isCloseDeadline().isClose + "</h6>";
    return str;
  }

}
