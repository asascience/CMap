$(document).ready(function () {






    var serviceURLs = window.serviceURLs;



    function ServiceFailed(result) {
        alert('Service call failed: ' + result.status + '' + result.statusText);
        Type = null; Url = null; Data = null; ContentType = null; DataType = null; ProcessData = null;
    }
    function reportMenu(node) {
        alert('Node id ' + node.id);
        // build your menu depending on node id
        return {
            createItem: {
                "label": "Create New Branch",
                "action": function (obj) { this.create(obj); alert(obj.text()) },
                "_class": "class"
            },
            renameItem: {
                "label": "Rename Branch",
                "action": function (obj) { this.rename(obj); }
            },
            deleteItem: {
                "label": "Remove Branch",
                "action": function (obj) { this.remove(obj); }
            }
        };
    }


    var winW = $(window).width();

    var winheight = $(window).height();

    // $('#divDashBoard').css('width', winW - 360);

    // $('#divDashBoard').css('left', winW / 2 - $('#divDashBoard').width() / 2 - 20);


    

    // $('#divFC1').css('width', winW);

    $('#chartContainer').css('width', winW - 600);


    $('.ui-rangeSlider-container').css('width', winW - 600)
    var PI = $("#divps");
    var PI1 = $("#divps1");

    //---------------------------------------------------------------------------------
    PI.kendoWindow({
        position: {
            top: 100, // or "100px"
            left: winW / 2 - $('#divDashBoard').width() / 2 + 40
        },
        width: winW - 500,
        height: 550,
        title: "",
        visible: false,
        actions: [
            "Close"
        ],

    });
    //---------------------------------------------------------------------------------
//    PI1.kendoWindow({
//        position: {
//            top: 100, // or "100px"
//            left: winW / 2 - $('#divDashBoard').width() / 2 + 40
//        },
//        width: winW - 500,
//        height: 500,
//        title: "Annual volume displaced - 12 month rolling average",
//        visible: false,
//        actions: [
//            "Close"
//        ],

//    });
    //---------------------------------------------------------------------------------

    //---------------------------------------------------------------------------------



    //---------------------------------------------------------------------------------          


    function loadchartdata() {
        var dps = [
            { x: 2010, y: 1000000 },

             { x: 2011, y: 2000000 },

              { x: 2012, y: 4000000 },

               { x: 2013, y: 5000000 },

                { x: 2014, y: 8000000 },

                 { x: 2015, y: 9000000 },

                  { x: 2016, y: 10000000 },



        ]; // dataPoints

        var p = 0;
        var dps = [
                    { x: new Date(2007, 0, 3), y: 1000000 },
                    { x: new Date(2008, 0, 5), y: 3000000 },
                    { x: new Date(2009, 0, 7), y: 5000000 },
                    { x: new Date(2010, 0, 9), y: 7000000 },
                    { x: new Date(2011, 0, 11), y: 9000000 },
                    { x: new Date(2012, 0, 13), y: 10000000 },
                    { x: new Date(2013, 0, 15), y: 4000000 },
                    { x: new Date(2014, 0, 17), y: 3000000 },
                    { x: new Date(2015, 0, 19), y: 2000000 },
                    { x: new Date(2016, 0, 21), y: 1000000 },
                    { x: new Date(2017, 0, 23), y: 5000000 }
        ];

        var chart = new CanvasJS.Chart("chartContainer", {
            title: {
                text: ""
            },
            width: 800,
            data: [{
                type: "line",
                dataPoints: dps
            }]
        });
        chart.render();


        var xVal = dps[p].x;
        var yVal = dps[p].y;
        var updateInterval = 1000;

        var updateChart = function () {


            yVal = dps[p].y;
            xVal = dps[p].x;
            dps.push({ x: xVal, y: yVal, });

         //   console.log(dps);

            p++;
            if (dps.length > 10) {
                p = 0;
            }
            chart.render();

            // update chart after specified time. 

        };
        setInterval(function () { updateChart() }, updateInterval);


    }
  

    //---------------------------------------------------------------------------------
    function getScreenWidth() {
        var height = window.innerHeight;
        var myHeight;
        if (typeof (window.innerWidth) == 'number') {
            //Non-IE
            myWidth = window.innerWidth;
        }
        else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
            //IE 6+ in 'standards compliant mode'
            myWidth = document.documentElement.clientWidth;
        }
        else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
            //IE 4 compatible
            myWidth = document.body.clientWidth;
        }
        height = myWidth;
        return height;

    }


    //---------------------------------------------------------------------------------
    $("#btnpi").click(function () {

        PI.data("kendoWindow").open();

        loadchartdata();
    });
  
    //---------------------------------------------------------------------------------
    $("#btnFC").click(function () {

        $('#divFC').css("display", "block");
        LoadAllFiles();
    });
    //---------------------------------------------------------------------------------
    $("#btnWeather").click(function () {

        $('#divWeather').css("display", "block");

    });
    //---------------------------------------------------------------------------------
    $("#btnSO").click(function () {

        $('#divSelectObjects').css("display", "block");

    });

    //---------------------------------------------------------------------------------

    $("#btntct").click(function () {

        //alert("btntctclick");
        var loginname = "tctadmin";
        var url = "http://tct.reservoirkb.com/TankData.aspx?name=" + loginname;
        //alert(url);
        //window.location.href = url;
        window.open(url, "_newtab");
    });








    function toDate(value) {


        var dateRegExp = /^\/Date\((.*?)\)\/$/;
        var date = dateRegExp.exec(value);
        return new Date(parseInt(date[1]));
    }


    function showTabSelection(obj) {
        $('#thair').removeClass('tabSelected').addClass('tabNotSelected');
        $('#thwaste').removeClass('tabSelected').addClass('tabNotSelected');
        $('#thwater').removeClass('tabSelected').addClass('tabNotSelected');
        $('#thother').removeClass('tabSelected').addClass('tabNotSelected');
        obj.addClass('tabSelected');
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////



});
