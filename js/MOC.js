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
            return "TankID: " + (item.tankid);

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
     var Url = serviceURLs["fileslist"];;
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
             //alert("success");
         },
         error: ServiceFailed// When Service call fails
     });



 };
	
    //







});          