let database;
const mongse = require('mongoose');
async function getDatabase(){
    mongse.connect('mongodb://127.0.0.1:27017/t3')
    .then(()=>{
        console.log("db connected.......")

})
.catch(()=>{
    console.log("db err.....")
})
}
module.exports={ getDatabase};