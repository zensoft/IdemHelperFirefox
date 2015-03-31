function getAllTickets(rows){
  var _tickets = [];
  rows.each(function(){
    var deadlineEl = $(this).children().eq(config.deadlineIndex);
    var ticketTitle = $(this).children().eq(config.ticketTitleIndex);
    _tickets.push(new Ticket(deadlineEl,ticketTitle));
  });
  return _tickets;
}


function getAllRows(){
  return $("table tr").filter(function(){
      var color = $(this).attr("style") + "";
      for(var i in config.filteredColors){
        var htmlColor = config.filteredColors[i];
        if(color.contain(htmlColor)){
          return true;
        }
      }
      return false;
  });
}

var tickets  = getAllTickets(getAllRows());
new TicketsView(tickets);
