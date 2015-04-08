var TicketsView = function(tickets){

  var viewId = "ticketsViewDiv";
  var that = this;
  this.$viewEl;
  this.tickets;

  this.init = function(){
    $("#" + viewId).remove();
    var _viewEl = $("body").find("#" + viewId);
    if(_viewEl.length == 0){
        _viewEl = $("<div/>", {
            id: viewId,
            text: ""
        });
        $("body").prepend(_viewEl);
    }
    _viewEl.hide();
    this.$viewEl = _viewEl;
    this.tickets = tickets;
  };

  this.printView = function(){
    this.clearAlerts();
    var $ul = $("<ul/>");
    var isTicketsWithTimeLimit = false;
    for(var i in this.tickets){
      var ticket = that.tickets[i];
      $ul.append("<li>" + ticket.getInfo() + "</li>");
      var isCloseDeadline = ticket.isCloseDeadline();
      if(isCloseDeadline.isClose){
        that.showAlert(isCloseDeadline.msg ,"warning");
      }
      if(ticket.isAfterDeadline()){
        var msg = "Przekroczono termin zadania<br/> " + ticket.getTitle();
        that.showAlert(msg,"error");
      }
      if(ticket.isTicketWithTimeLimit()){
        isTicketsWithTimeLimit = true;
      }
    }
    if(isTicketsWithTimeLimit){
      this.showAlert("====================<br/>Tickety z limitem czasu:<br/>====================","warning");
      for(var i in this.tickets){
        var ticket = that.tickets[i];
        if(ticket.isTicketWithTimeLimit()){
          var timeLimitInfo = ticket.getTimeLimitInfo();
          that.showAlert(timeLimitInfo.msg,timeLimitInfo.type);
        }
      }
    }
    that.$viewEl.append($ul);
  }

  this.showAlert = function(msg,type){
    var n = noty({
        text: msg,
        type: type
    });
  }

  this.clearAlerts = function(){
    $.noty.closeAll();
  }

  //auto init
  ;(function(){
    that.init();
    that.printView();
  })();

};
