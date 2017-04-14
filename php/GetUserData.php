<?php
session_start();
if( isset($_SESSION['id']) ){
    $responseText['id'] = $_SESSION['id'];
    $responseText['name'] = $_SESSION['name'];
    $responseText['account'] = $_SESSION['account'];
    $responseText['img'] = $_SESSION['img'];
    echo json_encode($responseText);
}
?>
