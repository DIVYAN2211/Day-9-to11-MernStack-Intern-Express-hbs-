//model class creation 
//schema -what are the variable and type of data assigning process
const mongose=require('mongoose')
const empSchema=new mongose.Schema({
    empid:Number,
    empname:String
})
//class or Model Creation
const empmdl=mongose.model('empmodel11',empSchema)
module.exports=empmdl