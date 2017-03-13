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
        modal:true,
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
	        top: 20, // or "100px"
	        left: winW / 2 - $('#divDashBoard').width() / 2 + 40
	    },
        modal:true,
	    width: 500,
	    height: 600,
	    title: "Schedule Event",
	    visible: false,
	    close: onClosedetailsScheduleWindow,
	    actions: [
             "Close"
	    ]

	});
	function onClosedetailsScheduleWindow(e) {
	    $('#detailsScheduleForm')[0].reset();
	    $("#dropdownUnitsNew").remove();
	}
	var wnd, detailsTemplate;
	//---------------------------------------------------------------------------------
	//$("#btnMOCEvents").click(function() {
	  
	     
	//    LoadAllEvents();
	//});
	$(function () {
	    $('#btnMOCEvents').click(LoadAllEvents);
	});
	function LoadAllEvents() {
	    MOCEventsWindow.data("kendoWindow").open();
	    
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
	         
	            $("#gridEventsHistory").empty();

	            detailRow.find(".gridEventsHistory").kendoGrid({
	                dataSource: {
	                    data: resultObject
	                },	              
	                columns: [ 
                        { field: "Due_Date", title: "Due Date", template: "#= kendo.toString(kendo.parseDate(Due_Date, 'yyyy-MM-dd'), 'MM/dd/yyyy') #" },
                        { field: "Created_Date", title: "Created Date", template: "#= kendo.toString(kendo.parseDate(Created_Date, 'yyyy-MM-dd'), 'MM/dd/yyyy') #" }, 
                        { field: "Event_Unit", title: "Unit" },
	                { field: "Status", title: "Status" }]

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
	    //if (!$("#gridMOCEvents").data("kendoGrid")) {
	        $("#gridMOCEvents").kendoGrid({
	            dataSource: {
	                data: resultObject,
	                pageSize: 5

	            },

	            filterable: true,
	            sortable: true,
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
                // { command: { text: "Reminder", click: showReminderWin }, width: "120px" },
                 { command: { text: "Schedule", click: showDetails }, width: "120px" }]

	        });
	 //   }
	
	}
	//function showReminderWin(e)
	//{
	//    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
	//    LoadEventDetailsSchedule(dataItem.EventID, dataItem.EventName, dataItem.RegAgency, dataItem.Regulation, dataItem.ComplianceDate);
	//    $("#detailsSchedule").prev().find(".k-window-title").text("Event Reminder");
	//    $("#btnReminder").show();
	//    $("#btnSchedule").hide();
	//    $("#trUnits").hide();
	//    detailsScheduleWindow.data("kendoWindow").open();
	//    detailsScheduleWindow.data("kendoWindow").center();
	//}
	function showDetails(e)
	{	     
	    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
	   
	 	    $("#detailsSchedule").prev().find(".k-window-title").text("Schedule Event");
	    LoadEventDetailsSchedule(dataItem.EventID,dataItem.EventName,dataItem.RegAgency,dataItem.Regulation,dataItem.ComplianceDate);
	    detailsScheduleWindow.data("kendoWindow").open();
	    detailsScheduleWindow.data("kendoWindow").center();
	}

	function    LoadEventDetailsSchedule(EventID,EventName,RegAgency,Regulation,Frequency)
	{
	    //alert("Load Events");
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
	           	          
	            $("#dropdownUnitsNew").kendoMultiSelect({
                    enable:false,
	                dataTextField: "unit_name",
	                dataValueField: "unit_name",
	                dataSource: resultObject,
	                itemTemplate: "#:data.unit_name# <input type='checkbox'/>",
	                index: 0,
	                change: function () {
	                    var items = this.ul.find("li");
	                    checkInputs(items);
	                },
	                autoClose: false,
	                dataBound: function () {
	                    var items = this.ul.find("li");
	                    setTimeout(function () {
	                        checkInputs(items);
	                    });
	                }
	            });
	          //  dropdownUnitsNew.enable(false);

	            var checkInputs = function (elements) {
	                elements.each(function () {
	                    var element = $(this);
	                    var input = element.children("input");

	                    input.prop("checked", element.hasClass("k-state-selected"));
	                });
	            };
	          



	            //var color = $("#dropdownUnits").data("kendoDropDownList");
	            //color.select(0);
	           
	            var  setValue = function () {
	                calendar.value($("#duedatevalue").val());
                    };

	            $("#duedatevalue").kendoDatePicker({
	               // change: setValue
	            });

	            $("#reminderdatevalue").kendoDatePicker({
	                //change: setValue
	            });

	           // $("#btnReminder").kendoButton();
	            $("#btnSchedule").kendoButton();
	         //   var dropdownlist = $("#dropdownUnits").data("kendoDropDownList");
	          //  dropdownlist.enable(false);
	        },
	        error: ServiceFailed// When Service call fails
	    });
	}
	$('#radiositewide1').change(function () {
	    var dropdownlist = $("#dropdownUnitsNew").data("kendoMultiSelect");
	    if ($(this).is(':checked')) {	      
	        dropdownlist.enable(false);
	    } 
	});

	$('#radiositewide2').change(function () {
	    var dropdownlist = $("#dropdownUnitsNew").data("kendoMultiSelect");
	    if ($(this).is(':checked')) {
	        dropdownlist.enable(true);
	    }
	});

	//$("#btnReminder").click(function () {
	//    var Url = serviceURLs["SetEventReminder"];
	//    var eventid = $("#divEID").text();
	//    // var units = $("#dropdownUnits").data("kendoDropDownList");	    
	//    var duedate = $("#duedatevalue").val();

	//    var Data = '{"EventID": "' + eventid + '","ReminderDate": "' + duedate + '"}';
	//    // alert(Data);
	//    var ContentType = "application/json; charset=utf-8";

	//    $.ajax({
	//        type: 'POST',
	//        url: Url,
	//        data: Data,
	//        contentType: ContentType,
	//        dataType: 'json',
	//        processdata: true,
	//        success: function (msg) {

	//            // var resultObject1 = eval(msg.ScheduleNewEventResult);
	//            alert(msg.SetEventReminderResult);
	//        },
	//        error: ServiceFailed// When Service call fails
	//    });


	//});
	//$("#btnSchedule").click(function () {
	  
	
	   
	 


	
	//});


	$("#detailsScheduleForm").submit(function (event) {
	    //event.preventDefault();
	    var validator = $("#detailsScheduleForm").kendoValidator().data("kendoValidator");
	    event.stopPropagation()
	    if (validator.validate()) {
	       
	        var Url = serviceURLs["ScheduleNewEvent"];
	        var eventid = $("#divEID").text();
	        var reminderdate = $("#reminderdatevalue").val();
	        var duedate = $("#duedatevalue").val();

	        var unit = "";//$("#dropdownUnits").val();
	        // if ($("#chksitewide").is(':checked'))
	        if ($("#radiositewide1").is(':checked'))
	            unit = "null";
	        else {
	            //  var valUnits = $("#dropdownUnitsNew").kendoMultiSelect().data("kendoMultiSelect");
	            var valUnits = $("#dropdownUnitsNew");
	            unit = valUnits.val();
	           // alert(unit);
	        }
	        var Data = '{"EventID": "' + eventid + '","DueDate": "' + duedate + '","ReminderDate": "' + reminderdate + '","Unit":"' + unit + '"}';
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

	        return false;
	    }
	    else { alert("Invalid"); }
	});

	
	function ServiceFailed(result) {
	    alert('Service call failed: ' + result.status + '' + result.statusText);
	    Type = null; Url = null; Data = null; ContentType = null; DataType = null; ProcessData = null;
	}
	
});          