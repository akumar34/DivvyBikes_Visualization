<?php
    $username = "akumar34"; 
    $password = "password1";   
    $host = "bicyclerace6.mysql.uic.edu";
    $database="bicyclerace6";
    
    $server = mysql_connect($host, $username, $password);
    $connection = mysql_select_db($database, $server);

    $sql = 
	"select
	i.STATION_ID AS STATION_ID,
	i.STATION AS STATION,
	(
		select case 
			when 
				(
					TIME(STR_TO_DATE(i.TIME_INTERVAL,'%H:%i')) 
						>= TIME(STR_TO_DATE('0:00','%H:%i')) AND
					TIME(STR_TO_DATE(i.TIME_INTERVAL,'%H:%i')) 
						< TIME(STR_TO_DATE('5:00','%H:%i'))
				)
			then 'Pre-Breakfast'
	
			when 
				(
					TIME(STR_TO_DATE(i.TIME_INTERVAL,'%H:%i')) 
						>= TIME(STR_TO_DATE('5:00','%H:%i')) AND
					TIME(STR_TO_DATE(i.TIME_INTERVAL,'%H:%i')) 
						< TIME(STR_TO_DATE('11:00','%H:%i'))
				)
			then 'Breakfast'
	
	   	when 
				(
					TIME(STR_TO_DATE(i.TIME_INTERVAL,'%H:%i')) 
						>= TIME(STR_TO_DATE('11:00','%H:%i')) AND
					TIME(STR_TO_DATE(i.TIME_INTERVAL,'%H:%i')) 
						< TIME(STR_TO_DATE('15:00','%H:%i'))
				)
			then 'Lunch'
	
	   	when 
				(
					TIME(STR_TO_DATE(i.TIME_INTERVAL,'%H:%i')) 
						>= TIME(STR_TO_DATE('15:00','%H:%i')) AND
					TIME(STR_TO_DATE(i.TIME_INTERVAL,'%H:%i')) 
						< TIME(STR_TO_DATE('17:00','%H:%i'))
				)
			then 'Pre-Dinner'		
	
	   	when 
				(
					TIME(STR_TO_DATE(i.TIME_INTERVAL,'%H:%i')) 
						>= TIME(STR_TO_DATE('17:00','%H:%i')) AND
					TIME(STR_TO_DATE(i.TIME_INTERVAL,'%H:%i')) 
						< TIME(STR_TO_DATE('22:00','%H:%i'))
				)
			then 'Dinner'	
			
	   	when 
				(
					TIME(STR_TO_DATE(i.TIME_INTERVAL,'%H:%i')) 
						>= TIME(STR_TO_DATE('22:00','%H:%i')) AND
					TIME(STR_TO_DATE(i.TIME_INTERVAL,'%H:%i')) 
						< TIME(STR_TO_DATE('23:59','%H:%i'))
				)
			then 'Post-Dinner'	
		end	
	) AS TIME_INTERVAL,
	abs(o.TOTAL - i.TOTAL) AS DIFF
	from
	inbound_stations i,
	outbound_stations o
	where i.STATION_ID = o.STATION_ID
	AND i.TIME_INTERVAL = o.TIME_INTERVAL
	AND i.STATION = o.STATION";
	
	$sql_query = mysql_query($sql);

    if ( ! $sql_query ) {
        echo mysql_error();
        die;
    }
   
    $sql_data = array();
    for ($x = 0; $x < mysql_num_rows($sql_query); $x++) {
        $sql_data[] = mysql_fetch_assoc($sql_query);
    }
    echo json_encode($sql_data);     
    mysql_close($server);
?>
