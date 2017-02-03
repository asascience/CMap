
  
function changeMAERTable(qs)
{
	if(qs=="TK-1671")
	{
	$('#tdMTlbs1').html("5.081 lbs/hr");
	$('#tdMTlbs2').html("0.01 lbs/hr");
	$('#tdMTtny1').html("2.55 TPY");
	$('#tdMTtny2').html("0.02 TPY");
	}
	else if(qs=="TK-1247")
	{
	$('#tdMTlbs1').html("5.08 lbs/hr");
	$('#tdMTlbs2').html("0.01 lbs/hr");
	$('#tdMTtny1').html("8.87 TPY");
	$('#tdMTtny2').html("0.01 TPY");
	}
	else if(qs=="TK-2041")
	{
	$('#tdMTlbs1').html("6.58 lbs/hr");
	$('#tdMTtny1').html("6.64 TPY");
	
	$('#trBenzene').css("display", "none");

	
	}
	else if(qs=="TK-1681")
	{
	$('#tdMTlbs1').html("190.4 lbs/hr");
	$('#tdMTlbs2').html("0.18 lbs/hr");
	$('#tdMTlbs3').html("0.59 lbs/hr");
	$('#tdMTtny1').html("161.75 TPY");
	$('#tdMTtny2').html("0.29 TPY");
	$('#tdMTtny3').html("0.03 TPY");
	
	$('#trH2SO4').css("display", "block");
	}
}
  function ChangeDesignTable(qs)
{
if(qs=="TK-1671")
{
$('#tdMaterials').html("Carbon Steel");
$('#tdDB').html("API 650");
$('#tdDimensions').html("D-120ft, H-40ft");
$('#tdCapacity').html("80,622 BBLs");
$('#tdService').html("Gasoline");
$('#tdCDate').html("APR 13 1977");
$('#tdMDate').html("N/A");
}
else if(qs=="TK-1247")
{
$('#tdMaterials').html("Carbon Steel");
$('#tdDB').html("API 650");
$('#tdDimensions').html("D-150ft, H-40ft");
$('#tdCapacity').html("125,972 BBLs");
$('#tdService').html("Crude Oil");
$('#tdCDate').html("SEP 15 1999");
$('#tdMDate').html("N/A");
}
else if(qs=="TK-2041")
{
$('#tdMaterials').html(" Carbon Steel");
$('#tdDB').html("API 650");
$('#tdDimensions').html("D-150ft, H-40ft");
$('#tdCapacity').html("125,897 BBLs");
$('#tdService').html("Fuel Oil No.2");
$('#tdCDate').html("APR 04 1963");
$('#tdMDate').html("MAY 16 2003");
}
else if(qs=="TK-1681")
{
$('#tdMaterials').html(" Carbon Steel");
$('#tdDB').html("API 650");
$('#tdDimensions').html("D-95ft, H-30ft");
$('#tdCapacity').html("37,897 BBLs");
$('#tdService').html("Clarified Slurry Oil");
$('#tdCDate').html("NOV 1983");
$('#tdMDate').html("N/A");
}
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


function showDesignMenu(show)
{
if (show==1){
document.getElementById('tblMainMenu').style.display='none';
document.getElementById('tblDesignMenu').style.display='block';}
else
{
document.getElementById('tblMainMenu').style.display='block';
document.getElementById('tblDesignMenu').style.display='none';
}
}
function showAirMenu(show)
{
if (show==1){
document.getElementById('tblMainMenu').style.display='none';
document.getElementById('tblAirMenu').style.display='block';
document.getElementById('tblAirRegulationsMenu').style.display='none';
document.getElementById('tblAirEmissionsMenu').style.display='none';
document.getElementById('tblAirPermitsMenu').style.display='none';
}
else{
document.getElementById('tblMainMenu').style.display='block';
document.getElementById('tblAirMenu').style.display='none';
}
}

function showAirProgramsMenu(show)
{
if (show==1){
document.getElementById('tblAirMenu').style.display='none';
document.getElementById('tblAirRegulationsMenu').style.display='block';
}
else{
document.getElementById('tblAirMenu').style.display='block';
document.getElementById('tblAirRegulationsMenu').style.display='none';
}
}
function showAirEmissionsMenu(show)
{
if (show==1){
document.getElementById('tblAirMenu').style.display='none';
document.getElementById('tblAirEmissionsMenu').style.display='block';
}
else{
document.getElementById('tblAirMenu').style.display='block';
document.getElementById('tblAirEmissionsMenu').style.display='none';
}
}
function showAirPermitsMenu(show){

if (show==1){

document.getElementById('tblAirMenu').style.display='none';
document.getElementById('tblAirPermitsMenu').style.display='block';


}
else{
document.getElementById('tblAirMenu').style.display='block';
document.getElementById('tblAirsPermitsMenu').style.display='none';
}
}