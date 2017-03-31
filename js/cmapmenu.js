$(document).ready(function () {



  
   
    var serviceURLs = window.serviceURLs;
    //alert(window.serviceURLs);

    var qs = getParameterByName("tank");
      ChangeDesignTable(qs);
     changeMAERTable(qs);

    function changeMAERTable(qs) {
        if (qs == "TK-1671") {
            $('#tdMTlbs1').html("5.081 lbs/hr");
            $('#tdMTlbs2').html("0.01 lbs/hr");
            $('#tdMTtny1').html("2.55 TPY");
            $('#tdMTtny2').html("0.02 TPY");
        }
        else if (qs == "TK-1247") {
            $('#tdMTlbs1').html("5.08 lbs/hr");
            $('#tdMTlbs2').html("0.01 lbs/hr");
            $('#tdMTtny1').html("8.87 TPY");
            $('#tdMTtny2').html("0.01 TPY");
        }
        else if (qs == "TK-2041") {
            $('#tdMTlbs1').html("6.58 lbs/hr");
            $('#tdMTtny1').html("6.64 TPY");

            $('#trBenzene').css("display", "none");


        }
        else if (qs == "TK-1681") {
            $('#tdMTlbs1').html("190.4 lbs/hr");
            $('#tdMTlbs2').html("0.18 lbs/hr");
            $('#tdMTlbs3').html("0.59 lbs/hr");
            $('#tdMTtny1').html("161.75 TPY");
            $('#tdMTtny2').html("0.29 TPY");
            $('#tdMTtny3').html("0.03 TPY");

            $('#trH2SO4').css("display", "block");
        }
    }
    function ChangeDesignTable(qs) {
       // alert(serviceURLs["UnitDetails"]);

        var Url = serviceURLs["UnitDetails"];
        var ContentType = "application/json; charset=utf-8";
        var Data = '{"Id": "' + qs + '"}';
        $.ajax({
            type: 'POST',
            url: Url,
            data: Data,
            contentType: ContentType,
            dataType: 'json',
            processdata: true,
            success: function (msg) {
                UnitDetailsSucceeded(msg);
            },
            error: ServiceFailed// When Service call fails
        });

    }
    $("#tblDesignMain").click(function () {
        showDesignMenu(1);
    });
    $("#tblAirMain").click(function () {
        showAirMenu(1);
    });
    $("#tdBackToDesign").click(function () {
        showDesignMenu(0);
    });
    $("#tdBacktoAir").click(function () {
        showAirMenu(0);
    });
    $("#tblAirPrograms").click(function () {
        showAirProgramsMenu(1);
    });
    $("#tblAirPermits").click(function () {
        showAirPermitsMenu(1);
    });
    $("#tblAirEmissions").click(function () {
        showAirEmissionsMenu(1);
    });
    $("#tdBackToAirMenu, #tdBackToAirMenu1, #tdBackToAirMenu2").click(function () {
        showAirMenu(1);
    });

    function ServiceFailed(result) {
        alert('Service call failed: ' + result.status + '' + result.statusText);
        Type = null; Url = null; Data = null; ContentType = null; DataType = null; ProcessData = null;
    }
    function UnitDetailsSucceeded(result) {

        var resultObject = eval(result.GetUnitDetailsResult);
        //alert(resultObject)
     //   alert("Here");
        $('#tdMaterials').html(resultObject[0].Unit_Material);
        $('#tdDB').html(resultObject[0].Unit_Design_Basis);
        $('#tdDimensions').html("D-120ft, H-40ft");
        $('#tdCapacity').html(resultObject[0].Unit_Capacity);
        $('#tdService').html(resultObject[0].Unit_Service);
        var date = new Date(parseInt(resultObject[0].Unit_Construction_date.substr(6)));
        $('#tdCDate').html(date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear());
        if (resultObject[0].Unit_Modification_Date != null) {
            date = new Date(parseInt(resultObject[0].Unit_Modification_Date.substr(6)));
            $('#tdMDate').html(date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear());
        }
        else
            $('#tdMDate').html("N/A");


    }
    function getParameterByName(name) {
        //if (!url) {
        var url = window.location.href;
        //}
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }


    function showDesignMenu(show) {
        if (show == 1) {
            document.getElementById('tblMainMenu').style.display = 'none';
            document.getElementById('tblDesignMenu').style.display = 'block';
        }
        else {
            document.getElementById('tblMainMenu').style.display = 'block';
            document.getElementById('tblDesignMenu').style.display = 'none';
        }
    }
    function showAirMenu(show) {
        if (show == 1) {
            document.getElementById('tblMainMenu').style.display = 'none';
            document.getElementById('tblAirMenu').style.display = 'block';
            document.getElementById('tblAirRegulationsMenu').style.display = 'none';
            document.getElementById('tblAirEmissionsMenu').style.display = 'none';
            document.getElementById('tblAirPermitsMenu').style.display = 'none';
        }
        else {
            document.getElementById('tblMainMenu').style.display = 'block';
            document.getElementById('tblAirMenu').style.display = 'none';
        }
    }

    function showAirProgramsMenu(show) {
        if (show == 1) {
            document.getElementById('tblAirMenu').style.display = 'none';
            document.getElementById('tblAirRegulationsMenu').style.display = 'block';
        }
        else {
            document.getElementById('tblAirMenu').style.display = 'block';
            document.getElementById('tblAirRegulationsMenu').style.display = 'none';
        }
    }
    function showAirEmissionsMenu(show) {
        if (show == 1) {
            document.getElementById('tblAirMenu').style.display = 'none';
            document.getElementById('tblAirEmissionsMenu').style.display = 'block';
        }
        else {
            document.getElementById('tblAirMenu').style.display = 'block';
            document.getElementById('tblAirEmissionsMenu').style.display = 'none';
        }
    }
    function showAirPermitsMenu(show) {

        if (show == 1) {

            document.getElementById('tblAirMenu').style.display = 'none';
            document.getElementById('tblAirPermitsMenu').style.display = 'block';


        }
        else {
            document.getElementById('tblAirMenu').style.display = 'block';
            document.getElementById('tblAirsPermitsMenu').style.display = 'none';
        }
    }
});