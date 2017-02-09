$(document).ready(function () {
    var serviceURLslocal = { fileslist: "http://tct.reservoirkb.com/CMapSVCtest/Service1.svc/GetFilesList", inspectionslist: "http://tct.reservoirkb.com/CMapSVCtest/Service1.svc/GetInspectionsList", inspectionshistory: "http://tct.reservoirkb.com/CMapSVCtest/Service1.svc/GetInspectionsHistory", uploadinspectionhistory: "http://tct.reservoirkb.com/CMapSVCtest/Service1.svc/uploadinspectionhistory", uploadcustomfile: "http://tct.reservoirkb.com/CMapSVCtest/Service1.svc/UploadCustomFile", fixuploadfile: "http://tct.reservoirkb.com/CMapSVCtest/Service1.svc/FixUploadedFile" };


	
	   var serviceURLsProd = { fileslist: "http://tct.reservoirkb.com/CMapSvc/Service1.svc/GetFilesList", inspectionslist: "http://tct.reservoirkb.com/CMapSvc/Service1.svc/GetInspectionsList", inspectionshistory: "http://tct.reservoirkb.com/CMapSvc/Service1.svc/GetInspectionsHistory", uploadinspectionhistory: "http://tct.reservoirkb.com/CMapSvc/Service1.svc/uploadinspectionhistory", uploadcustomfile: "http://tct.reservoirkb.com/CMapSvc/Service1.svc/UploadCustomFile", fixuploadfile: "http://tct.reservoirkb.com/CMapSvc/Service1.svc/FixUploadedFile" };
 //var serviceURLs = serviceURLslocal;
	var serviceURLs = serviceURLsProd;
    
	$("#dateRulers").dateRangeSlider({

	    bounds: { min: new Date(2014, 0, 1), max: new Date(2016, 11, 1) },
	    defaultValues: { min: new Date(2014, 0, 1), max: new Date(2014, 2, 1) }

	});

	//var chartRef = FusionCharts('fuelMeter-4');
	//chartRef.dispose();
	$("#dateRulers").bind("valuesChanged", function (e, data) {

	    var chartRef = FusionCharts('cs-cylinder-gauge-3');
	    if(chartRef != undefined)
	    {
	        chartRef.dispose();
	    }
	   

	    document.getElementById("toggleBtn").style.display = "none";

	    var mindate = (data.values.min);

	    var maxdate = (data.values.max);

             
             
	    console.log("Values just changed. min: " + (data.values.min).toLocaleDateString("en-US") + " max: " + (data.values.max).toLocaleDateString("en-US"));

	    //var variableToSend = 'foo';
	    //$.post('datastream.php', { variable: variableToSend });

	    // document.cookie = 'name=Khez';
	    mindate = moment(mindate).format('YYYY/MM/DD');

	    maxdate = moment(maxdate).format('YYYY/MM/DD');

	    var url = window.location.href;
	    var params = url.split('?min=' + mindate + '');


	    //FusionCharts.ready(function () {
	    //    var fusioncharts = new FusionCharts({
	    //        type: 'cylinder',
	    //        renderAt: 'chart-container',
	    //        id: 'cs-cylinder-gauge-4',
	    //        width: '500',
	    //        height: '500',
	    //        dataFormat: 'json',
	    //        dataSource: {
	    //            "chart": {
	    //                "theme": "fint",
	    //                "caption": "Diesel Level in Generator",
	    //                "subcaption": "Bakersfield Central",
	    //                "lowerLimit": "0",
	    //                "upperLimit": "1000000",
	    //                "dataStreamUrl": "http://localhost/CMap/datastream2.php?mindate="+mindate+"&maxdate="+maxdate+"",

	    //                "lowerLimitDisplay": "Empty",
	    //                "upperLimitDisplay": "Full",
	    //                "numberSuffix": " Gallons",
	    //                "showValue": "1",
	    //                "chartBottomMargin": "45",
	    //                "refreshInterval": "2",
	    //            },
	    //            "value": "110"

	    //        },
	    //        events: {
	    //            "beforeRender": function (evt, args) {
	    //                // creating div for controllers
	    //                var controllers = document.createElement('div'),
	    //                    isStopped = false,
	    //                    gaugeRef = evt.sender;
	    //                controllers.setAttribute('id', 'controllers');

	    //                // Create checkbox inside div
	    //                controllers.innerHTML = '<input type="button" value="Stop Update" id="toggleBtn" style="margin-left:1px;margin-top:1px;font-size:13px;padding:2px;" />';
	    //                args.container.parentNode.insertBefore(controllers, args.container.nextSibling);

	    //                // setting css styles for controllers div
	    //                controllers.style.cssText = "text-align: center;";
	    //                var btn = document.getElementById('toggleBtn'),
	    //                    startStopUpdate = function () {
	    //                        if (!isStopped) {
	    //                            isStopped = true
	    //                            btn.value = "Restart Update";
	    //                            gaugeRef.stopUpdate();
	    //                        } else {
	    //                            isStopped = false;
	    //                            btn.value = "Stop Update";
	    //                            gaugeRef.restartUpdate();
	    //                        }
	    //                    }

	    //                btn.addEventListener && btn.addEventListener("click", startStopUpdate);

	    //            }
	    //        }
	    //    }
	    //);
	    //    fusioncharts.render();

	    //});



	    //FusionCharts.ready(function () {
	    //    var fusioncharts = new FusionCharts({
	    //        type: 'angulargauge',
	    //        renderAt: 'speedometer',
	    //        id: 'cs-angular-gauge',
	    //        width: '400',
	    //        height: '300',
	    //        dataFormat: 'json',
	    //        dataSource: {
	    //            "chart": {
	    //                "caption": "Diesel Level in Generator",
	    //                "subcaption": "Bakersfield Central",
	    //                "lowerLimit": "0",
	    //                "upperLimit": "1000000",
	    //                "numberSuffix": "",
	    //                 "dataStreamUrl": "http://localhost/CMap/datastream2.php?mindate="+mindate+"&maxdate="+maxdate+"",
	    //                "refreshInterval": "3",
	    //                "theme": "fint"
	    //            },
	    //            "colorRange": {
	    //                "color": [{
	    //                    "minValue": "0",
	    //                    "maxValue": "500000",
	    //                    "code": "#008000"
	    //                }, {
	    //                    "minValue": "500000",
	    //                    "maxValue": "800000",
	    //                    "code": "#FFFF00"
	    //                }, {
	    //                    "minValue": " 800000",
	    //                    "maxValue": "1000000",
	    //                    "code": "#FF0000"
	    //                }]
	    //            },
	    //            "dials": {
	    //                "dial": [{
	    //                    "id": "crntYr",
	    //                    "value": "78",
	    //                    "showValue": "1",
	    //                    "tooltext": "Current Year Production : $value",
	    //                    "rearExtension": "5"
	    //                }]
	    //            }
	    //        }
	    //    }
	    //);
	    //    fusioncharts.render();
	    //});
                                      
              
	    //alert(mindate);

	    //alert(maxdate);

             
	    $.ajax({
	        type: "POST",
	        url: "datastream.php",
	        data: { mindate: mindate,maxdate:maxdate },
	        success: function (result) {
	            console.log(result);

	            var entryArray = result.split(",");

                        

	            //console.log(entryArray);
	            //
	            var obj = [];

	            for (i = 0; i < entryArray.length; i++) {
                         
                          
	                mindate = moment(mindate).add(12, 'hours');
                         

	                var stringentry = entryArray[i].toString();

	                stringentry = stringentry.replace("[", "");

	                stringentry = stringentry.replace("]", "");
	                tmp = {
	                    "year":moment(mindate).format('MM/DD/YYYY'),
	                    "value": stringentry

	                };

	                obj.push(tmp);
                         
                         
	            }
                     
                    
	            //console.log(json[0].value);

	            json = (obj);

	            console.log(json);
	            FusionCharts.ready(function () {


	                var fusioncharts = new FusionCharts({
	                    type: 'cylinder',
	                    dataFormat: 'json',
	                    id: 'fusionrechart',
	                    renderAt: 'chart-container',
	                    width: '500',
	                    height: '500',
	                    dataSource: {
	                        "chart": {
	                            "theme": "fint",
	                            "caption": "",
	                            "subcaption": "",
	                            "lowerLimit": "0",
	                            "upperLimit": "1000000",
	                            "lowerLimitDisplay": "Empty",
	                            "upperLimitDisplay": "Full",
	                            "numberSuffix": " Gallons",
	                            "showValue": "0",
	                            "chartBottomMargin": "180",
	                            "chartLeftMargin": "100"
	                        },
	                        "value": "110",

	                        "annotations": {
	                            "origw": "400",
	                            "origh": "190",
	                            "autoscale": "1",
	                            "groups": [{
	                                "id": "range",
	                                "items": [{
	                                    "id": "rangeBg",
	                                    "type": "rectangle",
	                                    "x": "$canvasCenterX-125",
	                                    "y": "$chartEndY-50",
	                                    "tox": "$canvasCenterX +145",
	                                    "toy": "$chartEndY-95",
	                                    "fillcolor": "#FFFFFF"
	                                }, {
	                                    "id": "rangeText",
	                                    "type": "Text",
	                                    "align": "center",
	                                    "fontSize": "15",
	                                    "fillcolor": "#FFFFFF",
	                                    "text": "Volume : 110 Gallons",
	                                    "x": "$chartCenterX",
	                                    "y": "$chartEndY-70"
	                                }]
	                            }]
	                        }
	                    },
	                    "events": {
	                        "rendered": function (evtObj, argObj) {
	                            var gaugeRef = evtObj.sender,
                                    fuelVolume = 0;

	                            //  var btn = document.getElementById('toggleBtn'),
	                            //startStopUpdate = function () {
	                            //    if (!isStopped) {
	                            //        isStopped = true
	                            //        btn.value = "Restart Update";
	                            //        gaugeRef.stopUpdate();
	                            //    } else {
	                            //        isStopped = false;
	                            //        btn.value = "Stop Update";
	                            //        gaugeRef.restartUpdate();
	                            //    }
	                            //}

	                            //  btn.addEventListener && btn.addEventListener("click", startStopUpdate);

	                            var i = 0;
	                            gaugeRef.chartInterval = setInterval(function () {
	                                //console.log(i);

	                                if (i == json.length) {
	                                    i = 0;
	                                } else {



	                                    var x = parseInt(json[i].value.toString());

	                                    //   gaugeRef.setChartAttribute('cylFillColor', '#008000');
	                                    var btn = document.getElementById('toggleBtn');
	                                    if (btn.value!= "Stop Update")
	                                    {

	                                    } else
	                                    {
	                                        gaugeRef.feedData("&value=" + x);

	                                        year = json[i].year
	                                    }
	                                    i++;
	                                }


	                            }, 1000);
	                        },
	                        "beforeRender": function (evt, args) {
	                            // creating div for controllers
	                            var controllers = document.createElement('div'),
                                    isStopped = false,
                                    gaugeRef = evt.sender;
	                            controllers.setAttribute('id', 'controllers');

	                            // Create checkbox inside div
	                            controllers.innerHTML = '<input type="button" value="Stop Update" id="toggleBtn" style="margin-left:1px;margin-top:1px;font-size:13px;padding:2px;" />';
	                            args.container.parentNode.insertBefore(controllers, args.container.nextSibling);

	                            // setting css styles for controllers div
	                            controllers.style.cssText = "text-align: center;";
	                            var btn = document.getElementById('toggleBtn'),
                                    startStopUpdate = function () {
                                        if (!isStopped) {
                                            isStopped = true
                                            btn.value = "Restart Update";
                                            gaugeRef.stopUpdate();
                                        } else {
                                            isStopped = false;
                                            btn.value = "Stop Update";
                                            gaugeRef.restartUpdate();
                                        }
                                    }

	                            btn.addEventListener && btn.addEventListener("click", startStopUpdate);

	                        },
	                        //Using real time update event to update the annotation
	                        //showing available volume of Diesel
	                        "realTimeUpdateComplete": function (evt, arg) {
	                            var gaugeRef = evt.sender;


	                            var annotations = evt.sender.annotations,
                                    dataVal = evt.sender.getData();

	                            var forecolorval = "#FFFFFF";
	                            //alert(dataVal);

	                            // colorVal = (dataVal >= 500000) ? "#6caa03" : ((dataVal <= 500000) ? "#008000" : "#f8bd1b");
	                            // console.log(dataVal);
	                            if (dataVal <= 500000) {
	                                colorVal = "#008000";
	                                forecolorval = "#FFFFFF";

	                            }

	                            if (dataVal > 500000 && dataVal <= 800000) {
	                                colorVal = "#FFFF00";
	                                forecolorval = "#000000";
	                            }

	                            if (dataVal >= 800000) {
	                                colorVal = "#FF0000";
	                                forecolorval = "#FFFFFF";
	                            }

	                            //Updating value
	                            annotations && annotations.update('rangeText', {

	                                "text": " Volume: " + dataVal + " Gallons @ " + year,
	                                "fillcolor": forecolorval


	                            });
	                            //Changing background color as per value
	                            annotations && annotations.update('rangeBg', {
	                                "fillcolor": colorVal
	                            });



	                        },
	                        "disposed": function (evt, arg) {
	                            clearInterval(evt.sender.chartInterval);
	                        }
	                    }
	                }
                );
	                fusioncharts.render();
	            });


	            //
	            var fusioncharts = new FusionCharts({
	                type: 'angulargauge',
	                renderAt: 'speedometer',
	                width: '400',
	                height: '300',
	                dataFormat: 'json',
	                dataSource: {
	                    "chart": {
	                        "caption": "Server CPU Utilization",
	                        "subcaption": "forum.hsm.com",
	                        "lowerLimit": "0",
	                        "upperLimit": "1000000",
	                        "editMode": "1",
	                        "showValue": "1",
	                        "valueBelowPivot": "1",
	                        "tickValueDistance": "25",
	                        "gaugeFillMix": "{dark-30},{light-60},{dark-10}",
	                        "gaugeFillRatio": "15",
	                        "theme": "fint",
	                        "valueFontSize": "14"
	                    },
	                    "colorRange": {
	                        "color": [{
	                            "minValue": "0",
	                            "maxValue": "500000",
	                            "code": "#008000"
	                        }, {
	                            "minValue": "500000",
	                            "maxValue": "800000",
	                            "code": "#FFFF00"
	                        }, {
	                            "minValue": " 800000",
	                            "maxValue": "1000000",
	                            "code": "#FF0000"
	                        }]
	                    },
	                    "dials": {
	                        "dial": [{
	                            "id": "crntYr",
	                            "value": "78",
	                            "showValue": "1",
	                            "tooltext": "Current year's average : $value",
	                            "rearExtension": "5"
	                        }]
	                    }
	                },
	                events: {
	                    'beforeRender': function (evt, args) {
	                        //var score = document.createElement('div');
	                        //score.setAttribute('id', 'score-detail');
	                        //score.innerHTML = 'Current server CPU Utilization is: <b>78</b>';
	                        //score.style.cssText = "font-family:'Helvetica Neue', Arial; font-size: 14px; padding:10px 0 10px 20px;";
	                        //args.container.parentNode.insertBefore(score, args.container.nextSibling);
	                    },
	                    "rendered": function (evtObj, argObj) {
	                        evtObj.sender.intervalVar = setInterval(function () {
                                        

	                            //chartIns.feedData("value=" + prcnt);


	                            if (i == json.length) {
	                                i = 0;
	                            } else {



	                                var chartIns = evtObj.sender,
                                     prcnt = parseInt(json[i].value.toString());
	                                //   gaugeRef.setChartAttribute('cylFillColor', '#008000');
	                                var btn = document.getElementById('toggleBtn');
	                                if (btn.value != "Stop Update") {

	                                } else {
	                                    chartIns.feedData("value=" + prcnt);
	                                }
                                           
	                                i++;
	                            }

	                        }, 1000);
	                    },
                               
	                    "disposed": function (evtObj, argObj) {
	                        clearInterval(evtObj.sender.intervalVar);
	                    }
	                }
	            }
);
	            fusioncharts.render();
	            //

	        }
	    });


	});


  
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

    
  //For Local Server
	//var serviceURLs=serviceURLsProd;// For Production Server
	
	//var screenwidth = getScreenWidth();
	
    //document.getElementById('divDashBoard').style.left = (screenwidth/2) - 300 + "px";
	var winW = $(window).width();

	var winheight = $(window).height();

	$('#divDashBoard').css('width', winW - 360);

	$('#divDashBoard').css('left', winW / 2 - $('#divDashBoard').width() / 2 - 20);

	$('#divFC1').css('width', winW - 600);

	$('#chartContainer').css('width', winW - 600);
	//$('#divFC').css('left', winW / 2 - $('#divDashBoard').width() / 2 - 20);
	
	$('.ui-rangeSlider-container').css('width', winW - 600)
	  var PI = $("#divps");
	  var PI1 = $("#divps1");
	  var ETInspectWindow = $("#divETInspections");
	  var ETCalendarWindow=$("#divETCalendar") ;
	  var detailsWindow = $("#details");
	  //---------------------------------------------------------------------------------
	ETCalendarWindow.kendoWindow({
	    position: {
			top: 100, // or "100px"
			left: winW / 2 - $('#divDashBoard').width() / 2 +40
		  },
        width:winW-500,
	    height:700,
        title: "Event Tickler - Calendar",
        visible: false,
        actions: [                           
             "Close"
         ]
                       
          });
	//---------------------------------------------------------------------------------
	ETInspectWindow.kendoWindow({
	    position: {
			top: 100, // or "100px"
			left: winW / 2 - $('#divDashBoard').width() / 2 +40
		  },
        width:winW-500,
	    height:700,
        title: "Event Tickler - Inspections",
        visible: false,
        actions: [                           
             "Close"
         ]
                       
          });

//---------------------------------------------------------------------------------
PI.kendoWindow({
	    position: {
    top: 100, // or "100px"
    left: winW / 2 - $('#divDashBoard').width() / 2 +40
  },
                        width:winW-500,
						height:500,
                        title: "",
                        visible: false,
                        actions: [                           
                            "Close"
                        ],
                       
                    });
//---------------------------------------------------------------------------------
PI1.kendoWindow({
	    position: {
    top: 100, // or "100px"
    left: winW /2 - $('#divDashBoard').width() / 2 +40
  },
                        width:winW-500,
						height:500,
                        title: "Annual volume displaced - 12 month rolling average",
                        visible: false,
                        actions: [                           
                            "Close"
                        ],
                       
                    });
    //---------------------------------------------------------------------------------

detailsWindow.kendoWindow({
    position: {
        top: 250, // or "100px"
        left: winW / 8 - $('#details').width() / 2 -10
    },
    width: winW - 500,
    height: 300,
    title: "Comments Details",
    visible: false,
    actions: [
        "Close"
    ],

});
    //---------------------------------------------------------------------------------


 
//---------------------------------------------------------------------------------          

 
function loadchartdata()
{
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
		width:800,
        data: [{
            type: "line",
            dataPoints:dps
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

        console.log(dps);

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
function loadchartdataps1() {
    var json = [
 { "year": 2007, "value": 100000 },
 { "year": 2008, "value": 200000 },
 { "year": 2009, "value": 300000 },
  { "year": 2010, "value": 400000 },
  { "year": 2011, "value": 450000 },
   { "year": 2012, "value": 500000 },
    { "year": 2013, "value": 600000 },
     { "year": 2014, "value": 700000 },
       { "year": 2015, "value": 800000 },
       { "year": 2016, "value": 900000 },

    ];
    var year=0;
    FusionCharts.ready(function () {
        if (FusionCharts('fuelMeter-4')) FusionCharts('fuelMeter-4').dispose();

        var fusioncharts = new FusionCharts({
            type: 'cylinder',
            dataFormat: 'json',
            id: 'fuelMeter-4',
            renderAt: 'ps1',
            width: '500',
            height: '500',
            dataSource: {
                "chart": {
                    "theme": "fint",
                    "caption": "Diesel Level in Generator",
                    "subcaption": "Bakersfield Central",
                    "lowerLimit": "0",
                    "upperLimit": "1000000",
                    "dataStreamUrl": "http://localhost/CMap/datastream.php",

                    "lowerLimitDisplay": "Empty",
                    "upperLimitDisplay": "Full",
                    "numberSuffix": " Gallons",
                    "showValue": "1",
                    "chartBottomMargin": "45",
                    "refreshInterval": "2",
                },
                "value": "110"

            },
            events: {
                "beforeRender": function (evt, args) {
                    // creating div for controllers
                    var controllers = document.createElement('div'),
                        isStopped = false,
                        gaugeRef = evt.sender;
                    controllers.setAttribute('id', 'controllers');

                    // Create checkbox inside div
                    controllers.innerHTML = '<input type="button" value="Stop Update" id="toggleBtn" style="margin-left:1px;margin-top:1px;font-size:13px;padding:2px;" />';
                    args.container.parentNode.insertBefore(controllers, args.container.nextSibling);

                    // setting css styles for controllers div
                    controllers.style.cssText = "text-align: center;";
                    var btn = document.getElementById('toggleBtn'),
                        startStopUpdate = function () {
                         
                            if (!isStopped) {
                                isStopped = true
                                btn.value = "Restart Update";
                                gaugeRef.stopUpdate();
                            } else {
                                isStopped = false;
                                btn.value = "Stop Update";
                                gaugeRef.restartUpdate();
                            }
                        }

                    btn.addEventListener && btn.addEventListener("click", startStopUpdate);

                }
            }
        }
        );
        fusioncharts.render();

    });


    var mindate = ('2014/01/01');

    var maxdate = ('2014/02/29');

    //

    $.ajax({
        type: "POST",
        url: "datastream.php",
        data: { mindate: mindate, maxdate: maxdate },
        success: function (result) {
            console.log(result);

            var entryArray = result.split(",");



            //console.log(entryArray);
            //
            var obj = [];

            for (i = 0; i < entryArray.length; i++) {


                mindate = moment(mindate).add(12, 'hours');


                var stringentry = entryArray[i].toString();

                stringentry = stringentry.replace("[", "");

                stringentry = stringentry.replace("]", "");
                tmp = {
                    "year": moment(mindate).format('MM/DD/YYYY'),
                    "value": stringentry

                };

                obj.push(tmp);


            }


            //console.log(json[0].value);

            json = (obj);

            console.log(json);
                  

            //
            var fusioncharts = new FusionCharts({
                type: 'angulargauge',
                renderAt: 'speedometer',
                width: '400',
                height: '300',
                dataFormat: 'json',
                dataSource: {
                    "chart": {
                        "caption": "Server CPU Utilization",
                        "subcaption": "forum.hsm.com",
                        "lowerLimit": "0",
                        "upperLimit": "1000000",
                        "editMode": "1",
                        "showValue": "1",
                        "valueBelowPivot": "1",
                        "tickValueDistance": "25",
                        "gaugeFillMix": "{dark-30},{light-60},{dark-10}",
                        "gaugeFillRatio": "15",
                        "theme": "fint",
                        "valueFontSize": "14"
                    },
                    "colorRange": {
                        "color": [{
                            "minValue": "0",
                            "maxValue": "500000",
                            "code": "#008000"
                        }, {
                            "minValue": "500000",
                            "maxValue": "800000",
                            "code": "#FFFF00"
                        }, {
                            "minValue": " 800000",
                            "maxValue": "1000000",
                            "code": "#FF0000"
                        }]
                    },
                    "dials": {
                        "dial": [{
                            "id": "crntYr",
                            "value": "78",
                            "showValue": "1",
                            "tooltext": "Current year's average : $value",
                            "rearExtension": "5"
                        }]
                    }
                },
                events: {
                    'beforeRender': function (evt, args) {
                        //var score = document.createElement('div');
                        //score.setAttribute('id', 'score-detail');
                        //score.innerHTML = 'Current server CPU Utilization is: <b>78</b>';
                        //score.style.cssText = "font-family:'Helvetica Neue', Arial; font-size: 14px; padding:10px 0 10px 20px;";
                        //args.container.parentNode.insertBefore(score, args.container.nextSibling);
                    },
                    "rendered": function (evtObj, argObj) {
                        evtObj.sender.intervalVar = setInterval(function () {


                            //chartIns.feedData("value=" + prcnt);


                            if (i == json.length) {
                                i = 0;
                            } else {



                                var chartIns = evtObj.sender,
                                 prcnt = parseInt(json[i].value.toString());
                                //   gaugeRef.setChartAttribute('cylFillColor', '#008000');
                                var btn = document.getElementById('toggleBtn');
                                if (btn.value != "Stop Update") {

                                } else {
                                    chartIns.feedData("value=" + prcnt);
                                }

                                i++;
                            }

                        }, 1000);
                    },

                    "disposed": function (evtObj, argObj) {
                        clearInterval(evtObj.sender.intervalVar);
                    }
                }
            }
);
            fusioncharts.render();


        }
    });
    //

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

//---------------------------------------------------------------------------------
$("#btnpi").click(function () {
  
    PI.data("kendoWindow").open();
   
    loadchartdata();
});
//---------------------------------------------------------------------------------
$("#btnpis").click(function () {
   
    PI1.data("kendoWindow").open();
	
    loadchartdataps1();
});
//---------------------------------------------------------------------------------
    $("#btnFC").click(function(){
	
        $('#divFC').css("display", "block");
		LoadAllFiles();
    });
//---------------------------------------------------------------------------------
	$("#btnWeather").click(function(){
	
        $('#divWeather').css("display", "block");
		
    });
//---------------------------------------------------------------------------------
	$("#btnSO").click(function(){
	
        $('#divSelectObjects').css("display", "block");
		
    });
	

          
			///////////////////////////////////////////////////////////////////////////////
			 function onChange() {
                    alert("hello");
                    //kendoConsole.log("Change :: " + kendo.toString(this.value(), 'd'));
                }
			 $('#btnETCalendar').click(function () {
				 var today = new Date();
				 var    events = [
                           +new Date(today.getFullYear(), today.getMonth(), 8),
                           +new Date(today.getFullYear(), today.getMonth(), 12),
                           +new Date(today.getFullYear(), today.getMonth(), 24),
                           +new Date(today.getFullYear(), today.getMonth() + 1, 6),
                           +new Date(today.getFullYear(), today.getMonth() + 1, 7),
                           +new Date(today.getFullYear(), today.getMonth() + 1, 25),
                           +new Date(today.getFullYear(), today.getMonth() + 1, 27),
                           +new Date(today.getFullYear(), today.getMonth() - 1, 3),
                           +new Date(today.getFullYear(), today.getMonth() - 1, 5),
                           +new Date(today.getFullYear(), today.getMonth() - 2, 22),
                           +new Date(today.getFullYear(), today.getMonth() - 2, 27)
                        ];
				  $("#calendar").kendoCalendar({
                        value: today,
                      change:onChange,
                        dates: events,
                        weekNumber: false,
                        month: {
                            // template for dates in month view
                            content: '# if ($.inArray(+data.date, data.dates) != -1) { #' +
                                        '<div class="' +
                                           '# if (data.value < 10) { #' +
                                               "exhibition" +
                                           '# } else if ( data.value < 20 ) { #' +
                                               "party" +
                                           '# } else { #' +
                                               "cocktail" +
                                           '# } #' +
                                        '">#= data.value+"<br>Hello" #</div>' +
                                     '# } else { #' +
                                     '#= data.value #' +
                                     '# } #'
                            
                        },
                        footer: false
                    });
				 ETCalendarWindow.data("kendoWindow").open();
			 });
            $('#btnETInspections').click(function () {
                ETInspectWindow.data("kendoWindow").open();
                var uesrid = "2"; var Type = "POST";              
                var Url = serviceURLs["inspectionslist"];;
                var Data = '{"Id": "' + uesrid + '"}';
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

            function toDate(value) {


                var dateRegExp = /^\/Date\((.*?)\)\/$/;
                var date = dateRegExp.exec(value);
                return new Date(parseInt(date[1]));
            }
    
            function GetinspectionsListSucceeded(result) {

                
                resultObject = eval(result.GetInspectionsListResult);

                console.log(resultObject);
                $("#datagridinspections").kendoGrid({

                    dataSource: {
                        data: resultObject

                    },
                    dataBound: function() {
                        this.expandRow(this.tbody.find("tr.k-master-row"));
                    },
                    detailInit: detailInit,
                    dataBound: function () {
                        // this.expandRow(this.tbody.find("tr.k-master-row").first());

                        $('td').each(function () { if ($(this).text() == 'Pedning') { $(this).addClass('orange') } });
                        $('td').each(function () { if ($(this).text() == 'Completed') { $(this).addClass('green') } });
                        $('td').each(function () { if ($(this).text() == 'In-Progress') { $(this).addClass('orange') } });
                    },

                    columns: [{ field: "TankID", title: "Tank ID", width: "80px" },
            { field: "Inspection_name", title: "Inspection Name", width: "120px" },
           
            { field: "Created_date", title: "Created Date", width: "90px", template: "#= kendo.toString(kendo.parseDate(Created_date, 'yyyy-MM-dd'), 'MM/dd/yyyy') #" },
            { field: "Status", title: "Status", width: "100px" },
           
             { field: "due_date", title: "Due Date", width: "90px", template: "#= kendo.toString(kendo.parseDate(due_date, 'yyyy-MM-dd'), 'MM/dd/yyyy') #" },]
             //{ field: "completed_date", title: "Completed Date", width: "90px"}]
             
                });


              
               
            }
         

            function detailInit(e) {

                var uesrid = "2"; var Type = "POST";
                var Url = serviceURLs["inspectionshistory"];;
                var Data = '{"Id": "' + e.data.TankID + '"}';
                var ContentType = "application/json; charset=utf-8";
                var DataType = "json";

                $("#txttankid").val(e.data.TankID);

                $.ajax({
                    type: Type,
                    url: Url,
                    data: Data,
                    contentType: ContentType,
                    dataType: DataType,
                    processdata: true,
                    success: function (msg) {
                        //GetinspectionsListSucceeded(msg);
                        //alert("success");

                       // console.log(msg);
                        resultObject = eval(msg.GetInspectionsHistoryResult);

                     //   console.log(msg.GetInspectionsHistory);
                        $("<div/>").appendTo(e.detailCell).kendoGrid({


                            dataSource: resultObject,
                            scrollable: false,
                            dataBound: function () {
                                // this.expandRow(this.tbody.find("tr.k-master-row").first());

                                $(".btnaddcomments").click(function (e) {
                                    //alert("test");

                                   detailsWindow.data("kendoWindow").open();
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
                $('#txttankid').val = e.data.TankID;
                console.log(e.data.TankID);
              
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
         
			function  showTabSelection(obj)
			{
				$('#thair').removeClass('tabSelected').addClass('tabNotSelected');
				$('#thwaste').removeClass('tabSelected').addClass('tabNotSelected');
				$('#thwater').removeClass('tabSelected').addClass('tabNotSelected');
				$('#thother').removeClass('tabSelected').addClass('tabNotSelected');
				 obj.addClass('tabSelected');
			}
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////


		
});          