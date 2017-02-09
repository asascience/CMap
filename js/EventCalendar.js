$(document).ready(function () {
    var serviceURLs = window.serviceURLs;
    
  
 function ServiceFailed(result) {
        alert('Service call failed: ' + result.status + '' + result.statusText);
        Type = null; Url = null; Data = null; ContentType = null; DataType = null; ProcessData = null;
    }
   


	
    
	var winW = $(window).width();

	var winheight = $(window).height();

	$('#divDashBoard').css('width', winW - 360);

	$('#divDashBoard').css('left', winW / 2 - $('#divDashBoard').width() / 2 - 20);

	$('#divFC1').css('width', winW - 600);

	$('#chartContainer').css('width', winW - 600);
	var ETCalendarWindow = $("#divETCalendar");
    //---------------------------------------------------------------------------------
	ETCalendarWindow.kendoWindow({
	    position: {
	        top: 100, // or "100px"
	        left: winW / 2 - $('#divDashBoard').width() / 2 + 40
	    },
	    width: winW - 500,
	    height: 700,
	    title: "Event Tickler - Calendar",
	    visible: false,
	    actions: [
             "Close"
	    ]

	});
    //---------------------------------------------------------------------------------
	$(function () {
	    $("#divEventDescriptionsToday").accordion({
	        heightStyle: "content",
	        header: "h3", collapsible: true
	    });

	    $("#divEventDescriptionsUpcoming").accordion({
	        heightStyle: "content",
	        header: "h3", collapsible: true
	    });
	});
    //---------------------------------------------------------------------------------
	function GetEventsSucceeded(result) {
	    var date, upcomingEvents = [], todaysEvents = [];
	    var events = [, ];
	    resultObject = eval(result.GetEventsResult);
	    $.each(resultObject, function (i, item) {
	        date = new Date(parseInt(item.Due_Date.substr(6)));
	        events.push(+new Date(date.getFullYear(), date.getMonth(), date.getDate()));
	        var eventdate = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
	        upcomingEvents.push("<li>" + item.Event_name + " - " + eventdate);
	    });
	    //Today's Events

	    if (todaysEvents.length == 0)
	        $("#divTodayEvents").append("No events today");
	    else
	        $("#divTodayEvents").append(todaysEvents.join(''));
	    //Upcoming Events
	    if (upcomingEvents.length == 0)
	        $("#divUpcomingEvents").append("No upcoming events");
	    else
	        $("#divUpcomingEvents").append(upcomingEvents.join(''));

	    var today = new Date();
	    var content = '# if ($.inArray(+data.date, data.dates) != -1) { #' +
                             '<div class="' +
                                    "exhibition" +
                             '">#= data.value #</div>' +
                          '# } else { #' +
                          '#= data.value #' +
                          '# } #';

	    $("#calendar").kendoCalendar({
	        value: today,
	        // change: CreateNewEvent,
	        dates: events,
	        weekNumber: false,
	        month: {
	            title: "Hello",
	            content: content
	        },
	        footer: false
	    });
	}


    //---------------------------------------------------------------------------------
	function CreateNewEvent() {
	    alert("hello");

	}
    //---------------------------------------------------------------------------------
	$('#btnETCalendar').click(function () {

	    LoadEventCalendar();
	    ETCalendarWindow.data("kendoWindow").open();
	});
	function LoadEventCalendar() {
	    $("#calendar").empty();
	    $("#divUpcomingEvents").empty();
	    $("#divTodayEvents").empty();	    
	    var Url = serviceURLs["EventCalendar"];
	    var ContentType = "application/json; charset=utf-8";

	    $.ajax({
	        type: 'POST',
	        url: Url,
	        // data: Data,
	        contentType: ContentType,
	        dataType: 'json',
	        processdata: true,
	        success: function (msg) {
	            GetEventsSucceeded(msg);
	        },
	        error: ServiceFailed// When Service call fails
	    });
	}
	
});          