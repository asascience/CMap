$(document).ready(function () {
    var PI = $("#divps");
    var PI1 = $("#divps1");
    var winW = $(window).width();

    var winheight = $(window).height();

//---------------------------------------------------------------------------------
$("#btnpis").click(function () {

   

    PI1.dialog({
        open: function (event, ui) {
            PI1.closest("div[role='dialog']").css({ top: 100, height: 500, left: winW / 2 - $('#divDashBoard').width() / 2 + 10, width: 'auto' });

        }
    });

    //loadchartdataps1();
});

$("#dateRulers").dateRangeSlider({
   
    bounds: { min: new Date(2014, 0, 1), max: new Date(2016, 11, 1) },
    defaultValues: { min: new Date(2014, 0, 1), max: new Date(2014, 2, 1) }

});

//var chartRef = FusionCharts('fuelMeter-4');
//chartRef.dispose();
$("#dateRulers").bind("valuesChanged", function (e, data) {


});

var json = [
{ "year": "2014-01-01", "value": 100000 },
{ "year": "2014-01-02", "value": 200000 },
{ "year": "2014-01-03", "value": 300000 },
{ "year": "2014-01-04", "value": 400000 },
{ "year": "2014-01-05", "value": 450000 },
{ "year": "2014-01-06", "value": 500000 },
{ "year": "2014-01-07", "value": 600000 },
{ "year": "2014-01-08", "value": 700000 },
  { "year": "2014-01-09", "value": 800000 },
  { "year": "2014-01-10", "value": 900000 },
    { "year": "2014-01-11", "value": 100000 }
//{ "year": 2014-01-12, "value": 200000 },
//{ "year": 2014-01-13, "value": 300000 },
// { "year": 2014-01-14, "value": 400000 },
// { "year": 2014-01-15, "value": 450000 },
//  { "year": 2014-01-16, "value": 500000 },
//   { "year": 2014-01-17, "value": 600000 },
//    { "year": 2014-01-18, "value": 700000 },
//      { "year": 2014-01-19, "value": 800000 },
//      { "year": 2014-01-20, "value": 900000 },
//        { "year": 2014-01-21, "value": 100000 },
//{ "year": 2014-01-22, "value": 200000 },
//{ "year": 2014-01-23, "value": 300000 },
// { "year": 2014-01-24, "value": 400000 },
// { "year": 2014-01-25, "value": 450000 },
//  { "year": 2014-01-26, "value": 500000 },
//   { "year": 2014-01-27, "value": 600000 },
//    { "year": 2014-01-28, "value": 700000 },
//      { "year": 2014-01-29, "value": 800000 },
//      { "year": 2014-01-30, "value": 900000 }

];
var year = 0;


 
var fusioncharts = new FusionCharts({
    type: 'cylinder',
    dataFormat: 'json',
    id: 'fuelMeter-4',
    renderAt: 'ps1',
    width: '500',
    height: '300',
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
            "showValue": "1",
            "chartBottomMargin": "5",
            "refreshInterval": "1",
        },
        "value": "100000"

    },
    events: {
        "rendered": function (evtObj, argObj) {

            console.log(evtObj);
            console.log(fusionchartsspeedometer);
            var gaugeRef = evtObj.sender,
                fuelVolume = 0;

            var speedoref = fusionchartsspeedometer,
                fuelVolume = 0;
            var isStopped = false;
            var i = 0;
            var stored = 0;
            gaugeRef.chartInterval = setInterval(function () {
                gaugeRef.stopUpdate();
               // speedoref.restartUpdate();

                if (i < json.length) {
                    var x = parseInt(json[i].value.toString());

                  
                    var btn = document.getElementById('toggleBtn');


                    if (btn.value == "Stop Update") {

                        speedoref.feedData("value=" + x);

                            gaugeRef.feedData("&value=" + x);
                          
                       
                        year = json[i].year.toString();

                        stored = x;
                      //  console.log(i);
                        i++;
                    }else
                    {
                       
                        speedoref.feedData("value=" + stored);
                    }

                   


                }
                else {
                    i = 0;
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

        }
    }
}
);
fusioncharts.render();
    //

    //startstop
    //

var fusionchartsspeedometer = new FusionCharts({
    type: 'angulargauge',
    renderAt: 'speedometer',
    width: '400',
    height: '300',
    dataFormat: 'json',
    dataSource: {
        "chart": {
            "caption": "",
            "subcaption": "",
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
                "value": "100000",
                "showValue": "1",
                "tooltext": "Current year's average : $value",
                "rearExtension": "5"
            }]
        }
    },
});
fusionchartsspeedometer.render();

    //
    //

//---------------------------------------------------------------------------------
function loadchartdataps1() {
   
  
    //FusionCharts.ready(function () {


  
    //});

    //

}


});