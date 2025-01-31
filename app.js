const express=require('express');//1st
const exhbs=require('express-handlebars');//2nd
const app=express()//3rd
const dbo=require('./db')//4th
const bodyParser = require('body-parser');//html to app.js receiving
const empmodel=require('./models/empModel')
dbo.getDatabase();//5th
//configure Handlebars//6th
//first hbs is engine name
app.engine('hbs',exhbs.engine({
    layoutsDir:'viewsfold/',
    defaultLayout:'main',
    extname:'hbs',
    runtimeOptions:{
        allowProtoPropertiesByDefault:true,
        allowProtoMethodsByDefault:true
    } 
}));

app.set('view engine','hbs')
app.set('views','viewsfold');
app.use(bodyParser.urlencoded({extended:true}));
//Routes
app.get('/',async(req,res)=>{

let datas=await empmodel.find({})
let msg='';
let empid,edit_emp;
if(req.query.status==='1'){
    msg='Inserted Successfully';
} 
if(req.query.status==='2'){
    msg="Updated Successfully"
 }
 if(req.query.status==='3'){
    msg="Deleted Successfully"
 }
if(req.query.edit_idd){
    empid= req.query.edit_idd
    //edit_emp = await collection.findOne({_id: new objid(edit_id)})
     edit_emp=await empmodel.findOne({_id:empid})
    }
    if(req.query.delete_idd){
         delete_id = req.query.delete_idd
        console.log('Delete request for _id:', delete_id);
      await empmodel.deleteOne({_id:delete_id})
        res.redirect('/?status=3');
      }
res.render('main',{msg,datas,empid,edit_emp});//going to html
});

//call back function 
app.post('/empinfo',async(req,res)=>{
    const employee={empid:req.body.eid,empname:req.body.ename};
    const newempDoc=new empmodel(employee)//for save inserted data
    await newempDoc.save()
    res.redirect('/?status=1');
});
app.post('/updateinfo/:e_id',async(req,res)=>{
    const employee={empid:req.body.eid,empname:req.body.ename};
    let ed_idd=req.params.e_id
    await empmodel.findOneAndUpdate({_id:ed_idd},employee)
    res.redirect('/?status=2');
})

app.listen(3000,()=>{
    console.log('Listening on port 3000.....');
});