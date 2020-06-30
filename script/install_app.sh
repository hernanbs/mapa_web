#!/bin/bash

if [ `id -u` -eq 0 ];
then
 	echo 'Executando como root.'
else
	echo 'Necessario executar como root.'
	exit
fi

apt update
apt install -y nginx
PATH=$(pwd)/../app
echo $PATH
cp $PATH/* /var/www/html/
