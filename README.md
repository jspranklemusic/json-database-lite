# local-json-database
A small, simple database that is locally stored in a JSON file. 

## Usage
Here is how to get started with your project.

### Importing
To use this in your project, import the module with `const LocalJSONDatabase = require('local-json-database');`, 
and create a new object with `const database = new LocalJSONDatabase();`. If it hasn't been created already, it will initialize a new database.json file 
in your root project folder. This action will load the database into your server's memory and allow for direct access without closing the file. 

### Methods
Since the database is a JSON file, most of the operations (searching, deletion, etc.) can be done natively with Node.js. However, there are a couple of built-in methods for accessing data. 

`database.database.key = "value";` - This modifies the database, but doesn't save the value to the file. 

`database.write();` - This line must be called after each modification to save the changes to the database.json file. 
