These scripts all run on node js by simply typing

node ./file.js

The ordering of creating your own search demo schema is as follows.
  Create free version of Typesense cloud for easy setup
  Create and run createSchema.js
  Create and run seed.js or load docs into firestore/mongoDB
  Run a search query ie: typesense-raw-data.js
