$(document).ready(function () {
    var serviceURLs = window.serviceURLs;


    function ServiceFailed(result) {
        alert('Service call failed: ' + result.status + '' + result.statusText);
        Type = null; Url = null; Data = null; ContentType = null; DataType = null; ProcessData = null;
    }





    var winW = $(window).width();

    var winheight = $(window).height();

    // $('#divDashBoard').css('width', winW - 360);

    // $('#divDashBoard').css('left', winW / 2 - $('#divDashBoard').width() / 2 - 20);



    $('#chartContainer').css('width', winW - 600);
    var ETCalendarWindow = $("#divETCalendar");//---------------------------------------------------------------------------------
    var ETInspectWindow = $("#divETInspections");
    var ETCompleteEventWindow = $("#divCompleteEvent");
    var detailsWindow = $("#details");
    //---------------------------------------------------------------------------------
    ETCompleteEventWindow.kendoWindow({
        position: {
            top: 150, // or "100px"
            left:500
        },
        width: 400,
        modal: true,
        maxHeight: winheight - $('.page-wrapper-top').height() - 100,
        title: "Event Tickler - Complete Event",
        visible: false,
        actions: [
            "Close"
        ]

    });
    //---------------------------------------------------------------------------------
    ETInspectWindow.kendoWindow({
        position: {
            top: 150, // or "100px"
            left: 250
        },
        width: winW - 500,
        maxHeight: winheight - $('.page-wrapper-top').height() - 100,
        title: "Event Tickler - Inspections",
        visible: false,
        actions: [
             "Close"
        ]

    });
    //---------------------------------------------------------------------------------
    detailsWindow.kendoWindow({
        position: {
            top: 130, // or "100px"
            left: winW / 8 - $('#details').width() / 2 - 10
        },
        width: 500,
        height: 300,
        title: "Inspection History - Add Comment",
        visible: false,
        actions: [
            "Close"
        ],

    });

    //---------------------------------------------------------------------------------
    ETCalendarWindow.kendoWindow({
        position: {
            top: 150, // or "100px"
            left: winW / 3
        },
        width: 550,
        maxHeight: winheight - $('.page-wrapper-top').height() - 100,
        title: "Event Tickler - Calendar",
        visible: false,
        actions: [
             "Close"
        ]

    });

    //---------------------------------------------------------------------------------
    var Url = serviceURLs["GetTodaysEventReminders"];
    var ContentType = "application/json; charset=utf-8";
    $.ajax({
        type: 'POST',
        url: Url,
        // data: Data,
        contentType: ContentType,
        dataType: 'json',
        processdata: true,
        success: function (msg) {
            GetTodaysEventRemindersSucceeded(msg);
        },
        error: ServiceFailed// When Service call fails
    });
    //---------------------------------------------------------------------------------
    var dialogERs = $('#dialogEventReminders');
    dialogERs.kendoDialog({
        width: "400px",
        title: "Event Reminders",
        closable: true,
        modal: true,
        visible:false,
        content: "",
        actions: [
           
            { text: 'Ok', primary: true }
        ]
    });
    LoadECEventsCount();
    $('#btnETTraining').click(function () {

        ETInspectWindow.data("kendoWindow").open();
        var EventType = "Training";
        loadinspectiontraining(EventType);


        var dialog = $("#divETInspections").data("kendoWindow");
        dialog.title("Event Tickler - Training");
      //  alert(dialog.title);
    });
    //---------------------------------------------------------------------------------
    $('#btnETInspections').click(function () {
        
        ETInspectWindow.data("kendoWindow").open();
        var EventType = "Inspection";
        loadinspectiontraining(EventType);

        var dialog = $("#divETInspections").data("kendoWindow");
        dialog.title("Event Tickler - Inspections");

    });
    function LoadECEventsCount()
        {
        var Type = "POST";
        var Url = serviceURLs["GetEventsCount"];               
        var ContentType = "application/json; charset=utf-8";
        var DataType = "json";

        $.ajax({
            type: Type,
            url: Url,          
            contentType: ContentType,
            dataType: DataType,
            processdata: true,
            success: function (msg) {

                var resultObject = eval(msg.GetEventsCountResult);
               // alert(resultObject[0].Inspections);
                $("#ECInspectionsCnt").text(resultObject[0].Inspections);
                $("#ECTrainingsCnt").text(resultObject[0].Trainings);
            },
            error: ServiceFailed// When Service call fails
        });

        }
    function loadinspectiontraining(EventType)
    {
        var Type = "POST";
        var Url = serviceURLs["GetEventsByType"];;
        var Data = '{"Type": "' + EventType + '"}';
        var ContentType = "application/json; charset=utf-8";
        var DataType = "json";

        $.ajax({
            type: Type,
            url: Url,
            data: Data,
            contentType: ContentType,
            dataType: DataType,
            processdata: true,
            success: function (msg) {
                GetinspectionsListSucceeded(msg);
                //alert("success");
            },
            error: ServiceFailed// When Service call fails
        });

    }

    function GetinspectionsListSucceeded(result) {

        var rowTemplateString =
            '<td>#: Status #</td>';
            
        resultObject = eval(result.GetEventsByTypeResult);

        // alert(resultObject);
        $("#datagridinspections").empty();
        $("#datagridinspections").kendoGrid({
            columns: [{ field: "Calendar_ID", hidden: true },

            { field: "Event_name", title: "Name" },
            { field: "Event_Unit", title: "Unit", filterable: { multi: true, search: true } },

            { field: "Created_Date", title: "Created Date", filterable: { multi: true, search: true }, template: "#= kendo.toString(kendo.parseDate(Created_Date, 'yyyy-MM-dd'), 'MM/dd/yyyy') #" },
            //{ field: "Status", title: "Status",template:rowTemplateString, filterable: { multi: true, search: true, search: true } },   
            { field: "Due_Date", title: "Due Date", filterable: { multi: true, search: true }, template: "#= kendo.toString(kendo.parseDate(Due_Date, 'yyyy-MM-dd'), 'MM/dd/yyyy') #" },
            { field: "Status", title: "Status", template: ApplyColorsonStatus, filterable: { multi: true, search: true } },
            
            { command: { text: "Complete Event", click: CompleteEventWindow }, width: "120px" }],
        
            dataSource: {
                data: resultObject

            },
           // rowTemplate: rowTemplateString,
            filterable: true,
            sortable: true,
         
            //dataBound: function () {
            //    this.expandRow(this.tbody.find("tr.k-master-row"));
            //},
            detailInit: detailInit      

           
           

        });




    }
function ApplyColorsonStatus(dataItem)
{
    var status= dataItem.Status;
    //  if (dataItem.Status == "Completed")
    status = "<span class='status" + dataItem.Status + "'>" + dataItem.Status + "</span>";
    return status;
}
function CompleteEventWindow(e) {
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
   // if (dataItem.Status == "Outstanding")
      
    $("#dateEventCompleted").kendoDatePicker({});
    var todayDate = kendo.toString(kendo.parseDate(new Date()), 'MM/dd/yyyy');
    $("#dateEventCompleted").data("kendoDatePicker").value(todayDate);
    $("#btnCompleteEvent").kendoButton();
        //LoadEventDetailsSchedule(dataItem.EventID, dataItem.EventName, dataItem.RegAgency, dataItem.Regulation, dataItem.ComplianceDate);
    $("#completedEventID").text(dataItem.Calendar_ID);

    ETCompleteEventWindow.data("kendoWindow").open();
    ETCompleteEventWindow.data("kendoWindow").center();
      //  UpdateEventDetails(dataItem.Calendar_ID);


    }
$("#btnCompleteEvent").click(function () {   
  
    UpdateEventDetails( $("#completedEventID").text());

});

function UpdateEventDetails(Calendar_ID) {
   // alert(Calendar_ID);

        var uesrid = "2"; var Type = "POST";
        var Url = serviceURLs["UpdatEventID"];
        var compdate =  $("#dateEventCompleted").val();
        var Data = '{"Id": "' + Calendar_ID + '","CompletedDate": "' + compdate + '"}';
        var ContentType = "application/json; charset=utf-8";
        var DataType = "json";


        $.ajax({
            type: Type,
            url: Url,
            data: Data,
            contentType: ContentType,
            dataType: DataType,
            processdata: true,
            success: function (msg) {
               

                var dialog = $("#divETInspections").data("kendoWindow");

                var EventType = "Inspection";


                loadinspectiontraining(EventType);
                LoadECEventsCount();
                ETCompleteEventWindow.data("kendoWindow").close();

            },
            error: ServiceFailed// When Service call fails
        });

    }
    function detailInit(e) {

        var uesrid = "2"; var Type = "POST";
        var Url = serviceURLs["inspectionshistory"];
       // alert(e.data.Calendar_ID);
        var Data = '{"Id": "' + e.data.Calendar_ID + '"}';
        var ContentType = "application/json; charset=utf-8";
        var DataType = "json";
       // alert(e.data.Calendar_ID);
      $("#txttankid").html(e.data.Event_name);
        $("#txtEventCalID").text(e.data.Calendar_ID);

        $.ajax({
            type: Type,
            url: Url,
            data: Data,
            contentType: ContentType,
            dataType: DataType,
            processdata: true,
            success: function (msg) {
                
                resultObject = eval(msg.GetInspectionsHistoryResult);

                //alert(resultObject);
                $("<div/>").appendTo(e.detailCell).kendoGrid({


                    dataSource: resultObject,
                    scrollable: false,
                    dataBound: function () {
                        // this.expandRow(this.tbody.find("tr.k-master-row").first());

                        $(".btnaddcomments").click(function (e) {
                            //alert("test");

                            detailsWindow.data("kendoWindow").open();
                            detailsWindow.data("kendoWindow").center();
                            $("#btncommentsupdate").kendoButton();
                            
                        });
                    },
                    columns: [
                        { field: "Comments", title: "Comments", width: "100px", headerTemplate: "<button Comments class='btnaddcomments'>Add Comments</button>" },

             { field: "updateby", title: "Updated By", width: "100px", },
             { field: "CommentCreated_date", title: "Date", width: "100px", template: "#= kendo.toString(kendo.parseDate(CommentCreated_date, 'yyyy-MM-dd'), 'MM/dd/yyyy') #" }

             
                    ]
                });
            },
            error: ServiceFailed// When Service call fails
        });
      

    }
    $('#btncommentsupdate').click(function () {

        var comments = $('#txtcomments').val();

        var updatedby = $('#txtUpdatedby').val();

        //    var tankid = $('#txtEventCalID').val();

        var EventCalendarID = $('#txtEventCalID').text();

       // alert(EventCalendarID);
        var Url = serviceURLs["uploadinspectionhistory"];
        
        var Data = '{"EventCalendarID": "' + EventCalendarID + '","comment": "' + comments + '","updatedby":"' + updatedby + '"}';
        alert(Data);
        var ContentType = "application/json; charset=utf-8";

        $.ajax({
            type: 'POST',
            url: Url,
            data: Data,
            contentType: ContentType,
            dataType: 'json',
            processdata: true,
            success: function (msg) {
               
                alert("Error Coming");
              //  var resultObject = eval(msg.uploadinspectionhistoryResult);
                
                alert(msg.uploadinspectionhistoryResult);

            },
            error: ServiceFailed// When Service call fails
        });


    });
    //---------------------------------------------------------------------------------
    $(document).ready(function () {
        $("#panelbarEvents").kendoPanelBar({
            expandMode: "single"
        });
    });
    //---------------------------------------------------------------------------------
    function GetTodaysEventRemindersSucceeded(result) {
        var resultObject = eval(result.GetTodaysEventRemindersResult);
        if (resultObject != "") {
          //  alert(resultObject.length);
            var kendoWindow = $("#dialogEventReminders").data("kendoDialog");

            var remindercontent = "";
            if (resultObject.length > 1)
                remindercontent = "You have "+resultObject.length+" reminders for following events.<br><br><ul>";
            else
                remindercontent = "You have a reminder for following event.<br><br><ul>";

            for (i = 0; i < resultObject.length; i++)
            remindercontent = remindercontent + "<li>" + resultObject[i].event_name;
            kendoWindow.content(remindercontent);
            dialogERs.data("kendoDialog").open();
        }
          
      
    }
    //---------------------------------------------------------------------------------
    function GetEventRemindersSucceeded(result) {
        var resultObject = eval(result.GetEventRemindersResult);
        $("#divEventReminders").kendoGrid({
            dataSource: {
                data: resultObject,
                pageSize: 5
            },
            scrollable: true,
            pageable: {
                refresh: true,
                pageSizes: true,
                buttonCount: 3
            },
            sortable: true,

            columns: [
                { field: "event_name", title: "Event Name" },
               { field: "notification_date", title: "Reminder Date", template: "#= kendo.toString(kendo.parseDate(notification_date, 'yyyy-MM-dd'), 'MM/dd/yyyy') #" }
                ]

        });
    }
    //---------------------------------------------------------------------------------
    function GetEventsSucceeded(result) {
        var date, upcomingEvents = [], todaysEvents = [];
        var events = [, ];
        resultObject = eval(result.GetEventsResult);
        $.each(resultObject, function (i, item) {
            date = new Date(parseInt(item.Due_Date.substr(6)));
            events.push(+new Date(date.getFullYear(), date.getMonth(), date.getDate()));
            var eventdate = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
            upcomingEvents.push("<li>" + item.Event_name + " - " + item.Event_Unit + " - " + eventdate);
        });
        //Today's Events

        //if (todaysEvents.length == 0)
        //    $("#divTodayEvents").append("No events today");
        //else
        //    $("#divTodayEvents").append(todaysEvents.join(''));
        //Upcoming Events
     //   if (upcomingEvents.length == 0)
     //       $("#divUpcomingEvents").append("No upcoming events");
     //   else
      //      $("#divUpcomingEvents").append(upcomingEvents.join(''));


        $("#divUpcomingEvents").kendoGrid({
            dataSource: {
                data: resultObject,
                pageSize:5
            },          
            scrollable: true,
            pageable: {
                refresh: true,
                pageSizes: true,
                buttonCount: 3
            },
            sortable: true,
          
            columns: [
                { field: "Event_name", title: "Event Name" },
               { field: "Event_Unit", title: "Unit", width: "110px" },
                { field: "Due_Date", title: "Due Date",width: "120px", template: "#= kendo.toString(kendo.parseDate(Due_Date, 'yyyy-MM-dd'), 'MM/dd/yyyy') #" }]

        });

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
     //   $("#divTodayEvents").empty();
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

        Url = serviceURLs["GetEventReminders"];
        $.ajax({
            type: 'POST',
            url: Url,
            // data: Data,
            contentType: ContentType,
            dataType: 'json',
            processdata: true,
            success: function (msg) {
                GetEventRemindersSucceeded(msg);
            },
            error: ServiceFailed// When Service call fails
        });

    }

});