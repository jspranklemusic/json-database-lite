const fs = require('fs');

class JSONdatabase{
    constructor(){
        //creates a database if it doesn't exist.
        if(!fs.existsSync('./database.json')){
            fs.writeFileSync('./database.json','{}');
        }
        this.database = JSON.parse( fs.readFileSync('./database.json','utf8') );
    }
    //saves the DB
    write(){
        fs.writeFile('./database.json',JSON.stringify(this.database),err=>{
            if(err) console.log(err);
        })
    }
    //generates timestamp + random ID
    generateID(){
        return Date.now() + "-" + Math.floor(Math.random()*10000000)
    }

    //appends a new object with a special ID
    append(data = null, position = null){
        if(position){
            //accepts a string with the nesting of the elements you want to change, ie. position = "position.nested.myelements"
            let layers = position.split(".")
            let temp = this.database;
            for(let i = 0; i < layers.length; i++){
                if(!temp[layers[i]]) temp[layers[i]] = {}
                temp = temp[layers[i]]
            }
            temp[this.generateID()] = data;
            console.log(temp)
        }else{
            this.database[this.generateID()] = data;
        }
        this.write();
    }

    
    //returns an array of objects which match the key and value pair, else null
    find(keyArg, valueArg){
        let foundObjArr = null
        function searchTree(obj){
            for(let key in obj){
                //checks if object instead of array
                if(key === keyArg && obj[key] === valueArg){
                    if(!foundObjArr){
                        foundObjArr=[]
                        foundObjArr.push(obj);
                    }else{
                        foundObjArr.push(obj)
                    }
                }
                if(typeof obj[key] === "object" && obj[key].length === undefined){
                    searchTree(obj[key])
                }
            }
        }
        searchTree(this.database);
        return foundObjArr;
    }

    //returns a single object which matches the key value pair, else null
    findOne(keyArg, valueArg){
        let foundObjArr = null
        function searchTree(obj){
            for(let key in obj){
                //checks if object instead of array
                if(key === keyArg && obj[key] === valueArg){
                    return foundObjArr = obj;
                } else if(typeof obj[key] === "object" && obj[key].length === undefined){
                    searchTree(obj[key])
                }
                
            }
        }
        searchTree(this.database);
        return foundObjArr;
    }

    //deletes one object with matches a key-value pair
    deleteObj(keyArg, valueArg){
        let moddedObj = null
        function searchTree(obj){
            for(let key in obj){
                //checks if object instead of array
                if(key === keyArg && obj[key] === valueArg){
                     delete obj[key];
                     return moddedObj = obj
                }else if(typeof obj[key] === "object" && obj[key].length === undefined){
                    searchTree(obj[key])
                }
                
            }
        }
        searchTree(this.database);
        return moddedObj;
    }

    
}

module.exports = JSONdatabase;

