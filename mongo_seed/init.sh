#!/bin/sh
mongoimport --uri "mongodb://mongo_db:27017/develop?ssl=true" --collection plans --type json --file /plansdata.json --jsonArray