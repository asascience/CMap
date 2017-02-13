$(document).ready(function () {

    var serviceURLs = window.serviceURLs;

 var winW = $(window).width();
 var FCWindow = $("#divFC");
 var FCUploadWindow = $("#divFCUpload");
   //---------------------------------------------------------------------------------
   FCWindow.kendoWindow({
	    position: {
			top: 100, // or "100px"
			left: winW / 2 - $('#divDashBoard').width() / 2 +40
		  },
        width:winW-500,
	    height:600,
        title: "File Cabinet",
        visible: false,
        actions: [                           
             "Close"
         ]
                       
          });
		   //---------------------------------------------------------------------------------
   FCUploadWindow.kendoWindow({
	    position: {
			top: 100, // or "100px"
			left: winW / 2 - $('#divDashBoard').width() / 2 +40
		  },
        width:winW-500,
	    height:600,
        title: "File Cabinet - Upload",
        visible: false,
        actions: [                           
             "Close"
         ]
                       
   });
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
    $("#category").height(15).kendoDropDownList({

        dataTextField: "text",
        dataValueField: "value",
        dataSource: category,
        index: 0,
        change: oncategoryChange

    });

    $("#subcategory").height(15).kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: subcategory,
        index: 0,
        change: onsubcategoryChange

    });
    $("#tabstrip").kendoTabStrip({
        animation: {
            open: {
                effects: "fadeIn"
            }
        }
    });

    $("#divFCUpload1").tabs();


    LoadRecent20Files();
    function LoadRecent20Files() {
         var Type = "POST";
         var Url = serviceURLs["GetRecent20Files"];
        var ContentType = "application/json; charset=utf-8";
        var DataType = "json";

        $.ajax({
            type: Type,
            url: Url,            
            contentType: ContentType,
            dataType: DataType,
            processdata: true,
            success: function (msg) {
                LoadRecent20FilesSucceded(msg);
                // alert("success");
            },
            error: ServiceFailed// When Service call fails
        });
        
    }
    function LoadRecent20FilesSucceded(result)
    {
        
        var resultObject = eval(result.GetRecent20FilesResult);
        //var data = {
        //    "d": resultObject
        //};
        //$("#divRecent20Files").kendoGrid({
        //    dataSource: {
        //        transport: {
        //            read: function (options) {
        //                options.success(data);
        //            }
        //        },
        //        schema: {
        //            data: "d"
        //        }
        //    }
        //});

        
        $("#divRecent20Files").kendoGrid({

            dataSource: {
                data: resultObject

            },
            dataBound: function () {
                this.expandRow(this.tbody.find("tr.k-master-row"));
            },
            
            dataBound: function () {
                // this.expandRow(this.tbody.find("tr.k-master-row").first());

            },

            columns: [{ field: "Cateogory", title: "Category" },
    { field: "SubCateogory", title: "Sub Cateogory" },

    { field: "filename", title: "File Name" },
   

     { field: "upload_date", title: "Upload Date", template: "#= kendo.toString(kendo.parseDate(upload_date, 'yyyy-MM-dd'), 'MM/dd/yyyy') #" }, ]
           

        });
    }

    oncategoryChange();
    function oncategoryChange() {

        var uesrid = "2"; var Type = "POST";
        var Url = serviceURLs["fileslist"];
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
                LoadFilesListSucceeded(msg);
                // alert("success");
            },
            error: ServiceFailed// When Service call fails
        });






    };


    function LoadFilesListSucceeded(result) {

       // console.log(result);

        var dropdownlist = $("#category").data("kendoDropDownList");

        var dropdownsubcategory = $("#subcategory").data("kendoDropDownList");

        var category = $("#category").data("kendoDropDownList").value();

        var subcategory = $("#subcategory").data("kendoDropDownList").value();

        resultObject = eval(result.GetFilesListResult);

      //  console.log(resultObject);


        var json = [];



        var json = JSLINQ(resultObject)
      .Where(function (item) { return item.cateogory == category && item.subcategory == subcategory; });

      
	

        $("#divcategorysubcategory").jstree("destroy");
        $('#divcategorysubcategory').jstree({
            "core": {
                'animation': 0,
                'strings': {
                    new_node: 'The text you want', //this text will change the label when you create a new node
                },
                'data': (json.items),
                "check_callback": function (operation, node, parent, position, more) {
                    //console.log(operation);
                    if (operation === "copy_node" || operation === "move_node") {
                        if (parent.id === "#") {
                            return false; // prevent moving a child above or below the root
                        }
                    }
                    if (operation === "delete_node") {
                        alert("Deleted");

                        var x = document.getElementById("uploadFiles");
                        var file = x.files[0];
                        var fileData = file;

                        var dropdownlist = $("#category").data("kendoDropDownList");

                        var dropdownsubcategory = $("#subcategory").data("kendoDropDownList");

                        var category = $("#category").data("kendoDropDownList").value();

                        var subcategory = $("#subcategory").data("kendoDropDownList").value();

                        var Url = serviceURLs["Removenode"];

                        var parent = $("#divcategorysubcategory").jstree().get_selected(true)[0].parent;
                        var Data = '{"filename": "' + node.text + '"}';
                        alert(Data);

                        var Type = "POST";
                        var Url = serviceURLs["Removenode"];
                        var ContentType = "application/json; charset=utf-8";
                        var DataType = "json";

                        $.ajax({
                            type: Type,
                            url: Url,
                            data: Data,
                            contentType: ContentType,
                            dataType: DataType,
                            processdata: true,
                            success: function (data) {
                                //console.log(data);

                                alert("Sucessfully Deleted Node");

                            },
                            error: function (result) {
                                alert('Service call failed: ' + result.status + '' + result.statusText);
                            }
                        });
                    }

                    if (operation === "rename_node") {
                        var x = document.getElementById("uploadFiles");
                        var file = x.files[0];
                        var fileData = file;

                        var dropdownlist = $("#category").data("kendoDropDownList");

                        var dropdownsubcategory = $("#subcategory").data("kendoDropDownList");

                        var category = $("#category").data("kendoDropDownList").value();

                        var subcategory = $("#subcategory").data("kendoDropDownList").value();

                        var Url = serviceURLs["uploadcustomfile"];

                        var parent = $("#divcategorysubcategory").jstree().get_selected(true)[0].parent;

                        // alert(parent);
                        $.ajax({
                            url: Url,
                            type: 'POST',
                            data: fileData,
                            cache: false,
                            dataType: 'json',
                            processData: false, // Don't process the files
                            contentType: false, // Set content type to false as jQuery will tell the server its a query string request
                            success: function (data) {
                                UploadFileServiceSucceeded(data, node.text, category, subcategory, parent, "Folder");

                            },
                            error: function (result) {
                                alert('Service call failed: ' + result.status + '' + result.statusText);
                            }
                        });

                    }
                    return true; // allow everything else
                }
            },
            "plugins": ["dnd", "contextmenu"]
        });


        $('.vakata-context jstree-contextmenu jstree-default-contextmenu').css('left', '0px');

    }
    function onsubcategoryChange() {

        var uesrid = "2"; var Type = "POST";
       
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
                LoadFilesListSucceeded(msg);
                //alert("success");
            },
            error: ServiceFailed// When Service call fails
        });



    };

    var Data = '{"category":"AIR","subcategory":"REGULATIONS"}';
    var ContentType = "application/json; charset=utf-8";
    var Url = serviceURLs["Getnotes"];
    //alert(Data);
    $.ajax({
        type: 'POST',
        url: Url,
        data: Data,
        contentType: ContentType,
        dataType: 'json',
        processdata: true,
        success: function (msg) {

            console.log(msg.GetnotesResult);

            var json = (msg.GetnotesResult);


            var dataSource = new kendo.data.DataSource({
                data: eval(json)

            });

            console.log(dataSource);
           
            $("#noteslistview").kendoListView({
                dataSource: dataSource,
                selectable: "multiple",
                template: kendo.template($("#templatenotes").html())

            });
        },
        error: ServiceFailed// When Service call fails
    });



    $('#airpermits').click('tabsselect', function (event, ui) {

        var selectedTabm = $("#divFC1").tabs('option', 'active');
      

        var selectedTab = $("#airpermits").tabs('option', 'active');
       // alert(selectedTab);


        var Url = serviceURLs["Getnotes"];
        var ContentType = "application/json; charset=utf-8";

        if (selectedTabm == "0" && selectedTab == "0") {
            category = "AIR";

            SubCateogory = "REGULATIONS";

        }
        if (selectedTabm == "0" && selectedTab == "1") {
            category = "AIR";

            SubCateogory = "PERMITS";

        }
        if (selectedTabm == "0" && selectedTab == "2") {
            category = "AIR";

            SubCateogory = "GUIDANCE";

        }
        if (selectedTabm == "0" && selectedTab == "3") {
            category = "AIR";

            SubCateogory = "DESIGN";

        }
        if (selectedTabm == "0" && selectedTab == "4") {
            category = "AIR";

            SubCateogory = "RECORDS/DATA";


        }

        //waste



        if (selectedTabm == "1" && selectedTab == "0") {
            category = "AIR";

            SubCateogory = "REGULATIONS";

        }
        if (selectedTabm == "1" && selectedTab == "1") {
            category = "AIR";

            SubCateogory = "PERMITS";

        }
        if (selectedTabm == "1" && selectedTab == "2") {
            category = "AIR";

            SubCateogory = "GUIDANCE";


        }
        if (selectedTabm == "1" && selectedTab == "3") {
            category = "AIR";

            SubCateogory = "DESIGN";

        }
        if (selectedTabm == "1" && selectedTab == "4") {
            category = "AIR";

            SubCateogory = "RECORDS/DATA";


        }
        //water



        if (selectedTabm == "2" && selectedTab == "0") {
            category = "AIR";

            SubCateogory = "REGULATIONS";

        }
        if (selectedTabm == "2" && selectedTab == "1") {
            category = "AIR";

            SubCateogory = "PERMITS";

        }
        if (selectedTabm == "2" && selectedTab == "2") {
            category = "AIR";

            SubCateogory = "GUIDANCE";

        }
        if (selectedTabm == "2" && selectedTab == "3") {
            category = "AIR";

            SubCateogory = "DESIGN";

        }
        if (selectedTabm == "2" && selectedTab == "4") {
            category = "AIR";

            SubCateogory = "RECORDS/DATA";


        }
        //Other




        if (selectedTabm == "3" && selectedTab == "0") {
            category = "AIR";

            SubCateogory = "Regulations";

        }
        if (selectedTabm == "3" && selectedTab == "1") {
            category = "AIR";

            SubCateogory = "PERMITS";


        }
        if (selectedTabm == "3" && selectedTab == "2") {
            category = "AIR";

            SubCateogory = "GUIDANCE";

        }
        if (selectedTabm == "3" && selectedTab == "3") {
            category = "AIR";

            SubCateogory = "DESIGN";

        }
        if (selectedTabm == "3" && selectedTab == "4") {
            category = "AIR";

            SubCateogory = "RECORDS/DATA";


        }




        var Data = '{"category":"' + category + '","subcategory":"' + SubCateogory + '"}';
        var Url = serviceURLs["Getnotes"];
        //alert(Data);
        $.ajax({
            type: 'POST',
            url: Url,
            data: Data,
            contentType: ContentType,
            dataType: 'json',
            processdata: true,
            success: function (msg) {

                console.log(msg.GetnotesResult);

                var json = (msg.GetnotesResult);


                var dataSource = new kendo.data.DataSource({
                    data: eval(json)

                });

                console.log(dataSource);
                var listView = $("#noteslistview").data("kendoListView");
                listView.destroy();
                $("#noteslistview").kendoListView({
                    dataSource: dataSource,
                    selectable: "multiple",
                    template: kendo.template($("#templatenotes").html())

                });
            },
            error: ServiceFailed// When Service call fails
        });

       
    });

    $("#divFC1").tabs();
    $("#airpermits").tabs().addClass("ui-tabs-vertical ui-helper-clearfix");
    $("#airpermits li").removeClass("ui-corner-top").addClass("ui-corner-left");


    $("#wastepermits").tabs().addClass("ui-tabs-vertical ui-helper-clearfix");
    $("#wastepermits li").removeClass("ui-corner-top").addClass("ui-corner-left");


    $("#waterpermits").tabs().addClass("ui-tabs-vertical ui-helper-clearfix");
    $("#waterpermits li").removeClass("ui-corner-top").addClass("ui-corner-left");


    $("#otherpermits").tabs().addClass("ui-tabs-vertical ui-helper-clearfix");
    $("#otherpermits li").removeClass("ui-corner-top").addClass("ui-corner-left");


    $("#btnFCSearch").click(function () {
      
        var uesrid = "2"; var Type = "POST";
        var Url = serviceURLs["Keywordsearch"];
        var key = $('#keyserachtext').val();

        var Data = '{"key": "' + key + '"}';


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
                console.log(eval(msg.KeywordsearchResult));
                var json = (msg.KeywordsearchResult);
                var dataSource = new kendo.data.DataSource({
                    data: eval(msg.KeywordsearchResult)

                });
                console.log(dataSource);

                $("#divFCSearchResults").kendoListView({
                    dataSource: dataSource,
                    selectable: "multiple",
                    template: kendo.template($("#templatesearchresults").html())

                });
              
            },
            error: ServiceFailed// When Service call fails
        });



    });
    //---------------------------------------------------------------------------------
    $("#btnFC1").click(function () {

        FCWindow.data("kendoWindow").open();
        LoadAllFiles();
    });

    $("#btnFCUpload").click(function () {
        FCUploadWindow.data("kendoWindow").open();
    });
    //---------------------------------------------------------------------------------

    ///////////////////////////////////////////////////////////////////////////////
    function LoadAllFiles() {
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
                GetFilesListSucceeded(msg);
                //alert("success");
            },
            error: ServiceFailed// When Service call fails
        });
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////
    function ServiceFailed(result) {
        alert('Service call failed: ' + result.status + '' + result.statusText);
        Type = null; Url = null; Data = null; ContentType = null; DataType = null; ProcessData = null;
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////        
var loadAllFilesResults;
    function GetFilesListSucceeded(result) {
        resultObject = eval(result.GetFilesListResult);

       


        for (var i = 0; i < category.length; i++) {
          

            for(var j=0;j<subcategory.length;j++)
            {
               

                var divtreename = "#tbl" + category[i].text + subcategory[j].text;


                loadtree(resultObject, divtreename, category[i].value, subcategory[j].value);
            }
        }
        //loadtree(resultObject, '#divFCSearchResults', 'AIR', 'REGULATIONS');
        

    }

    function loadtree(loadAllFilesResults, divtreename, category, subcategory) {


	  var json = JSLINQ(loadAllFilesResults)
           .Where(function (item) { return item.cateogory == category && item.subcategory == subcategory; });
	
	  console.log(json.items);
        $(divtreename).on('changed.jstree', function (e, data) {
           
          

          //  console.log(data);
            var i, j, r = [];
            for (i = 0, j = data.selected.length; i < j; i++) {
                r.push(data.instance.get_node(data.selected[i]).text);
            }

            var str = data.node.original.filepath;
            if (data.node.parent!= "#") {
                window.open(str, '_blank');
            }
           
        }).jstree({
            'core': {
                'data': (json.items)
            }


        });




    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////			   
    $('#btnUpload').click(function () {

        $('#divUpload').css("display", "block");
        $('#divFC1').css("display", "none");
    });
    ///////////////////////////////////////////////////////////////////////////////////	  
    $('#btnFileCabinet').click(function () {
        $('#divUpload').css("display", "none");
        $('#divFC1').css("display", "block");
    });
    ///////////////////////////////////////////////////////////////////////////////
    $('#imgCloseFC').click(function () {
        $('#divFC').css("display", "none");
    });
    $('#imgCloseW').click(function () {
        $('#divWeather').css("display", "none");
    });
    $('#imgCloseSO').click(function () {
        $('#divSelectObjects').css("display", "none");
    });
    ///////////////////////////////////////////////////////////////////////////////


    $('#btnRead').click(function () {
        var x = document.getElementById("uploadFiles");
        var file = x.files[0];
        var fileData = file;


        var dropdownlist = $("#category").data("kendoDropDownList");

        var dropdownsubcategory = $("#subcategory").data("kendoDropDownList");

        var category = $("#category").data("kendoDropDownList").value();

        var subcategory = $("#subcategory").data("kendoDropDownList").value();


        var Url = serviceURLs["uploadcustomfile"];

        var parent = $("#divcategorysubcategory").jstree().get_selected(true)[0].id;

        var textarea = $("#notestext").val();

        // alert(parent);

        $.ajax({
            url: Url,
            type: 'POST',
            data: fileData,
            cache: false,
            dataType: 'json',
            processData: false, // Don't process the files
            contentType: false, // Set content type to false as jQuery will tell the server its a query string request
            success: function (data) {
                UploadFileServiceSucceeded(data, file.name, category, subcategory, parent, "File",textarea);


            },
            error: function (result) {
                alert('Service call failed: ' + result.status + '' + result.statusText);
            }
        });

    });
   


    ////////////////////////////////////////////////////////////////////////////
    function UploadFileServiceSucceeded(result, fn, category, subcategory, parent, type,textarea) {

        resultObject = result.UploadCustomFileResult;


        var Url = serviceURLs["fixuploadfile"];
        // var Data = '{"type": "' + resultObject + '","fn":"' + fn + '"}';
        var Data = '{"type": "' + resultObject + '","fn":"' + fn + '","category":"' + category + '","subcategory":"' + subcategory + '","parent":"' + parent + '","textarea":"'+textarea+'"}';
        // alert(Data);
        var ContentType = "application/json; charset=utf-8";

        $.ajax({
            type: 'POST',
            url: Url,
            data: Data,
            contentType: ContentType,
            dataType: 'json',
            processdata: true,
            success: function (msg) {
                //GetFilesListSucceeded(msg);
                alert(msg.FixUploadedFileResult);
                oncategoryChange();
            },
            error: ServiceFailed// When Service call fails
        });


    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////

});