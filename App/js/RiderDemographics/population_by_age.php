<?php
    $username = "akumar34"; 
    $password = "password1";   
    $host = "bicyclerace6.mysql.uic.edu";
    $database="bicyclerace6";
    
    $server = mysql_connect($host, $username, $password);
    $connection = mysql_select_db($database, $server);

	$no_of_bins = 10;
	$intervals_query = 
		"SELECT MAX( YEAR(CURRENT_DATE)- birthday ), MIN( YEAR(CURRENT_DATE)- birthday ), (
		(MAX( YEAR(CURRENT_DATE)- birthday )) - 
		(MIN(YEAR(CURRENT_DATE) - birthday )) )/$no_of_bins AS INTRVL FROM trips_data WHERE gender != 'null' and birthday != 'null'";

    $query = mysql_query($intervals_query);
    if ( ! $query ) {
        echo mysql_error();
        die;
    }
	$intervals_data = mysql_fetch_assoc($query);

	$intervals = ceil($intervals_data['INTRVL']);	
	$sql = "SELECT AGE_INTERVAL, SUM(POPULATION) AS POPULATION FROM (";
	for($multiplier = 1; $multiplier < $no_of_bins + 3; $multiplier++){
		$lower = $intervals * ($multiplier-1);
		$higher = $intervals * ($multiplier) - 1;
		if($multiplier != ($no_of_bins+2)){
			$sql .= ("SELECT '" . ($lower) . " - " . ($higher) .
				"' AS AGE_INTERVAL, COUNT(*) POPULATION, (YEAR(CURRENT_DATE) - BIRTHDAY) AS AGE FROM trips_data 
					WHERE BIRTHDAY != 'null' GROUP BY AGE HAVING " . ($lower) . " <= AGE AND AGE <= " .($higher) . " UNION ");
		} else {
			$sql .= ("SELECT '" . ($lower) . " - " . ($higher) .
				"' AS AGE_INTERVAL, COUNT(*) POPULATION, (YEAR(CURRENT_DATE) - BIRTHDAY) AS AGE FROM trips_data 
					WHERE BIRTHDAY != 'null' GROUP BY AGE HAVING " . ($lower) . " <= AGE AND AGE <= " .($higher));
		}
	}
	$sql = $sql . ") TBL GROUP BY AGE_INTERVAL ";

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
