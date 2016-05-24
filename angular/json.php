<?php

$valor = array(
    'valor 1' =>  1,
    'valor 2' =>  2,
    'valor 3' =>  3,
    'valor 4' =>  4,
    'valor 5' =>  5
    );

header('Content-Type: text/javascript');
echo 'angular.callbacks._0('. json_encode($valor) . ')';