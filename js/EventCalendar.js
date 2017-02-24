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
    var detailsWindow = $("#details");
    //---------------------------------------------------------------------------------

    ETInspectWindow.kendoWindow({
        position: {
            top: 100, // or "100px"
            left: winW / 2 - $('#divDashBoard').width() / 2 + 40
        },
        width: winW - 500,
        height: 700,
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
        content: "",
        actions: [
           
            { text: 'Ok', primary: true }
        ]
    });
    //---------------------------------------------------------------------------------
    $('#btnETInspections').click(function () {
        
        ETInspectWindow.data("kendoWindow").open();
        var EventType = "Inspection"; var Type = "POST";
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

    });

    function GetinspectionsListSucceeded(result) {

        var rowTemplateString =
            '<td>#: Status #</td>';
            
        resultObject = eval(result.GetEventsByTypeResult);

        // alert(resultObject);
        $("#datagridinspections").empty();
        $("#datagridinspections").kendoGrid({

            dataSource: {
                data: resultObject

            },
           // rowTemplate: rowTemplateString,
            filterable: true,
            sortable: true,
            dataBound: function () {
                this.expandRow(this.tbody.find("tr.k-master-row"));
            },
            detailInit: detailInit,
            dataBound: function () {
                // this.expandRow(this.tbody.find("tr.k-master-row").first());

                $('td').each(function () { if ($(this).text() == 'Pedning') { $(this).addClass('orange') } });
                $('td').each(function () { if ($(this).text() == 'Completed') { $(this).addClass('green') } });
                $('td').each(function () { if ($(this).text() == 'In-Progress') { $(this).addClass('orange') } });
            },

            columns: [{ field: "Calendar_ID", hidden: true },
                
    { field: "Event_name", title: "Name" },
    { field: "Event_Unit", title: "Unit", filterable: { multi: true, search: true, search: true } },

    { field: "Created_Date", title: "Created Date",filterable: { multi: true, search: true, search: true }, template: "#= kendo.toString(kendo.parseDate(Created_Date, 'yyyy-MM-dd'), 'MM/dd/yyyy') #" },
    { field: "Status", title: "Status",template:rowTemplateString, filterable: { multi: true, search: true, search: true } },

     { field: "Due_Date", title: "Due Date",filterable: { multi: true, search: true, search: true },  template: "#= kendo.toString(kendo.parseDate(Due_Date, 'yyyy-MM-dd'), 'MM/dd/yyyy') #" }, ]
            //{ field: "completed_date", title: "Completed Date", width: "90px"}]

        });




    }


    function detailInit(e) {

        var uesrid = "2"; var Type = "POST";
        var Url = serviceURLs["inspectionshistory"];
       // alert(e.data.Calendar_ID);
        var Data = '{"Id": "' + e.data.Calendar_ID + '"}';
        var ContentType = "application/json; charset=utf-8";
        var DataType = "json";

        $("#txttankid").html(e.data.Event_name);

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

        var tankid = $('#txttankid').val();




        var Url = serviceURLs["uploadinspectionhistory"];
        // var Data = '{"type": "' + resultObject + '","fn":"' + fn + '"}';
        var Data = '{"TankID": "' + tankid + '","comment": "' + comments + '","updatedby":"' + updatedby + '"}';
        //alert(Data);
        var ContentType = "application/json; charset=utf-8";

        $.ajax({
            type: 'POST',
            url: Url,
            data: Data,
            contentType: ContentType,
            dataType: 'json',
            processdata: true,
            success: function (msg) {
                // //GetFilesListSucceeded(msg);
                alert("success");
                // console.log(msg);
                //// alert(msg);

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
            var kendoWindow = $("#dialogEventReminders").data("kendoDialog");
            kendoWindow.content("You have reminder for following events. <br><ul><li> " + resultObject[0].event_name);
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

        if (todaysEvents.length == 0)
            $("#divTodayEvents").append("No events today");
        else
            $("#divTodayEvents").append(todaysEvents.join(''));
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