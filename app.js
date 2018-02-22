const express = require('express')
const cors = require("cors");
const app = express()
app.use(cors());

var port = process.env.PORT || 3000;


// clean up students csv
var students = require("./students.js")



var studentsarray = students.students.split("\n")
var studentsdata = []
var keys = studentsarray[0].split(",")

for (let i = 1; i <studentsarray.length; i++) {
    let roomarray = studentsarray[i].split(",")
    let roomdic={}
    roomarray.forEach((value, j) => {
        roomdic[keys[j]] = value
    });
    studentsdata.push(roomdic)
}




function findById(data, id){
    for (let i = 0; i < data.length; i++){
        if (data[i].ID == id){
            return data[i];
        }
    }
    return null;
}


app.get('/', (req, res) => {
    res.json({data: studentsarray});
    })



app.get("/:id", function (req, res) {
    var record = findById(studentsdata, req.params.id);
    if (!record){
        res.status = 404;
        res.json({
            error: {
                message: "No record found!"
            }
        });
    }

    res.json({data: record});
});


app.listen(port, () => console.log('Example app listening on port '+ port))
