#!/bin/bash
 
#tenho que mudar o if
if ["$(id -u)" -eq "0"];
then
 	echo 'Executando como root.'
else
	echo 'Necessario executar como root.'
	exit
fi

apt update
apt install nginx

