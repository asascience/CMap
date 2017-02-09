$(document).ready(function () {
    var serviceURLs = window.serviceURLs;
    
  
 function ServiceFailed(result) {
        alert('Service call failed: ' + result.status + '' + result.statusText);
        Type = null; Url = null; Data = null; ContentType = null; DataType = null; ProcessData = null;
    }
   


	
    
	var winW = $(window).width();

	var winheight = $(window).height();

	

	$('#divMOCUnits').css('width', winW - 600);
	var MOCunitsWindow = $("#divMOCUnits");
    //---------------------------------------------------------------------------------
	MOCunitsWindow.kendoWindow({
	    position: {
	        top: 100, // or "100px"
	        left: winW / 2 - $('#divDashBoard').width() / 2 + 40
	    },
	    width: winW - 500,
	    height: 500,
	    title: "Add/Edit Units",
	    visible: false,
	    actions: [
             "Close"
	    ]

	});
    
    //---------------------------------------------------------------------------------
	function LoadUnitsSucceeded(result) {
	   
	   var resultObject = eval(result.GetUnitNamesResult);	   
	    $("#dropdownUnitNames").height(15).kendoDropDownList({
            
	        dataTextField: "unit_name",
	        dataValueField: "unit_name",
	        dataSource: resultObject,
	        index: 0,
	        change: onUnitChange

	    });
	    var color = $("#dropdownUnitNames").data("kendoDropDownList");
	    color.select(0);
	    LoadUnitDetails();
	}
	function UnitDetailsSucceeded(result)
	{
	    
	    var resultObject = eval(result.GetUnitDetailsResult);
	    alert(resultObject[0].Unit_Length);
	    $("#divUnitType").html(resultObject[0].Unit_Type);
	    $("#divUnitDiameter").html(resultObject[0].Unit_Diameter);
	    $("#divUnitLength").html(resultObject[0].Unit_Length);
	    $("#divUnitWidth").html(resultObject[0].Unit_Width);
	    $("#divUnitHeight").html(resultObject[0].Unit_Height);
	    $("#divUnitCapacity").html(resultObject[0].Unit_Capacity);
	    $("#divUnitService").html(resultObject[0].Unit_Service);
	    var date = new Date(parseInt(resultObject[0].Unit_Construction_date.substr(6)));	    
	    $("#divUnitDOC").html(date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear());
	    $("#divUnitDOM").html(resultObject[0].Unit_Modification_Date);
	    $("#divUnitMaterial").html(resultObject[0].Unit_Material);
	    $("#divUnitDesignBasis").html(resultObject[0].Unit_Design_Basis);
	    
	}
	function onUnitChange()
	{
	    LoadUnitDetails();

	}

	
    //---------------------------------------------------------------------------------
	$('#btnMOCUnits').click(function () {

	  
	    MOCunitsWindow.data("kendoWindow").open();	    
	    LoadUnits();
	    // var unitname = $("#dropdownUnitNames").val();
	   
	});
	function LoadUnitDetails()
	{
	    var color = $("#dropdownUnitNames").data("kendoDropDownList");
	    
	    var unitname = color.value();
	    
	    var Url = serviceURLs["UnitDetails"];
	    var ContentType = "application/json; charset=utf-8";
	    var Data = '{"Id": "' + unitname + '"}';
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
	function LoadUnits() {
	        
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
	            LoadUnitsSucceeded(msg);
	        },
	        error: ServiceFailed// When Service call fails
	    });
	}
	
});          