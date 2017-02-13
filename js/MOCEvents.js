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
	        top: 100, // or "100px"
	        left: winW / 2 - $('#divDashBoard').width() / 2 + 40
	    },
	    width: winW - 500,
	    height: 700,
	    title: "Management of change - Events",
	    visible: false,
	    actions: [
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
	    width: winW - 500,
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
	function LoadAllEventsSucceeded(result) {

	    var resultObject = eval(result.GetAllEventsResult);
	   // alert(resultObject);
	    var data = {
	        "d": resultObject
	    };

	   $("#gridMOCEvents").kendoGrid({
	        dataSource: {
	            transport: {
	                read: function (options) {
	                    options.success(data);
	                }
	            },
	            schema: {
	                data: "d"
	            }
	        },	             
	        pageable: true,
	        filterable: true,
           sortable:true,
	        height: 550,
	        columns: [
                { field: "EventID", title: "Event ID", width: "70px" },
                { field: "EventName", title: "Event Name" },
                { field: "RegAgency", title: "Regulatory Agency", filterable: { multi: true, search: true, search: true } },
                { field: "Regulation", title: "Regulation", filterable: { multi: true, search: true, search: true } },
                { field: "ComplianceDate", title: "Frequency", filterable: { multi: true, search: true, search: true } },
	         { command: { text: "Schedule", click: showDetails }, title: " " }]
                            
	    }); 
	
	}
	function showDetails(e)
	{
	  //  $("#txtEventID").val(e.data.EventID);
	    
	    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
	 //   $('#txtEventID').val = dataItem.EventID;
	    
	    LoadEventDetailsSchedule(dataItem.EventID,dataItem.EventName,dataItem.RegAgency,dataItem.Regulation,dataItem.ComplianceDate);
	    detailsScheduleWindow.data("kendoWindow").open();
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


	            $("#btnSchedule").kendoButton();
	        },
	        error: ServiceFailed// When Service call fails
	    });
	}
	$("#btnSchedule").click(function () {
	  //  MOCEventsWindow.data("kendoWindow").open();

	    var Url = serviceURLs["ScheduleNewEvent"];
	    var eventid = $("#divEID").text();
	   // var units = $("#dropdownUnits").data("kendoDropDownList");	    
	    var duedate = $("#duedatevalue").val();
	    var unit =  $("#dropdownUnits").val();
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