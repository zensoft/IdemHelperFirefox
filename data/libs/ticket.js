var Ticket = function(deadlineEl,ticketTitle,limitTime,usedLimitTime){

  var now = moment();

  this.deadlineEl = deadlineEl;
  this.ticketTitle = ticketTitle;
  this.limitTime = limitTime;
  this.usedLimitTime = usedLimitTime;

  this.getTitle = function(){
    return this.ticketTitle.text();
  }

  this.getDeadlineMoment = function(){
    return moment(this.deadlineEl.text(), config.datePattern);
  }

  this.isAfterDeadline = function(){
    return now.isAfter(this.getDeadlineMoment());
  }

  this.isTicketWithTimeLimit = function(){
    return this.limitTime.text() ? true : false;
  }

  this.isWorkStarted = function(){
    return this.usedLimitTime.text() ? true : false;
  }

  this.getTimeLimitInfo = function(){
    var msg = this.getTitle() + " <br/> ";
    var type = "warning";
    var limitTimeObject = this.getTimeObject(this.limitTime.text());
    if(this.isWorkStarted()){
      var usedLimitTimeObject = this.getTimeObject(this.usedLimitTime.text());
      var usedLimitIntTime = this.getIntTime(usedLimitTimeObject);
      var limitIntTime = this.getIntTime(limitTimeObject);
      var workTimeDiff = limitIntTime - usedLimitIntTime;
      if(workTimeDiff > 0){
        var workDiffTimeObject = this.getTimeObjectFromIntTime(workTimeDiff);
        msg += "Zostało " + workDiffTimeObject.hours + " godzin i " + workDiffTimeObject.minutes + " minut";
      }else if(workTimeDiff == 0){
        msg += "koniec czasu na zadaniu";
        type = "error";
      }else{
        var workDiffTimeObject = this.getTimeObjectFromIntTime(workTimeDiff * -1);
        msg += "Czas przekroczony o " + workDiffTimeObject.hours + " godzin i " + workDiffTimeObject.minutes + " minut";
        type = "error";
      }
    }else{
      msg += "Zostało " + limitTimeObject.hours + " godzin i " + limitTimeObject.minutes + " minut";
    }
    return {
      msg:msg,
      type:type
    }
  }

  this.getIntTime = function(timeObject){
    return (timeObject.hours * 60) + timeObject.minutes;
  }

  this.getTimeObjectFromIntTime = function(intTime){
    return{
      hours: parseInt(intTime / 60),
      minutes: intTime % 60
    }
  }

  this.getTimeObject = function(timeText){
    //XX_godz._XX_min.
    var tab = timeText.split("godz.");
    var hours = parseInt(tab[0]);
    var minutes = tab[1] ? parseInt(tab[1].replace("min.","")) : 0;
    return{
      hours:hours,
      minutes:minutes
    }
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
    str = str + "<h5>" + this.getTimeLeftText() + "</h5>";
    str = str + "<h6>" + this.isCloseDeadline().isClose + "</h6>";
    return str;
  }

}
