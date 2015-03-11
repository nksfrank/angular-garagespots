<?php

$spots = 8;

$response = [];

for($i = 0; $i < $spots; $i++) {
    $occupied = rand(0,99);
    $data = null;
    if($occupied < 60) {
        $data["IsAvailable"] = true;
        $data["Status"] = "LEDIG";
        $data["CssClass"] = "green";
    }else {
        $data["IsAvailable"] = false;
        $data["Status"] = "UPPTAGEN";
        $data["CssClass"] = "red";
    }
    $response[] = $data;
}

echo json_encode($response);
?>