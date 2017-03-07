$(document).ready(function () {

    //


   
    var serviceURLs = window.serviceURLs;
    oncategoryChange();
    var category = [
             { text: "Air", value: "AIR" },
             { text: "Waste", value: "WASTE" },
             { text: "Water", value: "WATER" },
              { text: "Other", value: "OTHER" }
    ];


    var subcategory = [
                  { text: "Regulations", value: "REGULATIONS" },
                  { text: "Permits", value: "PERMITS" },
                  { text: "Guidance", value: "GUIDANCE" },
                   { text: "Design", value: "DESIGN" },
                    { text: "RecordsData", value: "RECORDS/DATA" },

    ];
    $("#categoryr").height(15).kendoDropDownList({

        dataTextField: "text",
        dataValueField: "value",
        dataSource: category,
        index: 0,
        change: oncategoryChange

    });

    $("#subcategoryr").height(15).kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: subcategory,
        index: 0,
        change: onsubcategoryChange

    });

    LoadUnitstankslists();
  
 function ServiceFailed(result) {
        alert('Service call failed: ' + result.status + '' + result.statusText);
        Type = null; Url = null; Data = null; ContentType = null; DataType = null; ProcessData = null;
    }
   


	
    
	var winW = $(window).width();

	var winheight = $(window).height();

	

	// $('#divMOCUnits').css('width', winW - 600);
	var MOCunitsWindow = $("#divMOCUnits");
    //---------------------------------------------------------------------------------
	MOCunitsWindow.kendoWindow({
	    position: {
	        top: 150, // or "100px"
	        left: winW / 3 + 55
	    },
	    width: 400,
	    title: "Add/Edit Units",
	    visible: false,
	    actions: [
             "Close"
	    ],
		resizable: false
	});
    
    //---------------------------------------------------------------------------------
	function LoadUnitsSucceeded(result) {
	   
	   var resultObject = eval(result.GetUnitNamesResult);	   
	    $("#dropdownUnitNames").kendoDropDownList({
            
	        dataTextField: "unit_name",
	        dataValueField: "unit_name",
	        dataSource: resultObject,
	        index: 0,
	        change: onUnitChange

	    });
	    $("#dropdownUnitNames1").kendoDropDownList({

	        dataTextField: "unit_name",
	        dataValueField: "unit_name",
	        dataSource: resultObject,
	        index: 0,
	        change: onUnitChange1

	    });
	    var color = $("#dropdownUnitNames").data("kendoDropDownList");
	    color.select(0);
	    LoadUnitDetails();
	}

	function LoadUnitstankslistsfilter(result) {
	  // alert("inside loadunitstankslistsfilter");
	    var resultObject = eval(result.GetUnitNamesResult);
	    console.log(resultObject);
	    var dataSource = new kendo.data.DataSource({
	        data: resultObject
	       
	    });
	    console.log(dataSource);

	    $("#listViewtank").kendoListView({
	        dataSource: dataSource,
	        selectable: "multiple",
	        template: kendo.template($("#templatefiltertank").html())

	    });
	   
	}
	
	function onUnitChange()
	{	    
	    $("#dropdownUnitNames1").data('kendoDropDownList').value($("#dropdownUnitNames").val());
	    LoadUnitDetails();
	}
	function onUnitChange1() {
	    $("#dropdownUnitNames").data('kendoDropDownList').value($("#dropdownUnitNames1").val());	 
	    LoadUnitDetails();

	}

	$("#btnMOCUnitEdit").kendoButton();
	$("#btnMOCUnitUpdate").kendoButton();
	$("#btnMOCUnitCancel").kendoButton();
	$("#btnMOCUnitAdd").kendoButton();
	$('#btnMOCUnitCancel').hide();
	$('#btnMOCUnitUpdate').hide();

	$('#tblMOCUnits td:nth-child(3)').hide();
	$('#tblMOCUnits td:nth-child(4)').hide();

	$('#btnMOCUnitAdd').click(function () {
	    $('#tblMOCUnits td:nth-child(4)').show();
	    $('#tblMOCUnits td:nth-child(2)').hide();
	});

	$('#btnMOCUnitEdit').click(function () {
	    $('#tblMOCUnits td:nth-child(3)').show();
	    $('#tblMOCUnits td:nth-child(2)').hide();
	    $('#tblMOCUnits td:nth-child(4)').hide();
	    $('#btnMOCUnitCancel').show();
	    $('#btnMOCUnitUpdate').show();
	    $('#btnMOCUnitEdit').hide();
	    $("#btnMOCUnitAdd").hide();
	}); 
	$('#btnMOCUnitCancel').click(function () {
	    $('#tblMOCUnits td:nth-child(2)').show();
	    $('#tblMOCUnits td:nth-child(3)').hide();
	    $('#btnMOCUnitCancel').hide();
	    $('#btnMOCUnitUpdate').hide();
	    $('#btnMOCUnitEdit').show();
	    $("#btnMOCUnitAdd").show();
	});
	$('#btnMOCUnitUpdate').click(function () {
	    UpdateUnits();
	    $('#tblMOCUnits td:nth-child(2)').show();
	    $('#tblMOCUnits td:nth-child(3)').hide();
	    $('#btnMOCUnitCancel').hide();
	    $('#btnMOCUnitUpdate').hide();
	    $('#btnMOCUnitEdit').show();
	    $("#btnMOCUnitAdd").show();
	});
    //---------------------------------------------------------------------------------
	$('#btnMOCUnits').click(function () {

	  
	    MOCunitsWindow.data("kendoWindow").open();	    
	    LoadUnits();
	    // var unitname = $("#dropdownUnitNames").val();
	   
	});

    $("#listView2filter").on("change", ".check", function (e) {
     
        var checkbox = $(this),
   dataSource = $("#listView2filter").data("kendoListView").dataSource, //get the dataSource
   uid = checkbox.closest(".listItem").data("uid"), //find the parent ListView item and get its UID
   dataItem;

        dataItem = dataSource.getByUid(uid); //get the dataItem by its UID
      

        //dataItem.set("Checked", this.checked);
        
        var listView = $("#listView2filter").data("kendoListView");

        listView.select(listView.element.find('[data-uid="' + uid + '"]'));

         //save the checked state in the DataItem
     });
    //

    $("#listViewtank").on("change", ".checktank", function (e) {
        //alert("tankcondition");
        var checkbox = $(this),
   dataSource = $("#listViewtank").data("kendoListView").dataSource, //get the dataSource
   uid = checkbox.closest(".listItem").data("uid"), //find the parent ListView item and get its UID
   dataItem;

        dataItem = dataSource.getByUid(uid); //get the dataItem by its UID

        var listView = $("#listViewtank").data("kendoListView");

        listView.select(listView.element.find('[data-uid="' + uid + '"]'));

        //save the checked state in the DataItem
    });
	

    //
    $("#listView2filter").on("change", ".check", function (e) {

        var checkbox = $(this),
   dataSource = $("#listView2filter").data("kendoListView").dataSource, //get the dataSource
   uid = checkbox.closest(".listItem").data("uid"), //find the parent ListView item and get its UID
   dataItem;

        dataItem = dataSource.getByUid(uid); //get the dataItem by its UID


        //dataItem.set("Checked", this.checked);

        var listView = $("#listView2filter").data("kendoListView");

        listView.select(listView.element.find('[data-uid="' + uid + '"]'));

        //save the checked state in the DataItem
    });
    //
    $("#listView2filter").kendoTooltip({
        filter: ".listItem",
        content: function (e) {
            var listView = $("#listView2filter").data("kendoListView");
            var item = listView.dataSource.getByUid(e.target.attr("data-uid"));
            return "Unit: " + (item.tankid);

        }
    })
    //
	$('#btnRelate').click(function () {



	    var values = new Array();
	    var list2 = $("#listView2filter").data("kendoListView");
	    var category = $("#categoryr").data("kendoDropDownList").value();

	    var subcategory = $("#subcategoryr").data("kendoDropDownList").value();

	   

	    var listt = $("#listViewtank").data("kendoListView");

	    var tankid = "";

	    listt.select().each(function (idx, element) {

	        console.log(element);
	        var uid = $(element).data("uid");
	        var dsItem = listt.dataSource.getByUid(uid);

	        console.log(dsItem);

	        tankid=(dsItem.unit_name);

	    });

	    list2.select().each(function (idx, element) {

	        console.log(element);
	        var uid = $(element).data("uid");
	        var dsItem = list2.dataSource.getByUid(uid);
	       
	        console.log(dsItem);


	        values.push(dsItem.filename);


	    });

	    var filename = values.join("$");
	    
	    var Data = '{"category":"' + category + '","subcategory":"' + subcategory + '","tankid":"' + tankid + '","fn":"' + filename + '"}';
	    console.log(Data);
	        var Type = "POST";
	        var Url = serviceURLs["RelateTank"];
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
	                console.log(msg);
	                alert(msg.FixRelateFileResult);
	                // alert("success");
	            },
	            error: ServiceFailed// When Service call fails
	        });


	   

	   

	});

    //


	$('#btnunRelate').click(function () {



	    var values = new Array();
	    var list2 = $("#listView2filter").data("kendoListView");
	    var category = $("#categoryr").data("kendoDropDownList").value();

	    var subcategory = $("#subcategoryr").data("kendoDropDownList").value();



	    var listt = $("#listViewtank").data("kendoListView");

	    var tankid = "";

	   
	    list2.select().each(function (idx, element) {

	        console.log(element);
	        var uid = $(element).data("uid");
	        var dsItem = list2.dataSource.getByUid(uid);

	        console.log(dsItem);
	        //alert(dsItem.filename);

	        values.push(dsItem.filename);


	    });

	    var filename = values.join("$");

	    var Data = '{"category":"' + category + '","subcategory":"' + subcategory + '","fn":"' + filename + '"}';
	    console.log(Data);
	    var Type = "POST";
	    var Url = serviceURLs["UNRelateTank"];
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
	            console.log(msg);
	            alert(msg.BreakRelateFileResult);
	             //alert("success");
	        },
	        error: ServiceFailed// When Service call fails
	    });






	});


	function LoadUnitDetails()
	{
	    var color = $("#dropdownUnitNames").data("kendoDropDownList");
	//    var color1 = $("#dropdownUnitNames1").data("kendoDropDownList");
	    
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
	function UnitDetailsSucceeded(result) {

	    var resultObject = eval(result.GetUnitDetailsResult);

	    $("#divUnitType").html(resultObject[0].Unit_Type);
	    $("#editUnitType").val(resultObject[0].Unit_Type);
	    $("#divUnitDiameter").html(resultObject[0].Unit_Diameter);
	    $("#editUnitDiameter").val(resultObject[0].Unit_Diameter);
	   // alert(resultObject[0].Unit_Length);
	    $("#divUnitLength").html(resultObject[0].Unit_Length);
	    $("#editUnitLength").val(resultObject[0].Unit_Length);
	    $("#divUnitWidth").html(resultObject[0].Unit_Width);
	    $("#editUnitWidth").val(resultObject[0].Unit_Width);
	    $("#divUnitHeight").html(resultObject[0].Unit_Height);
	    $("#editUnitHeight").val(resultObject[0].Unit_Height);
	    $("#divUnitCapacity").html(resultObject[0].Unit_Capacity);
	    $("#editUnitCapacity").val(resultObject[0].Unit_Capacity);
	    $("#divUnitService").html(resultObject[0].Unit_Service);
	    $("#editUnitService").val(resultObject[0].Unit_Service);
	    var date = new Date(parseInt(resultObject[0].Unit_Construction_date.substr(6)));
	    $("#divUnitDOC").html(date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear());
	    $("#editUnitDOC").val(date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear());
	    if (resultObject[0].Unit_Modification_Date != null) {
	        date = new Date(parseInt(resultObject[0].Unit_Modification_Date.substr(6)));
	        $("#divUnitDOM").html(date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear());
	        $("#editUnitDOM").val(date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear());
	    }


	    $("#divUnitMaterial").html(resultObject[0].Unit_Material);
	    $("#editUnitMaterial").val(resultObject[0].Unit_Material);
	    $("#divUnitDesignBasis").html(resultObject[0].Unit_Design_Basis);
	    $("#editUnitDesignBasis").val(resultObject[0].Unit_Design_Basis);

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
	function UpdateUnits() {
	    var unitname = $("#dropdownUnitNames1").val();	  
	    var type = $("#editUnitType").val();	    
	    var diameter = $("#editUnitDiameter").val();
	    var length = ($("#editUnitLength").val()=="")?null:$("#editUnitLength").val();	    
	    var width = ($("#editUnitWidth").val() == "") ? null : $("#editUnitWidth").val();
	    var height =  ($("#editUnitHeight").val() == "") ? null : $("#editUnitHeight").val();
	    var capacity = $("#editUnitCapacity").val();
	    var service = $("#editUnitService").val();
	    var DOC = $("#editUnitDOC").val();
	    var DOM = $("#editUnitDOM").val();
	    var material = $("#editUnitMaterial").val();
	    var DB = $("#editUnitDesignBasis").val();

	    var Url = serviceURLs["UpdateUnits"];
	    var ContentType = "application/json; charset=utf-8";
	    var Data = '{"UnitName": "' + unitname + '","Type": "' + type + '","diameter":"' + diameter + '","length":"' + length + '","width":"' + width + '","height":"' + height + '","capacity":"' + capacity + '","service":"' + service + '","DOC":"' + DOC + '","DOM":"' + DOM + '","material":"' + material + '","DB":"' + DB + '"}';
	   // alert(Data);
	    $.ajax({
	        type: 'POST',
	        url: Url,
	        data: Data,
	        contentType: ContentType,
	        dataType: 'json',
	        processdata: true,
	        success: function (msg) {	         
	            alert(msg.UpdateUnitResult);	        
	        },
	        error: ServiceFailed// When Service call fails
	    });
	    LoadUnitDetails();
	}
	function LoadUnitstankslists() {
        
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
	           LoadUnitstankslistsfilter(msg);
	        },
	        error: ServiceFailed// When Service call fails
	    });
	}

    //


    //
 
 function LoadFiles(result) {

     // console.log(result);

    // alert("inside loadfiles");
    

     //
     //var resultObject = eval(result.GetUnitNamesResult);
     //console.log(resultObject);
     //var dataSource = new kendo.data.DataSource({
     //    data: resultObject,
     //    schema: {
     //        model: {
     //            fields: {

     //                unit_name: { type: "string" }
     //            }
     //        }
     //    }
     //});
     //console.log(dataSource);
     //

     var dropdownlist = $("#categoryr").data("kendoDropDownList");

     var dropdownsubcategory = $("#subcategoryr").data("kendoDropDownList");

     var category = $("#categoryr").data("kendoDropDownList").value();

     var subcategory = $("#subcategoryr").data("kendoDropDownList").value();

     resultObject = eval(result.GetFilesListRelateResult);

     //  console.log(resultObject);


   //  var json = [];



    var json = JSLINQ(resultObject)
   .Where(function (item) { return item.Cateogory == category && item.SubCateogory.toUpperCase() == subcategory });

   //  console.log(json.items);


   //  var jsonArr = [];

   //  for (var i = 0; i < json.items.length; i++) {
   //      jsonArr.push({
   //          id: json.items[i].id,
   //          text: json.items[i].filename
   //      });
   //  }

     // console.log(jsonArr);

     console.log(resultObject);
     var dataSource = new kendo.data.DataSource({
         data: json.items
         
     });
     console.log(dataSource);

    $("#listView2filter").kendoListView({
        dataSource: dataSource,
         selectable: "multiple",
         template: kendo.template($("#templatefilter").html())

     });



 }


    //
 function oncategoryChange() {

    // alert("change");

     var uesrid = "2"; var Type = "POST";
     var Url = serviceURLs["GetFilesListRelate"];
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
             LoadFiles(msg);
             // alert("success");
         },
         error: ServiceFailed// When Service call fails
     });






 };

    //

 function onsubcategoryChange() {
     //alert("change");
     var uesrid = "2"; var Type = "POST";
     var Url = serviceURLs["GetFilesListRelate"];
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
             LoadFiles(msg);
             // alert("success");
         },
         error: ServiceFailed// When Service call fails
     });



 };
	
    //







});          