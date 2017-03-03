$(document).ready(function () {
    var serviceURLs = window.serviceURLs;


 

  
 function ServiceFailed(result) {
        alert('Service call failed: ' + result.status + '' + result.statusText);
        Type = null; Url = null; Data = null; ContentType = null; DataType = null; ProcessData = null;
    }
      
	var winW = $(window).width();

	var winheight = $(window).height();
    
	var MOCEventsWindow = $("#divMOCEvents");
	
    //---------------------------------------------------------------------------------
	MOCEventsWindow.kendoWindow({
	    position: {
	        top: 150, // or "100px"
	        left: winW / 2 - $('#divDashBoard').width() / 2 
	    },
    width: $('#divDashBoard').width(),
	    height: 700,
	    title: "Management of change - Events",
	    visible: false,
	    actions: [
            "Minimize",
            "Maximize",
             "Close"
	    ]

	});
	var detailsScheduleWindow = $("#detailsSchedule");
    //---------------------------------------------------------------------------------
	detailsScheduleWindow.kendoWindow({
	    position: {
	        top: 100, // or "100px"
	        left: winW / 2 - $('#divDashBoard').width() / 2 + 40
	    },
	    width: 500,
	    height: 400,
	    title: "Schedule Event",
	    visible: false,
	    actions: [
             "Close"
	    ]

	});
	var wnd, detailsTemplate;
	//---------------------------------------------------------------------------------
	$("#btnMOCEvents").click(function () {
	      MOCEventsWindow.data("kendoWindow").open();
	    
	    LoadAllEvents();
	});
	
	function LoadAllEvents() {	    
	    var Url = serviceURLs["GetAllEvents"];	    
	    var ContentType = "application/json; charset=utf-8";
	    $.ajax({
	        type: 'POST',
	        url: Url,
	        // data: Data,
	        contentType: ContentType,
	        dataType: 'json',
	        processdata: true,
	        success: function (msg) {
	            LoadAllEventsSucceeded(msg);
	        },
	        error: ServiceFailed// When Service call fails
	    });


	  
	}
	function detailInitEvents(e) {
	    var detailRow = e.detailRow;
	    detailRow.find(".tabstrip").kendoTabStrip({	      
	        animation: {	           
	            open: { effects: "fadeIn" }
	        }
	    });
	    var eventID = detailRow.find(".eventid").text();
	    var Url = serviceURLs["GetEventsByID"];
	    var Data = '{"EventID": "' + eventID + '"}';
	    var ContentType = "application/json; charset=utf-8";
	    $.ajax({
	        type: 'POST',
	        url: Url,
	        data: Data,
	        contentType: ContentType,
	        dataType: 'json',
	        processdata: true,
	        success: function (msg) {
	            var resultObject = eval(msg.GetEventsByIDResult);
	          //  alert(resultObject);
	           
	          //  alert($("#gridEventsHistory"));
	            $("#gridEventsHistory").empty();

	            detailRow.find(".gridEventsHistory").kendoGrid({
	                dataSource: {
	                    data: resultObject
	                },	              
	                columns: [ 
                        { field: "Due_Date", title: "Due Date", template: "#= kendo.toString(kendo.parseDate(Due_Date, 'yyyy-MM-dd'), 'MM/dd/yyyy') #" },
                        { field: "Created_Date", title: "Created Date", template: "#= kendo.toString(kendo.parseDate(Created_Date, 'yyyy-MM-dd'), 'MM/dd/yyyy') #" }, 
                        { field: "Event_Unit", title: "Unit" }]                   

	            });
	        },
	        error: ServiceFailed// When Service call fails
	    });
	 
	}
	function LoadAllEventsSucceeded(result) {

	    var resultObject = eval(result.GetAllEventsResult);
	   // alert(resultObject);
	    var data = {
	        "d": resultObject
	    };

	    $("#gridMOCEvents").empty();

	   $("#gridMOCEvents").kendoGrid({
	       dataSource: {
	           data: resultObject,
	           pageSize: 5
	           
	        },	             
	       
	        filterable: true,
           sortable:true,
           height: 550,
           pageable: {
               refresh: true,
               pageSizes: true,
               buttonCount: 5
           },
           detailTemplate: kendo.template($("#templateEventDetails").html()),
           detailInit: detailInitEvents,
           //dataBound: function () {
           //    // this.expandRow(this.tbody.find("tr.k-master-row").first());
             
           //},
	        columns: [
                { field: "EventID", title: "Event ID", hidden: true },
               { field: "EventMedium", title: "Medium", width: "100px", filterable: { multi: true, search: true, search: true } },
                { field: "EventName", title: "Event Name" },
                { field: "RegAgency", title: "Regulatory Agency", filterable: { multi: true, search: true, search: true } },              
                { field: "ComplianceDate", title: "Frequency", filterable: { multi: true, search: true, search: true } },
	         { command: { text: "Reminder", click: showReminderWin }, width: "120px" },
             { command: { text: "Schedule", click: showDetails }, width:"120px" }]
                            
	    }); 
	
	}
	function showReminderWin(e)
	{
	    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
	    LoadEventDetailsSchedule(dataItem.EventID, dataItem.EventName, dataItem.RegAgency, dataItem.Regulation, dataItem.ComplianceDate);
	    $("#detailsSchedule").prev().find(".k-window-title").text("Event Reminder");
	    $("#btnReminder").show();
	    $("#btnSchedule").hide();
	    $("#trUnits").hide();
	    detailsScheduleWindow.data("kendoWindow").open();
	    detailsScheduleWindow.data("kendoWindow").center();
	}
	function showDetails(e)
	{	     
	    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
	 	//    $("#select-unit").kendoMobileButtonGroup({
	    //    select: function (e) {
	    //       // kendoConsole.log("selected index:" + e.index);
	    //    },
	    //    index: 0
	    //});
	    $("#trUnits").show();
	    $("#btnReminder").hide();
	    $("#btnSchedule").show();
	 	    $("#detailsSchedule").prev().find(".k-window-title").text("Schedule Event");
	    LoadEventDetailsSchedule(dataItem.EventID,dataItem.EventName,dataItem.RegAgency,dataItem.Regulation,dataItem.ComplianceDate);
	    detailsScheduleWindow.data("kendoWindow").open();
	    detailsScheduleWindow.data("kendoWindow").center();
	}

	function    LoadEventDetailsSchedule(EventID,EventName,RegAgency,Regulation,Frequency)
	{
	    $("#divEID").html(EventID);
	    $("#divEName").html(EventName);
	    $("#divEAgency").html(RegAgency);
	    $("#divERegulation").html(Regulation);
	    $("#divEFrequency").html(Frequency);
	    var Url = serviceURLs["LoadUnits"];
	    var ContentType = "application/json; charset=utf-8";

	    $.ajax({
	        type: 'POST',
	        url: Url,
	        // data: Data,
	        contentType: ContentType,
	        dataType: 'json',
	        processdata: true,
	        success: function (msg) {
	            var resultObject = eval(msg.GetUnitNamesResult);
               // alert(resultObject)
	            $("#dropdownUnits").kendoDropDownList({

	                dataTextField: "unit_name",
	                dataValueField: "unit_name",
	                dataSource: resultObject,
	                index: 0
	                

	            });
	            var color = $("#dropdownUnits").data("kendoDropDownList");
	            color.select(0);
	           
	            var  setValue = function () {
	                calendar.value($("#duedatevalue").val());
                    };

	            $("#duedatevalue").kendoDatePicker({
	                change: setValue
	            });

	            $("#btnReminder").kendoButton();
	            $("#btnSchedule").kendoButton();
	            var dropdownlist = $("#dropdownUnits").data("kendoDropDownList");
	            dropdownlist.enable(false);
	        },
	        error: ServiceFailed// When Service call fails
	    });
	}
	$('#chkSiteWide').change(function () {
	    var dropdownlist = $("#dropdownUnits").data("kendoDropDownList");
	    if ($(this).is(':checked')) 	    
	        dropdownlist.enable(false);
	    else
	        dropdownlist.enable(true);
	});
	$("#btnReminder").click(function () {
	    var Url = serviceURLs["SetEventReminder"];
	    var eventid = $("#divEID").text();
	    // var units = $("#dropdownUnits").data("kendoDropDownList");	    
	    var duedate = $("#duedatevalue").val();

	    var Data = '{"EventID": "' + eventid + '","ReminderDate": "' + duedate + '"}';
	    // alert(Data);
	    var ContentType = "application/json; charset=utf-8";

	    $.ajax({
	        type: 'POST',
	        url: Url,
	        data: Data,
	        contentType: ContentType,
	        dataType: 'json',
	        processdata: true,
	        success: function (msg) {

	            // var resultObject1 = eval(msg.ScheduleNewEventResult);
	            alert(msg.SetEventReminderResult);
	        },
	        error: ServiceFailed// When Service call fails
	    });


	});
	$("#btnSchedule").click(function () {
	  //  MOCEventsWindow.data("kendoWindow").open();

	    var Url = serviceURLs["ScheduleNewEvent"];
	    var eventid = $("#divEID").text();
	   // var units = $("#dropdownUnits").data("kendoDropDownList");	    
	    var duedate = $("#duedatevalue").val();
	    var unit = $("#dropdownUnits").val();
	    if ($("#chksitewide").is(':checked'))
	        unit = "null";
	    var Data = '{"EventID": "' + eventid + '","DueDate": "' + duedate + '","Unit":"' + unit + '"}';
	   // alert(Data);
	    var ContentType = "application/json; charset=utf-8";

	    $.ajax({
	        type: 'POST',
	        url: Url,
	        data: Data,
	        contentType: ContentType,
	        dataType: 'json',
	        processdata: true,
	        success: function (msg) {
	           
	           // var resultObject1 = eval(msg.ScheduleNewEventResult);
	            alert(msg.ScheduleNewEventResult);
	        },
	        error: ServiceFailed// When Service call fails
	    });


	});
	
	function ServiceFailed(result) {
	    alert('Service call failed: ' + result.status + '' + result.statusText);
	    Type = null; Url = null; Data = null; ContentType = null; DataType = null; ProcessData = null;
	}
	
});          