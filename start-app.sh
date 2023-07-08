#!/bin/bash

cd server
npx nodemon server &

cd ../client
npm start
