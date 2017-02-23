$(document).ready(function () {
    $("#btncreate").kendoButton({
        
    });

    $("#btnarchive").kendoButton({

    });

    $("#btndelete").kendoButton({

    });

    //
   // $('#dialog').css('z-index', '1000000');

    //$("#callConfirm").on("click", function (e) {
    //    e.preventDefault();
    //    $("#dialog").dialog("open");
    //});//
// create the instance

    var serviceURLs = window.serviceURLs;

 var winW = $(window).width();
 var FCWindow = $("#divFC");
 var FCUploadWindow = $("#divFCUpload");

 $('#airnotes').width(winW - 600);

    //$('#divFC1').width(winW - 480);

    $('#divFC1').css('width', winW - 440);

    $("#notesgridview").width(winW - 440);

    $("#divFCUpload").width(winW -400);
   //---------------------------------------------------------------------------------
   FCWindow.kendoWindow({
	    position: {
			top: 100, // or "100px"
			left: winW / 2 - $('#divDashBoard').width() / 2 +20
		  },
        width:winW-400,
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
			left: winW / 2 - $('#divDashBoard').width() / 2 +20
		  },
	    width: winW - 400,
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
    //$("#tabstrip").kendoTabStrip({
    //    animation: {
    //        open: {
    //            effects: "fadeIn"
    //        }
    //    }
    //});
    $("#tabstrip").kendoTabStrip({
        tabPosition: "left",
        animation: { open: { effects: "fadeIn" } }
    });

    $("#divFCUpload1").tabs();
    $("#customupload").tabs();

    LoadRecent20Files();
    GetArchivedFiles();
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
                 //alert("success");
            },
            error: ServiceFailed// When Service call fails
        });
        
    }

    function GetArchivedFiles()
    {
        var Type = "POST";
        var Url = serviceURLs["GetArchiveFiles"];
        var ContentType = "application/json; charset=utf-8";
        var DataType = "json";

        $.ajax({
            type: Type,
            url: Url,
            contentType: ContentType,
            dataType: DataType,
            processdata: true,
            success: function (msg) {
                GetArchiveFiles(msg);
                //alert("success");
            },
            error: ServiceFailed// When Service call fails
        });
    }

    function GetArchiveFiles(result) {

        var resultObject = eval(result.GetArchiveFilesResult);


        $("#divarchivefiles").kendoGrid({

            dataSource: {
                data: resultObject

            },
            filterable: true,
            dataBound: function () {
                this.expandRow(this.tbody.find("tr.k-master-row"));
            },

            dataBound: function () {
                // this.expandRow(this.tbody.find("tr.k-master-row").first());

            },

            columns: [{ field: "Cateogory", title: "Category", filterable: { multi: true, search: true, search: true } },
    { field: "SubCateogory", title: "Sub Cateogory", filterable: { multi: true, search: true, search: true } },

    { field: "filename", title: "File Name", template: '<a href="#=filepath#" target="_blank">#=filename#</a>', filterable: { multi: true, search: true, search: true } },


     { field: "upload_date", title: "Upload Date", template: "#= kendo.toString(kendo.parseDate(upload_date, 'yyyy-MM-dd'), 'MM/dd/yyyy') #" }, ]


        });
    }
    function LoadRecent20FilesSucceded(result)
    {
        
        var resultObject = eval(result.GetRecent20FilesResult);
        
        
        $("#divRecent20Files").kendoGrid({

            dataSource: {
                data: resultObject

            },
            filterable: true,
            dataBound: function () {
                this.expandRow(this.tbody.find("tr.k-master-row"));
            },
            
            dataBound: function () {
                // this.expandRow(this.tbody.find("tr.k-master-row").first());

            },

            columns: [{ field: "Cateogory", title: "Category", filterable: { multi: true, search: true, search: true } },
    { field: "SubCateogory", title: "Sub Cateogory", filterable: { multi: true, search: true, search: true } },

    { field: "filename", title: "File Name", template: '<a href="#=filepath#" target="_blank">#=filename#</a>', filterable: { multi: true, search: true, search: true } },
   

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

   
        var dropdownlist = $("#category").data("kendoDropDownList");

        var dropdownsubcategory = $("#subcategory").data("kendoDropDownList");

        var category = $("#category").data("kendoDropDownList").value();

        var subcategory = $("#subcategory").data("kendoDropDownList").value();

        resultObject = eval(result.GetFilesListResult);

      //  console.log(resultObject);


        var json = [];



        var json = JSLINQ(resultObject)
      .Where(function (item) { return item.cateogory == category && item.subcategory == subcategory; });

      
	

        //$("#divcategorysubcategory").jstree("destroy");
        //$('#divcategorysubcategory').jstree({
        //    "core": {
        //        'animation': 0,
        //        'strings': {
        //            new_node: 'The text you want', //this text will change the label when you create a new node
        //        },
        //        'data': (json.items),
        //        "check_callback": function (operation, node, parent, position, more) {
        //            //console.log(operation);

        //            console.log(more);
        //            alert(operation);
        //       console.log(operation);
        //            if (operation === "copy_node" || operation === "move_node") {
        //                if (parent.id === "#") {
        //                    return false; // prevent moving a child above or below the root
        //                }
        //            }
        //            if (operation === "delete_node1") {
        //                alert("Deleted1");

        //                var x = document.getElementById("uploadFiles");
        //                var file = x.files[0];
        //                var fileData = file;

        //                var dropdownlist = $("#category").data("kendoDropDownList");

        //                var dropdownsubcategory = $("#subcategory").data("kendoDropDownList");

        //                var category = $("#category").data("kendoDropDownList").value();

        //                var subcategory = $("#subcategory").data("kendoDropDownList").value();

        //                var Url = serviceURLs["Removenode"];

        //                var parent = $("#divcategorysubcategory").jstree().get_selected(true)[0].parent;
        //                var Data = '{"filename": "' + node.text + '"}';
        //                alert(Data);

        //                var Type = "POST";
        //                var Url = serviceURLs["Removenode"];
        //                var ContentType = "application/json; charset=utf-8";
        //                var DataType = "json";

        //                $.ajax({
        //                    type: Type,
        //                    url: Url,
        //                    data: Data,
        //                    contentType: ContentType,
        //                    dataType: DataType,
        //                    processdata: true,
        //                    success: function (data) {
        //                        //console.log(data);

        //                        alert("Sucessfully Deleted Node");

        //                    },
        //                    error: function (result) {
        //                        alert('Service call failed: ' + result.status + '' + result.statusText);
        //                    }
        //                });
        //            }

        //            if (operation === "rename_node") {
        //                var x = document.getElementById("uploadFiles");
        //                var file = x.files[0];
        //                var fileData = file;

        //                var dropdownlist = $("#category").data("kendoDropDownList");

        //                var dropdownsubcategory = $("#subcategory").data("kendoDropDownList");

        //                var category = $("#category").data("kendoDropDownList").value();

        //                var subcategory = $("#subcategory").data("kendoDropDownList").value();

        //                var Url = serviceURLs["uploadcustomfile"];

        //                var parent = $("#divcategorysubcategory").jstree().get_selected(true)[0].parent;

        //                // alert(parent);
        //                $.ajax({
        //                    url: Url,
        //                    type: 'POST',
        //                    data: fileData,
        //                    cache: false,
        //                    dataType: 'json',
        //                    processData: false, // Don't process the files
        //                    contentType: false, // Set content type to false as jQuery will tell the server its a query string request
        //                    success: function (data) {
        //                        UploadFileServiceSucceeded(data, node.text, category, subcategory, parent, "Folder");

        //                    },
        //                    error: function (result) {
        //                        alert('Service call failed: ' + result.status + '' + result.statusText);
        //                    }
        //                });

        //            }
        //            return true; // allow everything else
        //        }
        //    }
            
        //});


        //$('.vakata-context jstree-contextmenu jstree-default-contextmenu').css('left', '0px');


        //
       

        //
        $("#divcategorysubcategory").jstree("destroy");
        $("#divcategorysubcategory").jstree({
            'core': {
                'data': eval(json.items),
                'check_callback': true
            },
            
            'plugins': ["contextmenu"],
            'contextmenu': {
                'items': function ($node) {
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
            }
        });

                
        //$("#divcategorysubcategory").bind("loaded.jstree", function (event, data) {
        //    $('#divcategorysubcategory').jstree("open_node", "46");
        //});

        

    }
    function customMenu(node) {
        //debugger
        //Show a different label for renaming files and folders
        var tree = $('#divcategorysubcategory').jstree(true);
       
        
        var renameLabel;
        var deleteLabel;
        var folder = false;
      
            renameLabel = "Rename File";
            deleteLabel = "Delete File";
      
        var items = {
            "rename": {
                "label": renameLabel, //Different label (defined above) will be shown depending on node type
                "action": function (obj) { }
            },
            "delete": {
                "label": deleteLabel,
                "action": function (obj) {
                    tree.delete_node($(node));
                }
            }
        };
        alert(items);
        return items;
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

            //alert("success");

            console.log(msg.GetnotesResult);

            var json = (msg.GetnotesResult);


            var dataSource = new kendo.data.DataSource({
                data: eval(json)

            });

            console.log(dataSource);
           
          

            $("#notesgridview").kendoGrid({
                
                dataSource: {
                    data: eval(msg.GetnotesResult)

                },
                filterable: false,
                dataBound: function toggleScrollbar(e) {
                    var gridWrapper = e.sender.wrapper;
                    var gridDataTable = e.sender.table;
                    var gridDataArea = gridDataTable.closest(".k-grid-content");

                    gridWrapper.toggleClass("no-scrollbar", gridDataTable[0].offsetHeight < gridDataArea[0].offsetHeight);
                },

                dataBound: function () {
                    // this.expandRow(this.tbody.find("tr.k-master-row").first());

                },

               
                columns: [
              

                 { field: "filename", title: "File Name", template: '<a href="#=filepath#" target="_blank">#=filename#</a>' },
                 { field: "notes", title: "Notes", filterable: { multi: false, search: false, search: false } },

                 ]

            });
        },
        error: ServiceFailed// When Service call fails
    });

    $('#divFC1').click('tabsselect', function (event, ui) {
        var selectedTabm = $("#divFC1").tabs('option', 'active');
        //alert(selectedTabm);

        if (selectedTabm == "4" || selectedTabm == "5" || selectedTabm == "6")
        {
            
           

            document.getElementById("airnotes").style.display = "none";

        }else
        {
            document.getElementById("airnotes").style.display = "block";
        }
        
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

              
                var json = (msg.KeywordsearchResult);
                var dataSource = new kendo.data.DataSource({
                    data: eval(msg.KeywordsearchResult)

                });
                console.log(msg.KeywordsearchResult);

              

                //
                $("#divFCSearchResults").kendoGrid({

                    dataSource: {
                        data: eval(msg.KeywordsearchResult)

                    },
                    filterable: false,
                    dataBound: function () {
                        this.expandRow(this.tbody.find("tr.k-master-row"));
                    },

                    dataBound: function () {
                        // this.expandRow(this.tbody.find("tr.k-master-row").first());

                    },


                    columns: [{ field: "cateogory", title: "Category", filterable: { multi: true, search: true, search: true } },
  { field: "subcategory", title: "Sub Cateogory", filterable: { multi: true, search: true, search: true } },

  { field: "text", title: "File Name", template: '<a href="#=filepath#" target="_blank">#=text#</a>', filterable: { multi: true, search: true, search: true } },
   

   { field: "upload_date", title: "Upload Date", template: "#= kendo.toString(kendo.parseDate(upload_date, 'yyyy-MM-dd'), 'MM/dd/yyyy') #" }, ]
           

                });

                

                //
              
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

    $('#btnCreate').click(function () {
        //var x = document.getElementById("uploadFiles");
        //var file = x.files[0];
        //var fileData = file;

        //var dropdownlist = $("#category").data("kendoDropDownList");

        //var dropdownsubcategory = $("#subcategory").data("kendoDropDownList");

        var category = $("#category").data("kendoDropDownList").value();

        var subcategory = $("#subcategory").data("kendoDropDownList").value();

        //var Url = serviceURLs["uploadcustomfile"];

        var parent = $("#divcategorysubcategory").jstree().get_selected(true)[0].parent;

        //// alert(parent);
        //$.ajax({
        //    url: Url,
        //    type: 'POST',
        //    data: fileData,
        //    cache: false,
        //    dataType: 'json',
        //    processData: false, // Don't process the files
        //    contentType: false, // Set content type to false as jQuery will tell the server its a query string request
        //    success: function (data) {
        //        UploadFileServiceSucceeded(data, node.text, category, subcategory, parent, "Folder");

        //    },
        //    error: function (result) {
        //        alert('Service call failed: ' + result.status + '' + result.statusText);
        //    }
        //});


        //


        var filename = $('#txtfoldername').val();

        UploadFolder(filename, category, subcategory, parent)

    });
 
  

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



    $("#archivedialog").dialog({
        autoOpen: false,
        modal: true,

        buttons: {
            "Confirm": function () {

                $("#archivedialog").dialog("close");

                var category = $("#category").data("kendoDropDownList").value();

                var subcategory = $("#subcategory").data("kendoDropDownList").value();



                var text = $("#divcategorysubcategory").jstree().get_selected(true)[0].text;

                $("#archivefile").val(text);

                var parent = $("#divcategorysubcategory").jstree().get_selected(true)[0].parent;
                var Data = '{"filename": "' + text + '"}';
                //ert(Data);

                var Type = "POST";
                var Url = serviceURLs["Archivenode"];
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

                        //alert("Sucessfully Archived Node");




                    },
                    error: function (result) {
                        alert('Service call failed: ' + result.status + '' + result.statusText);
                    }
                });
            },
            "Cancel": function () {
                $(this).dialog("close");
            }
        }
    });

    $('#btnArchive').on("click", function (e) {
        e.preventDefault();
    
        $("#archivedialog").dialog("open");

        

    
    });

  
    //




    $("#dialog").dialog({
        autoOpen: false,
        modal: true,
      
        buttons: {
            "Confirm": function () {

                $("#dialog").dialog("close");
               
                var category = $("#category").data("kendoDropDownList").value();

                var subcategory = $("#subcategory").data("kendoDropDownList").value();



                var text = $("#divcategorysubcategory").jstree().get_selected(true)[0].text;

                $("#archivefile").val(text);

                var parent = $("#divcategorysubcategory").jstree().get_selected(true)[0].parent;
                var Data = '{"filename": "' + text + '"}';
                //ert(Data);

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

            },
            "Cancel": function () {
                $(this).dialog("close");
            }
        }
    });

    $('#btnRemove').on("click", function (e) {
        e.preventDefault();
    
            $("#dialog").dialog("open");

    
    });

   
    function UploadFolder(fn,category, subcategory, parent)
    {
        var Url = serviceURLs["FixUploadedFolder"];
        // var Data = '{"type": "' + resultObject + '","fn":"' + fn + '"}';
        var Data = '{"fn":"' + fn + '","category":"' + category + '","subcategory":"' + subcategory + '","parent":"' + parent + '"}';
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
                alert(msg.FixUploadedFolderResult);
                oncategoryChange();
            },
            error: ServiceFailed// When Service call fails
        });

    }

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