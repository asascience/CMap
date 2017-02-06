﻿ var map, compare, compare2;

      require([
        "esri/map",
		'esri/tasks/query',
		"esri/dijit/Scalebar",
		"esri/dijit/BasemapGallery",
		"esri/arcgis/utils",
		"esri/dijit/HomeButton",
        "esri/InfoTemplate",
        "esri/layers/FeatureLayer",
		"esri/layers/ArcGISDynamicMapServiceLayer",
        "esri/renderers/SimpleRenderer",
		 "esri/renderers/UniqueValueRenderer",
        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/SimpleLineSymbol",
		"esri/lang",
		"esri/graphic",
        "dojo/dom",
        "dojo/number",
        "dojo/on",
        "dojo/parser",
        "esri/Color",
		 "dijit/TooltipDialog",
		  "dojo/dom-style",
		 "dijit/popup",
        "dijit/layout/BorderContainer",
        "dijit/layout/ContentPane",
		"dijit/TitlePane",
        "dojox/layout/ExpandoPane",
        "dojo/domReady!"
      ],
        function (
          Map,Query,Scalebar, BasemapGallery, arcgisUtils,HomeButton,InfoTemplate, FeatureLayer, ArcGISDynamicMapServiceLayer,SimpleRenderer, UniqueValueRenderer,SimpleFillSymbol,
          SimpleLineSymbol,esriLang,Graphic, dom, number, on, parser, Color,TooltipDialog,domStyle,dijitPopup
      ) {

          parser.parse();

          map = new Map("mapDiv", {
            basemap: "hybrid",
            center: [-95.018, 29.736],
            zoom: 17,
			showLabels : true,
			logo:false,
			showAttribution:false
          });
		   var scalebar = new Scalebar({
          map: map,
          // "dual" displays both miles and kilometers
          // "english" is the default, which displays miles
          // use "metric" for kilometers
          scalebarUnit: "dual"
        });
		  
		   var basemapGallery = new BasemapGallery({
        showArcGISBasemaps: true,
        map: map
      }, "basemapGallery");
      basemapGallery.startup();
      
      basemapGallery.on("error", function(msg) {
        console.log("basemap gallery error:  ", msg);
      });
	 
		  
		var home = new HomeButton({
        map: map
      }, "HomeButton");
      home.startup();

  
          var infoTemplate = new InfoTemplate();
          infoTemplate.setTitle("Tank: ${Tank_Id}");
		//  var url="<iframe frameborder=0 width=200 height=240 src='mapmenu/cmapmenu.html?tank="+${Tank_Id}"+'></iframe>"
		  //alert(url);
          infoTemplate.setContent("<iframe frameborder=0 width=260 height=240 src='mapmenu/cmapmenu.html?tank=${Tank_Id}'></iframe>");

         // var counties = new FeatureLayer("http://services.arcgis.com/KJtLkYnwGzQ5MdJW/arcgis/rest/services/SPCC/FeatureServer/0", {
		 var counties = new FeatureLayer("http://services.arcgis.com/KJtLkYnwGzQ5MdJW/arcgis/rest/services/Tanks/FeatureServer/0",{            
            infoTemplate: infoTemplate,
            outFields: [
              "*"
            ]
          });
var highlightSymbol = new SimpleFillSymbol(
          SimpleFillSymbol.STYLE_SOLID,
          new SimpleLineSymbol(
            SimpleLineSymbol.STYLE_SOLID,
            new Color([108,194,223]), 3
          ),
          new Color([125,125,125,0.35])
        );
        
var dialog = new TooltipDialog({
          id: "tooltipDialog",
          style: "position: absolute; width: 250px; font: normal normal normal 10pt Helvetica;z-index:100"
        });
        dialog.startup();
		
		map.on("load", function(){
          map.graphics.enableMouseEvents();
          map.graphics.on("mouse-out", closeDialog);

        });
		function closeDialog() {
          map.graphics.clear();
          dijitPopup.close(dialog);
        }
		
		
		 counties.on("mouse-over", function(evt){
          var t =  "<b>Tank Id: </b>${Tank_Id}<br><b>Status: </b>${Inspection}<br>";
           

          var content = esriLang.substitute(evt.graphic.attributes,t);
          var highlightGraphic = new Graphic(evt.graphic.geometry,highlightSymbol);
          map.graphics.add(highlightGraphic);

          dialog.setContent(content);

          domStyle.set(dialog.domNode, "opacity", 0.85);
          dijitPopup.open({
            popup: dialog,
            x: evt.pageX,
            y: evt.pageY
          });
        });
		
          //apply a renderer
          var symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
            new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
              new Color([255, 255, 255, 0.35]), 1),
            new Color([109, 146, 155, 0.35]));
       //   counties.setRenderer(new SimpleRenderer(symbol));

          map.addLayer(counties);
          
		
			 
			  var dynamicMapServiceLayer = new ArcGISDynamicMapServiceLayer("http://utility.arcgis.com/usrsvcs/servers/dcb75875884c4266acd3491f0eb14d4e/rest/services/LiveFeeds/NOAA_METAR_current_wind_speed_direction/MapServer", {
          "opacity" : 0.5
          
        });
		 map.addLayer(dynamicMapServiceLayer);
	
		  
		//  $("#btncompliance").click(function(){
			$('#chkSComp').change(function() {
				var layers = map.getLayersVisibleAtScale(map.getScale());
			var flayer=map.getLayer(layers[3].id);	
			var renderer = new UniqueValueRenderer(defaultSymbol, "Inspection");
			renderer.addValue("Pending", new esri.symbol.SimpleFillSymbol().setColor(new dojo.Color([255, 165, 0, 0.5])));
			renderer.addValue("Completed", new esri.symbol.SimpleFillSymbol().setColor(new dojo.Color([0, 255, 0, 0.5])));
			renderer.addValue("Safety Issues", new esri.symbol.SimpleFillSymbol().setColor(new dojo.Color([255, 0, 0, 0.5])));
				renderer.addValue("Not In Use", new esri.symbol.SimpleFillSymbol().setColor(new dojo.Color([192, 192, 192, 0.5])));
        if($(this).is(":checked")) {
			var query = new esri.tasks.Query(); 
			var defaultSymbol = new esri.symbol.SimpleFillSymbol().setStyle(esri.symbol.SimpleFillSymbol.STYLE_NULL);
			defaultSymbol.outline.setStyle(esri.symbol.SimpleLineSymbol.STYLE_NULL);
	
			flayer.setRenderer(renderer);
			flayer.refresh();
		}
		else{	
		flayer.clear();
  var symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
            new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
              new Color([108, 194, 223,0.9]), 1),
            new Color([108, 194, 223,0.9]));
         flayer.setRenderer(new SimpleRenderer(symbol));		
			flayer.refresh();
		}
   
    });
		  
		  
        });