#!/bin/sh
source ~/.kffp_config

TIMESTAMP=$(date +%F-%H%M)
BACKUP_NAME=$DB_NAME-$TIMESTAMP.gz

mkdir -p ~/tmp
cd ~/tmp

ssh -i ~/.ssh/$KEY_NAME $MONGO_IP -T << EOF
# Create backup
$MONGODUMP_PATH --archive=$BACKUP_NAME --gzip --db $DB_NAME --username $USER_NAME --password $PASS --authenticationDatabase $AUTH_DB
# bail
  exit
EOF
# Pause to let Mongo finish the operation
sleep 30
# copy to local machine
scp -i ~/.ssh/$KEY_NAME $MONGO_IP:~/$BACKUP_NAME ~/tmp

# delete the backup from the remote server
ssh -i ~/.ssh/$KEY_NAME $MONGO_IP -T << EOF
  rm $BACKUP_NAME
# bail
  exit
EOF

# import the DB to local
mongo $DB_NAME --eval "db.dropDatabase()"
cd ~/tmp
mongorestore --gzip --archive=$BACKUP_NAME --db $DB_NAME
