# json-database-lite
A small, simple database that is locally stored in a JSON file. 

## Usage
Here is how to get started with your project.


### Importing
To use this in your project, import the module with `const JSONDatabaseLite = require('json-database-lite');`, 
and create a new object with `const database = new JSONDatabaseLite();`. If it hasn't been created already, it will initialize a new database.json file 
in your root project folder. This action will load the database into your server's memory and allow for direct access without closing the file. 

### Methods
Since the database is a JSON file, most of the operations (searching, deletion, etc.) can be done natively with Node.js. However, there are a couple of built-in methods for accessing data. 

#### Modifying directly
`database.database.key = "value";` - This modifies the database, but doesn't save the value to the file. 

#### Saving
`database.write();` - This line must be called after each modification in order to save the changes to the database.json file. 

#### Appending with a unique ID
`database.append(data, position)` - This creates a unique key and sets it to the value provided in `data`. If an optional `position` argument is provided, the database will append the value at the point of insertion, even if the key does not exist or if the point is deeply nested. Otherwise, the value will be appended at the root.

  An example of calling this function would be `database.append("My value", "point.nested.mydata")` and would produce a result of `database.point.nexted.mydata[UNIQUELYGENERATEDID]:"My value"`.
  
#### Finding multiple values
`database.find(keyArg, valueArg)` - This will perform a search across the entire database for nested objects that match the key-value pair. The results will be returned either as an array if the objects are found, or `null` if no objects are found.

#### Finding one value
`database.findOne(keyArg, valueArg)` - This will perform a search across the entire database for one nested object that matches the key-value pair. The results will be returned either as the object itself, or `null` if no objects are found.

#### Deleting a value
`database.deleteObj(keyArg, valueArg)` - This will perform a search for the key-value pair, and delete the object if a match is found. This will return the object, or `null`.
