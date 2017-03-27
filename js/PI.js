$(document).ready(function () {


    var myVar = "";

    var tankid = [
           { text: "TK1671", value: "TK1671" },
          
           { text: "TK2041", value: "TK2041" },
            { text: "TK1681", value: "TK1681" }

    ];

    $("#pisystemtankid").height(5).kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: tankid,
        index: 0,
        change: ontankidChange



    });
  
   
    function ontankidChange() {
      

        $("#dateRulers").dateRangeSlider("destroy");

            $("#dateRulers").dateRangeSlider({

                bounds: { min: new Date(2014, 0, 1), max: new Date(2015, 11, 30) },
                defaultValues: { min: new Date(2014, 0, 1), max: new Date(2014, 5, 1) },
                formatter: function (val) {
                    var days = val.getDate(),
                      month = val.getMonth() + 1,
                      year = val.getFullYear();
                    return year + "/" + month + "/" + days;
                }

            });

         


                var Type = "POST";
                var Url = serviceURLs["GetRecentDialyVolume"];
                var ContentType = "application/json; charset=utf-8";
                var DataType = "json";
                var tankid = $("#pisystemtankid").data("kendoDropDownList").value();
                var Data = '{"tankid": "' + tankid + '"}';

                console.log(Data);
                $.ajax({
                    type: Type,
                    url: Url,
                    contentType: ContentType,
                    dataType: DataType,
                    data: Data,
                    processdata: true,
                    success: function (msg) {

                        json = eval(msg.GetRecentDialyVolumeResult);

                        console.log(json);
                        clearInterval(myVar);
                        loadata((moment("2014-01-01").format('YYYY-MM-DD')), (moment("2014-06-1").format('YYYY-MM-DD')), "d");
                    }
                });

                document.getElementById("volumethroughput").innerHTML = "Volume(Gallons)";
           


       

    }


    LoadTankData("TK1671");
    var json = [];
    var jsonm = [];
    var jsony = [];
    var PI1 = $("#divps1");
    var winW = $(window).width();

    var winheight = $(window).height();

    function ServiceFailed(result) {
        alert('Service call failed: ' + result.status + '' + result.statusText);
        Type = null; Url = null; Data = null; ContentType = null; DataType = null; ProcessData = null;
    }
    var fusioncharts;
    var fusionchartsspeedometer;
    var slider;
    function LoadTankData(tankid) {
       
        $("#dateRulers").dateRangeSlider({

            bounds: { min: new Date(2014, 0, 1), max: new Date(2015, 11, 30) },
            defaultValues: { min: new Date(2014, 0, 1), max: new Date(2014, 5, 1) },
            formatter: function (val) {
                var days = val.getDate(),
                  month = val.getMonth() + 1,
                  year = val.getFullYear();
                return year + "/" + month + "/" + days;
            }

        });


        var Type = "POST";
        var Url = serviceURLs["GetRecentDialyVolume"];
        var ContentType = "application/json; charset=utf-8";
        var DataType = "json";
        var Data = '{"tankid": "' + tankid + '"}';
        $.ajax({
            type: Type,
            url: Url,
            contentType: ContentType,
            dataType: DataType,
            data: Data,
            processdata: true,
            success: function (msg) {

                json = eval(msg.GetRecentDialyVolumeResult);

                console.log(json.length);

                var PI1 = $("#divps1");
                var winW = $(window).width();

                var winheight = $(window).height();

                var json1 = getFilter(moment("2014-01-01").format('YYYY-MM-DD'), moment("2014-06-1").format('YYYY-MM-DD'), json);

                console.log(json1);
                fusioncharts = new FusionCharts({
                    type: 'cylinder',
                    dataFormat: 'json',
                    id: 'fuelMeter-4',
                    renderAt: 'ps1',
                    width: '400',
                    height: '200',
                    dataSource: {
                        "chart": {
                            "theme": "fint",
                            "caption": "",
                            "subcaption": "",
                            "lowerLimit": "0",
                            "upperLimit": "1000000",
                            "lowerLimitDisplay": "Empty",
                            "upperLimitDisplay": "Full",

                            "lowerLimitDisplay": "Empty",
                            
                            "numberSuffix": " Gallons",
                            "showValue": "1",
                            "chartBottomMargin": "1",
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

                            var i = 0;
                            var stored = 0;
                            gaugeRef.chartInterval = setInterval(function () {

                                if (slider) {

                                } else {
                                    gaugeRef.stopUpdate();
                                   

                                    if (i < json1.length) {
                                        var x = parseInt(json1[i].value.toString());


                                        var btn = document.getElementById('toggleBtn');



                                        if (btn.value == "Stop Update") {

                                            speedoref.feedData("value=" + x);

                                            gaugeRef.feedData("&value=" + x);


                                            year = json1[i].year.toString();
                                            document.getElementById('datevalue').innerHTML = year;

                                            document.getElementById('volumevalue').innerHTML = x;
                                            stored = x;
                                            //console.log("basic" + i);
                                            i++;
                                        } else {
                                            // year = json1[i].year.toString();
                                            speedoref.feedData("value=" + stored);

                                            //document.getElementById('datevalue').innerHTML = year;
                                        }




                                    }
                                    else {
                                        i = 0;
                                    }

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
                            controllers.innerHTML = '<br/><table id="tblPIVolume" width="90%" align="center"><tr><th>Start/Stop</th><th>Date</th><th><label style="font-weight:bold;" id="volumethroughput">Volume(Gallons)</label></th></tr><tr><td align="center"><button  type="button" class="play" value = "Stop Update"  id="toggleBtn" /></td><td><label id="datevalue"></label></td><td><label id="volumevalue"></label></td></tr></table><br/><br/>';
                            args.container.parentNode.insertBefore(controllers, args.container.nextSibling);

                            // setting css styles for controllers div
                            controllers.style.cssText = "align:right;";
                            var btn = document.getElementById('toggleBtn'),
                                startStopUpdate = function () {

                                    if (!isStopped) {
                                        document.getElementById("toggleBtn").className = "pause";
                                        isStopped = true
                                        btn.value = "Restart Update";

                                        gaugeRef.stopUpdate();
                                    } else {
                                        isStopped = false;
                                        document.getElementById("toggleBtn").className = "play";
                                        btn.value = "Stop Update";
                                        gaugeRef.restartUpdate();
                                    }
                                }

                            btn.addEventListener && btn.addEventListener("click", startStopUpdate);
                            $('input[name="daterange"]').daterangepicker({
                                                              
                            });

                           

                            $('input[name="daterange"]').on('apply.daterangepicker', function (ev, picker) {
                                $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));


                                var startDate = picker.startDate.format('MM/DD/YYYY');

                                var endDate = picker.endDate.format('MM/DD/YYYY');

                                var startDatearr = startDate.split('/');

                                var endDatearr = endDate.split('/');


                                $("#dateRulers").dateRangeSlider("destroy");

                                $("#dateRulers").dateRangeSlider({

                                    bounds: { min: new Date(2014, 0, 1), max: new Date(2015, 11, 30) },
                                    defaultValues: { min: new Date(startDatearr[2], startDatearr[0]-1, startDatearr[1]), max: new Date(endDatearr[2], endDatearr[0]-1, endDatearr[1]) },
                                    formatter: function (val) {
                                        var days = val.getDate(),
                                          month = val.getMonth() + 1,
                                          year = val.getFullYear();
                                        return year + "/" + month + "/" + days;
                                    }

                                });

                                var mindate = new Date(startDatearr[2], startDatearr[0]-1, startDatearr[1]);

                                var maxdate = new Date(endDatearr[2], endDatearr[0] - 1, endDatearr[1]);

                                if (($("#select-period").data("kendoMobileButtonGroup").current().index() == 0)) {
                                    clearInterval(myVar);
                                    loadata((mindate.toString()), (maxdate.toString()), "d");
                                }


                                if (($("#select-period").data("kendoMobileButtonGroup").current().index() == 1)) {
                                    clearInterval(myVar);

                                    loadata((mindate.toString()), (maxdate.toString()), "m");
                                }
                                if (($("#select-period").data("kendoMobileButtonGroup").current().index() == 2)) {
                                    clearInterval(myVar);
                                    loadata((mindate.toString()), (maxdate.toString()), "y");
                                }



                            });

                            $('input[name="daterange"]').on('cancel.daterangepicker', function (ev, picker) {
                                $(this).val('');
                            });
                        }
                    }
                }
              );
                fusioncharts.render();


                fusionchartsspeedometer = new FusionCharts({
                    type: 'angulargauge',
                    renderAt: 'speedometer',
                    width: '350',
                    height: '200',
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

            },
            error: ServiceFailed// When Service call fails
        });




    }

    //---------------------------------------------------------------------------

    $('#daterange').on('apply.daterangepicker', function (ev, picker) {
        var startDate = picker.startDate;
        var endDate = picker.endDate;  
        //alert(startDate);

        //alert(endDate);
    });

    //---------------------------------------------------------------------------------



    $("#btnpis").click(function () {



        PI1.dialog({
            open: function (event, ui) {
                PI1.closest("div[role='dialog']").css({ top: 100, height: 750, left: winW / 2 - $('#divDashBoard').width() / 2 + 20, width: $('#divDashBoard').width() - 100 });

            }
        });

    });
       
    
    $("#select-period").kendoMobileButtonGroup({
        select: function (e) {

            if(e.index==0)
            {
                if (($("#select-type").data("kendoMobileButtonGroup").current().index() == 0)) {
                    changedataperiodtype(0, 0);
                }
                if (($("#select-type").data("kendoMobileButtonGroup").current().index() == 1)) {
                    changedataperiodtype(0, 1);
                }
            }
            if(e.index==1)
            {
               
                if (($("#select-type").data("kendoMobileButtonGroup").current().index() == 0)) {
                    changedataperiodtype(1, 0);
                }
                if (($("#select-type").data("kendoMobileButtonGroup").current().index() == 1)) {
                    changedataperiodtype(1, 1);
                }
            }
            if(e.index==2)
            {
                if (($("#select-type").data("kendoMobileButtonGroup").current().index() == 0)) {
                    changedataperiodtype(2, 0);
                }
                if (($("#select-type").data("kendoMobileButtonGroup").current().index() == 1)) {
                    changedataperiodtype(2, 1);
                }
            }

        },
        index: 0
    });
      

    //

    $("#select-type").kendoMobileButtonGroup({

        select: function (e) {
            if (e.index == 0) {
                if (($("#select-period").data("kendoMobileButtonGroup").current().index() == 0)) {
                    changedataperiodtype(0, 0);

                }
                if (($("#select-period").data("kendoMobileButtonGroup").current().index() == 1)) {
                    changedataperiodtype(1, 0);

                }
                if (($("#select-period").data("kendoMobileButtonGroup").current().index() == 2)) {
                    changedataperiodtype(2, 0);

                }
            }
            if (e.index == 1) {
                if (($("#select-period").data("kendoMobileButtonGroup").current().index() == 0)) {
                    changedataperiodtype(0, 1);

                }
                if (($("#select-period").data("kendoMobileButtonGroup").current().index() == 1)) {
                    changedataperiodtype(1, 1);

                }
                if (($("#select-period").data("kendoMobileButtonGroup").current().index() == 2)) {
                    changedataperiodtype(2, 1);

                }
            }
        },
        index: 0
    });

    function changedataperiodtype(period,type)
    {
       
       
        if(period==0&&type==0)
        {
           
            var Type = "POST";
            var Url = serviceURLs["GetRecentDialyVolume"];
            var ContentType = "application/json; charset=utf-8";
            var DataType = "json";
            var tankid = $("#pisystemtankid").data("kendoDropDownList").value();
            var Data = '{"tankid": "' + tankid + '"}';
            $.ajax({
                type: Type,
                url: Url,
                contentType: ContentType,
                dataType: DataType,
                data: Data,
                processdata: true,
                success: function (msg) {

                    json = eval(msg.GetRecentDialyVolumeResult);

                    clearInterval(myVar);

                    var value = $('input[name="daterange"]').val();
                   

                    var picker = value.split('-');



                    var startDate = picker[0];

                    var endDate = picker[1];

                    var startDatearr = startDate.split('/');

                    var endDatearr = endDate.split('/');


                    $("#dateRulers").dateRangeSlider("destroy");

                    $("#dateRulers").dateRangeSlider({

                        bounds: { min: new Date(2014, 0, 1), max: new Date(2015, 11, 30) },
                        defaultValues: { min: new Date(startDatearr[2], startDatearr[0] - 1, startDatearr[1]), max: new Date(endDatearr[2], endDatearr[0] - 1, endDatearr[1]) },
                        formatter: function (val) {
                            var days = val.getDate(),
                              month = val.getMonth() + 1,
                              year = val.getFullYear();
                            return year + "/" + month + "/" + days;
                        }

                    });

                    var mindate = new Date(startDatearr[2], startDatearr[0] - 1, startDatearr[1]);

                    var maxdate = new Date(endDatearr[2], endDatearr[0] - 1, endDatearr[1]);

                    clearInterval(myVar);
                    loadata((mindate.toString()), (maxdate.toString()), "d");


                }
            });

            document.getElementById("volumethroughput").innerHTML = "Volume(Gallons)";
        }

        if (period == 0 && type == 1) {
           

            var Type = "POST";
            var Url = serviceURLs["GetRecentDialyVolumeThroughPut"];
            var ContentType = "application/json; charset=utf-8";
            var DataType = "json";
            var tankid = $("#pisystemtankid").data("kendoDropDownList").value();
            var Data = '{"tankid": "' + tankid + '"}';
            $.ajax({
                type: Type,
                url: Url,
                contentType: ContentType,
                dataType: DataType,
                data: Data,
                processdata: true,
                success: function (msg) {

                    json = eval(msg.GetRecentDialyVolumeThroughPutResult);

                    clearInterval(myVar);

                    var value = $('input[name="daterange"]').val();
                   

                    var picker = value.split('-');



                    var startDate = picker[0];

                    var endDate = picker[1];

                    var startDatearr = startDate.split('/');

                    var endDatearr = endDate.split('/');

                 

                    $("#dateRulers").dateRangeSlider("destroy");

                    $("#dateRulers").dateRangeSlider({

                        bounds: { min: new Date(2014, 0, 1), max: new Date(2015, 11, 30) },
                        defaultValues: { min: new Date(startDatearr[2], startDatearr[0] - 1, startDatearr[1]), max: new Date(endDatearr[2], endDatearr[0] - 1, endDatearr[1]) },
                        formatter: function (val) {
                            var days = val.getDate(),
                              month = val.getMonth() + 1,
                              year = val.getFullYear();
                            return year + "/" + month + "/" + days;
                        }

                    });

                    var mindate = new Date(startDatearr[2], startDatearr[0] - 1, startDatearr[1]);

                    var maxdate = new Date(endDatearr[2], endDatearr[0] - 1, endDatearr[1]);

                    clearInterval(myVar);
                    loadata((mindate.toString()), (maxdate.toString()), "d");

                }
            });

            document.getElementById("volumethroughput").innerHTML = "ThroughPut(Gallons)";

        }

        if (period == 1 && type == 0) {
            var Type = "POST";
            var Url = serviceURLs["GetRecentMonthlyVolume"];
            var ContentType = "application/json; charset=utf-8";
            var DataType = "json";
            var tankid = $("#pisystemtankid").data("kendoDropDownList").value();
            var Data = '{"tankid": "' + tankid + '"}';
            $.ajax({
                type: Type,
                url: Url,
                contentType: ContentType,
                dataType: DataType,
                data: Data,
                processdata: true,
                success: function (msg) {

                    jsonm = eval(msg.GetRecentMonthlyVolumeResult);

                    console.log(jsonm);


                    var value = $('input[name="daterange"]').val();
                    //alert(value);

                    var picker = value.split('-');



                    var startDate = picker[0];

                    var endDate = picker[1];

                    var startDatearr = startDate.split('/');

                    var endDatearr = endDate.split('/');
                    //alert(startDatearr);

                    //alert(endDatearr);
                    $("#dateRulers").dateRangeSlider("destroy");
                    $("#dateRulers").dateRangeSlider({

                        bounds: { min: new Date(2014, 0, 1), max: new Date(2015, 11, 30) },
                        defaultValues: { min: new Date(startDatearr[2], startDatearr[0] - 1, startDatearr[1]), max: new Date(endDatearr[2], endDatearr[0] - 1, endDatearr[1]) },
                        formatter: function (val) {
                            var days = val.getDate(),
                              month = val.getMonth() + 1,
                              year = val.getFullYear();
                            return year + "/" + month;
                        }

                    });

                    var mindate = new Date(startDatearr[2], startDatearr[0] - 1, startDatearr[1]);

                    var maxdate = new Date(endDatearr[2], endDatearr[0] - 1, endDatearr[1]);

                    clearInterval(myVar);
                    loadata((mindate.toString()), (maxdate.toString()), "m");

                }
            });

            document.getElementById("volumethroughput").innerHTML = "Volume(Gallons)";
        }

        if (period == 1 && type == 1) {
            var Type = "POST";
            var Url = serviceURLs["GetRecentMonthlyVolumeThroughPut"];
            var ContentType = "application/json; charset=utf-8";
            var DataType = "json";
            var tankid = $("#pisystemtankid").data("kendoDropDownList").value();
            var Data = '{"tankid": "' + tankid + '"}';
            $.ajax({
                type: Type,
                url: Url,
                contentType: ContentType,
                dataType: DataType,
                data: Data,
                processdata: true,
                success: function (msg) {

                    jsonm = eval(msg.GetRecentMonthlyVolumeThroughPutResult);

                    console.log(jsonm);
                    clearInterval(myVar);
                    clearInterval(myVar);

                    var value = $('input[name="daterange"]').val();


                    var picker = value.split('-');



                    var startDate = picker[0];

                    var endDate = picker[1];

                    var startDatearr = startDate.split('/');

                    var endDatearr = endDate.split('/');


                    $("#dateRulers").dateRangeSlider("destroy");

                    $("#dateRulers").dateRangeSlider({

                        bounds: { min: new Date(2014, 0, 1), max: new Date(2015, 11, 30) },
                        defaultValues: { min: new Date(startDatearr[2], startDatearr[0] - 1, startDatearr[1]), max: new Date(endDatearr[2], endDatearr[0] - 1, endDatearr[1]) },
                        formatter: function (val) {
                            var days = val.getDate(),
                              month = val.getMonth() + 1,
                              year = val.getFullYear();
                            return year + "/" + month;
                        }

                    });

                    var mindate = new Date(startDatearr[2], startDatearr[0] - 1, startDatearr[1]);

                    var maxdate = new Date(endDatearr[2], endDatearr[0] - 1, endDatearr[1]);

                    clearInterval(myVar);
                    loadata((mindate.toString()), (maxdate.toString()), "m");
                }
            });

            document.getElementById("volumethroughput").innerHTML = "ThroughPut(Gallons)";
        }



        

        if (period == 2 && type == 0) {
            $('input[name="daterange"]').data('daterangepicker').setStartDate('01/01/2014');
            $('input[name="daterange"]').data('daterangepicker').setEndDate('12/31/2014');

        var Type = "POST";
        var Url = serviceURLs["GetRecentYearlyVolume"];
        var ContentType = "application/json; charset=utf-8";
        var DataType = "json";
        var tankid = $("#pisystemtankid").data("kendoDropDownList").value();
        var Data = '{"tankid": "' + tankid + '"}';
        $.ajax({
            type: Type,
            url: Url,
            contentType: ContentType,
            dataType: DataType,
            data: Data,
            processdata: true,
            success: function (msg) {

                jsony = eval(msg.GetRecentYearlyVolumeResult);

                console.log(jsony);
             
                clearInterval(myVar);

                var value = $('input[name="daterange"]').val();


                var picker = value.split('-');



                var startDate = picker[0];

                var endDate = picker[1];

                var startDatearr = startDate.split('/');

                var endDatearr = endDate.split('/');


                $("#dateRulers").dateRangeSlider("destroy");

                $("#dateRulers").dateRangeSlider({

                    bounds: { min: new Date(2014, 0, 1), max: new Date(2015, 11, 30) },
                    defaultValues: { min: new Date(startDatearr[2], startDatearr[0] - 1, startDatearr[1]), max: new Date(endDatearr[2], endDatearr[0] - 1, endDatearr[1]) },
                    formatter: function (val) {
                        var days = val.getDate(),
                          month = val.getMonth() + 1,
                          year = val.getFullYear();
                        return year + "/" + month;
                    }

                });

                var mindate = new Date(startDatearr[2], startDatearr[0] - 1, startDatearr[1]);

                var maxdate = new Date(endDatearr[2], endDatearr[0] - 1, endDatearr[1]);

                clearInterval(myVar);
                loadata((mindate.toString()), (maxdate.toString()), "y");
            }
        });

        document.getElementById("volumethroughput").innerHTML = "Volume(Gallons)";
    
        }

    if (period == 2 && type == 1) {

        $('input[name="daterange"]').data('daterangepicker').setStartDate('01/01/2014');
        $('input[name="daterange"]').data('daterangepicker').setEndDate('12/31/2014');

        var Type = "POST";
        var Url = serviceURLs["GetRecentYearlyVolumeThroughPut"];
        var ContentType = "application/json; charset=utf-8";
        var DataType = "json";
        var tankid = $("#pisystemtankid").data("kendoDropDownList").value();
        var Data = '{"tankid": "' + tankid + '"}';
        $.ajax({
            type: Type,
            url: Url,
            contentType: ContentType,
            dataType: DataType,
            data: Data,
            processdata: true,
            success: function (msg) {

                jsony = eval(msg.GetRecentYearlyVolumeThroughPutResult);

                console.log(jsony);
                clearInterval(myVar);
                var value = $('input[name="daterange"]').val();


                var picker = value.split('-');



                var startDate = picker[0];

                var endDate = picker[1];

                var startDatearr = startDate.split('/');

                var endDatearr = endDate.split('/');


                $("#dateRulers").dateRangeSlider("destroy");

                $("#dateRulers").dateRangeSlider({

                    bounds: { min: new Date(2014, 0, 1), max: new Date(2015, 11, 30) },
                    defaultValues: { min: new Date(startDatearr[2], startDatearr[0] - 1, startDatearr[1]), max: new Date(endDatearr[2], endDatearr[0] - 1, endDatearr[1]) },
                    formatter: function (val) {
                        var days = val.getDate(),
                          month = val.getMonth() + 1,
                          year = val.getFullYear();
                        return year + "/" + month;
                    }

                });

                var mindate = new Date(startDatearr[2], startDatearr[0] - 1, startDatearr[1]);

                var maxdate = new Date(endDatearr[2], endDatearr[0] - 1, endDatearr[1]);

                clearInterval(myVar);
                loadata((mindate.toString()), (maxdate.toString()), "y");
            }
        });

        document.getElementById("volumethroughput").innerHTML = "ThroughPut(Gallons)";
        }
    }




        $("#dateRulers").dateRangeSlider({

            bounds: { min: new Date(2014, 0, 1), max: new Date(2015, 11, 30) },
            defaultValues: { min: new Date(2014, 0, 1), max: new Date(2014, 5, 1) }


        });



        //

        $("#dateRulers").bind("valuesChanged", function (e, data) {
            var mindate = (data.values.min.toString());

            var maxdate = (data.values.max.toString());


           

            if (($("#select-period").data("kendoMobileButtonGroup").current().index() == 0)) {
                clearInterval(myVar);
                loadata((mindate), (maxdate), "d");
            }


            if (($("#select-period").data("kendoMobileButtonGroup").current().index() == 1)) {
                clearInterval(myVar);

                loadata((mindate), (maxdate), "m");
            }
            if (($("#select-period").data("kendoMobileButtonGroup").current().index() == 2)) {
                clearInterval(myVar);
                loadata((mindate), (maxdate), "y");
            }






        });



        function loadata(startDate, endDate, type) {

           
            slider = true;

            var json1 = [];

            if (type == "d") {
                json1 = getFilter(moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'), json);
            }
            if (type == "m") {



                json1 = getFilter(moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'), jsonm);
            }
            if (type == "y") {
                json1 = getFilteryear(moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'), jsony);
            }




            var gaugeRef = fusioncharts,
                         fuelVolume = 0;

            var speedoref = fusionchartsspeedometer,
                fuelVolume = 0;
            var isStopped = false;
            var i = 0;
            var stored = 0;
            gaugeRef.restartUpdate();
            speedoref.restartUpdate();


            console.log(speedoref);

            myVar = setInterval(function () {


               

                if (i < json1.length) {
                    var x = parseInt(json1[i].value.toString());


                    var btn = document.getElementById('toggleBtn');


                    if (btn.value == "Stop Update") {


                        speedoref.feedData("value=" + x);

                        gaugeRef.feedData("&value=" + x);



                        year = json1[i].year.toString();



                        if (type == "m") {

                            year = year.split("-");
                            document.getElementById('datevalue').innerHTML = year[0] + "-" + year[1];

                            document.getElementById('volumevalue').innerHTML = x;
                        }

                        if (type == "y") {

                            year = year.split("-");
                            document.getElementById('datevalue').innerHTML = year[0];

                            document.getElementById('volumevalue').innerHTML = x;
                        }

                        if (type == "d") {


                            document.getElementById('datevalue').innerHTML = year;

                            document.getElementById('volumevalue').innerHTML = x;
                        }

                        stored = x;

                        i++;
                    } else {

                        speedoref.feedData("value=" + stored);


                    }




                }
                else {
                    i = 0;
                }



            }, 1000);




        }


        function getFilter(begin, end, input) {


            var val = [];
            var i;

            for (i = 0; i < input.length; i++) {


                var date = input[i].year;
                var nowDate = new Date(parseInt(date.substr(6)));


                var startDate = nowDate.format("yyyy/mm/dd");

                startDate = startDate.toString().replace("/", "-");

                startDate = startDate.toString().replace("/", "-");



                startDate = new Date(startDate);

                if (startDate <= new Date(end) && startDate >= new Date(begin)) // input[i] overlaps with [begin, end]
                {


                    var year = moment(startDate, "DD.MM.YYYY");
                    year.add(1, 'days');


                    val.push({ year: moment(year).format('YYYY-MM-DD'), value: input[i].value });
                }
            }
            return val;
        }


        function getFilteryear(begin, end, input) {


            var val = [];
            var i;

            for (i = 0; i < input.length; i++) {

                var date = input[i].year;
                var nowDate = new Date(parseInt(date.substr(6)));


                var startDate = nowDate.format("yyyy/mm/dd");

                startDate = startDate.toString().replace("/", "-");

                startDate = startDate.toString().replace("/", "-");


                startDate = startDate.split("-");

                console.log(startDate);

                console.log(begin);

                var beginDate = begin.split("-");

                var endDate = end.split("-");

                if (startDate[0] == beginDate[0] || beginDate[0] == endDate[0]) {
                    var year = moment(startDate, "DD.MM.YYYY");
                    year.add(1, 'days');
                    // alert(year);

                    val.push({ year: startDate[0], value: input[i].value });
                } else if (startDate[0] >= beginDate[0] && startDate[0] <= endDate[0]) {
                    var year = moment(startDate, "DD.MM.YYYY");
                    year.add(1, 'days');
                    // alert(year);

                    val.push({ year: startDate[0], value: input[i].value });
                }



            }
            return val;
        }


        var year = 0;


 

});