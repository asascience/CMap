
<?php


	date_default_timezone_set("UTC");
	$now =  date("H:i:s", time());
	//Get random numbers
	$randomValueRetail = floor(rand(5,30));
	$randomValueOnline = floor(rand(1,10));
	//Output


  
// Specify the start date. This date can be any English textual format  
$date_from = $_POST["mindate"];;   
$date_from = strtotime($date_from); // Convert date to a UNIX timestamp  
  
// Specify the end date. This date can be any English textual format  
$date_to = $_POST["maxdate"];  
$date_to = strtotime($date_to); // Convert date to a UNIX timestamp  
  
// Loop from the start date to end date and output all dates inbetween  

if($_POST["mindate"]!="")
{
	$valuearray=(dateRange( $_POST["mindate"],$_POST["maxdate"]) );
	$length=count($valuearray);

echo json_encode($valuearray);

//json_encode( dateRange( $_POST["mindate"], $_POST["maxdate"]) );
   

}else
{   
 
$valuearray=(dateRange('2014-01-01','2014-02-29') );
	$length=count($valuearray);

echo (rand(0,$length));

echo "&value=".$valuearray[(rand(0,$length))];
	
}
	




function dateRange( $first, $last, $step = '+1 day', $format = 'Y/m/d' ) {

	$dates = array();
	$current = strtotime( $first );
	$last = strtotime( $last );

	
 
	//return $values[];
	$search_array = array(
    '2014-01-01' => 100000,
    '2014-01-02' => 200000,
    '2014-01-03' => 300000,
    '2014-01-04' => 400000,
    '2014-01-05' => 450000,
	'2014-01-06' => 500000,
    '2014-01-07' => 600000,
    '2014-01-08' => 700000,
    '2014-01-09' => 800000,
    '2014-01-10' => 900000,
	
	 '2014-01-11' => 100000
  
	
	);
	while( $current <= $last ) {
		
		 $keysearch=date("Y-m-d",$current);
       
		$dates[] = date( $format, $current );
		
		
		
		  $keysearch=date("Y-m-d",$current);
		  //echo $keysearch;
      if (array_key_exists($keysearch,$search_array)) {
        $values[]= $search_array[$keysearch];
      }
	$current = strtotime( $step, $current );	
}

   
	return $values;	 
}

?>