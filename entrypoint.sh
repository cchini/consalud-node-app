#!/bin/bash

if [ "$NODE_ENV" = "production" ]; then
    npm run build
	nohup npm run start
else
	npm run dev
fi