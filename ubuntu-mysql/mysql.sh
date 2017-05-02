#!/bin/bash
export DEBIAN_FRONTEND=noninteractive
apt-get -q -y install mysql-server
echo "Give mysql server time to start up before we try to set a password..."
sleep 5
mysql -uroot -e <<EOSQL "UPDATE mysql.user SET Password=PASSWORD('root') WHERE User='root'; FLUSH PRIVILEGES;"
EOSQL
echo "Done setting mysql password."