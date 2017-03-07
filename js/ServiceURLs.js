
var serviceURLslocal = {
    fileslist: "http://tct.reservoirkb.com/CMapSVCtest/Service1.svc/GetFilesList",
    inspectionslist: "http://tct.reservoirkb.com/CMapSVCtest/Service1.svc/GetInspectionsList",
    inspectionshistory: "http://tct.reservoirkb.com/CMapSVCtest/Service1.svc/GetInspectionsHistory",
    uploadinspectionhistory: "http://tct.reservoirkb.com/CMapSVCtest/Service1.svc/uploadinspectionhistory",
    uploadcustomfile: "http://tct.reservoirkb.com/CMapSVCtest/Service1.svc/UploadCustomFile",
    fixuploadfile: "http://tct.reservoirkb.com/CMapSVCtest/Service1.svc/FixUploadedFile",
    FixUploadedFolder: "http://tct.reservoirkb.com/CMapSVCtest/Service1.svc/FixUploadedFolder",
    EventCalendar: "http://tct.reservoirkb.com/CMapSvcTest/Service1.svc/GetEvents",    
    LoadUnits: "http://tct.reservoirkb.com/CMapSvcTest/Service1.svc/GetUnitNames",
    UnitDetails: "http://tct.reservoirkb.com/CMapSvcTest/Service1.svc/GetUnitDetails",
    GetRecent20Files: "http://tct.reservoirkb.com/CMapSvcTest/Service1.svc/GetRecent20Files",
    GetAllEvents: "http://tct.reservoirkb.com/CMapSvcTest/Service1.svc/GetAllEvents",
    ScheduleNewEvent: "http://tct.reservoirkb.com/CMapSvcTest/Service1.svc/ScheduleNewEvent",
    GetEventsByType: "http://tct.reservoirkb.com/CMapSvcTest/Service1.svc/GetEventsByType",
    GetFilesListRelate: "http://tct.reservoirkb.com/CMapSvcTest/Service1.svc/GetFilesListRelate",
    RelateTank: "http://tct.reservoirkb.com/CMapSvcTest/Service1.svc/FixRelateFile",
    UNRelateTank: "http://tct.reservoirkb.com/CMapSvcTest/Service1.svc/BreakRelateFile",
    Keywordsearch: "http://tct.reservoirkb.com/CMapSvcTest/Service1.svc/Keywordsearch",
    Getnotes: "http://tct.reservoirkb.com/CMapSvcTest/Service1.svc/Getnotes",
  
    Removenode: "http://tct.reservoirkb.com/CMapSvcTest/Service1.svc/Removenotes",
    GetEventsByID: "http://tct.reservoirkb.com/CMapSvcTest/Service1.svc/GetEventsByID",
    Archivenode: "http://tct.reservoirkb.com/CMapSvcTest/Service1.svc/Archivenotes",
    GetArchiveFiles: "http://tct.reservoirkb.com/CMapSvcTest/Service1.svc/GetArchiveFiles",
    UpdateUnits: "http://tct.reservoirkb.com/CMapSvcTest/Service1.svc/UpdateUnit",
    SetEventReminder: "http://tct.reservoirkb.com/CMapSvcTest/Service1.svc/SetEventReminder",
    GetEventReminders: "http://tct.reservoirkb.com/CMapSvcTest/Service1.svc/GetEventReminders",
    GetTodaysEventReminders: "http://tct.reservoirkb.com/CMapSvcTest/Service1.svc/GetTodaysEventReminders",
    GetRecentDialyVolume: "http://tct.reservoirkb.com/CMapSvcTest/Service1.svc/GetRecentDialyVolume",
    GetRecentDialyVolumeThroughPut: "http://tct.reservoirkb.com/CMapSvcTest/Service1.svc/GetRecentDialyVolumeThroughPut",
    GetRecentMonthlyVolume: "http://tct.reservoirkb.com/CMapSvcTest/Service1.svc/GetRecentMonthlyVolume",
    GetRecentMonthlyVolumeThroughPut: "http://tct.reservoirkb.com/CMapSvcTest/Service1.svc/GetRecentMonthlyVolumeThroughPut",
    GetRecentYearlyVolume: "http://tct.reservoirkb.com/CMapSvcTest/Service1.svc/GetRecentYearlyVolume",
    GetRecentYearlyVolumeThroughPut: "http://tct.reservoirkb.com/CMapSvcTest/Service1.svc/GetRecentYearlyVolumeThroughPut"

    

};


	
var serviceURLsProd = {
    fileslist: "http://tct.reservoirkb.com/CMapSvc/Service1.svc/GetFilesList",
    inspectionslist: "http://tct.reservoirkb.com/CMapSvc/Service1.svc/GetInspectionsList",
    inspectionshistory: "http://tct.reservoirkb.com/CMapSvc/Service1.svc/GetInspectionsHistory",
    uploadinspectionhistory: "http://tct.reservoirkb.com/CMapSvc/Service1.svc/uploadinspectionhistory",
    uploadcustomfile: "http://tct.reservoirkb.com/CMapSvc/Service1.svc/UploadCustomFile",
    fixuploadfile: "http://tct.reservoirkb.com/CMapSvc/Service1.svc/FixUploadedFile",
    FixUploadedFolder: "http://tct.reservoirkb.com/CMapSVCtest/Service1.svc/FixUploadedFolder",
    EventCalendar: "http://tct.reservoirkb.com/CMapSvc/Service1.svc/GetEvents",
    LoadUnits: "http://tct.reservoirkb.com/CMapSvc/Service1.svc/GetUnitNames",
    UnitDetails: "http://tct.reservoirkb.com/CMapSvc/Service1.svc/GetUnitDetails",
    GetRecent20Files: "http://tct.reservoirkb.com/CMapSvc/Service1.svc/GetRecent20Files",
    GetAllEvents: "http://tct.reservoirkb.com/CMapSvc/Service1.svc/GetAllEvents",
    ScheduleNewEvent: "http://tct.reservoirkb.com/CMapSvc/Service1.svc/ScheduleNewEvent",
    GetEventsByType: "http://tct.reservoirkb.com/CMapSvc/Service1.svc/GetEventsByType",
    GetFilesListRelate: "http://tct.reservoirkb.com/CMapSvc/Service1.svc/GetFilesListRelate",
    RelateTank: "http://tct.reservoirkb.com/CMapSvc/Service1.svc/FixRelateFile",
    UNRelateTank: "http://tct.reservoirkb.com/CMapSvc/Service1.svc/BreakRelateFile",
    Keywordsearch: "http://tct.reservoirkb.com/CMapSvc/Service1.svc/Keywordsearch",
    Getnotes: "http://tct.reservoirkb.com/CMapSvc/Service1.svc/Getnotes",
    Getnotes: "http://tct.reservoirkb.com/CMapSvc/Service1.svc/Getnotes",
    Removenode: "http://tct.reservoirkb.com/CMapSvc/Service1.svc/Removenotes",
    GetEventsByID: "http://tct.reservoirkb.com/CMapSvc/Service1.svc/GetEventsByID",
    Archivenode: "http://tct.reservoirkb.com/CMapSvc/Service1.svc/Archivenotes",
    UpdateUnits: "http://tct.reservoirkb.com/CMapSvc/Service1.svc/UpdateUnit",
    SetEventReminder: "http://tct.reservoirkb.com/CMapSvc/Service1.svc/SetEventReminder",
    GetEventReminders: "http://tct.reservoirkb.com/CMapSvc/Service1.svc/GetEventReminders",
    GetTodaysEventReminders: "http://tct.reservoirkb.com/CMapSvc/Service1.svc/GetTodaysEventReminders",
    GetRecentDialyVolume: "http://tct.reservoirkb.com/CMapSvc/Service1.svc/GetRecentDialyVolume",
    GetRecentDialyVolumeThroughPut: "http://tct.reservoirkb.com/CMapSvc/Service1.svc/GetRecentDialyVolumeThroughPut",
    GetRecentMonthlyVolume: "http://tct.reservoirkb.com/CMapSvc/Service1.svc/GetRecentMonthlyVolume",
    GetRecentMonthlyVolumeThroughPut: "http://tct.reservoirkb.com/CMapSvc/Service1.svc/GetRecentMonthlyVolumeThroughPut",
    GetRecentYearlyVolume: "http://tct.reservoirkb.com/CMapSvc/Service1.svc/GetRecentYearlyVolume",
    GetRecentYearlyVolumeThroughPut: "http://tct.reservoirkb.com/CMapSvc/Service1.svc/GetRecentYearlyVolumeThroughPut"
  

};
 
 
        window.serviceURLs = serviceURLslocal;
	   //window.serviceURLs = serviceURLsProd;