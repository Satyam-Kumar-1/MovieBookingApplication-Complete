require('./config');
const Models=require('./RegistrationSchema');
const insert=async ()=>{
    let data=await Models.insertMany(
     [
         {name:'Satyam',price:20001008052},
         {name:'Sonu',RollNo:20001008058},
         {name:'Jay',RollNo:20001008078},
         {name:'Vitasta Raina',RollNo:20001008068},
         {name:'Krishna',RollNo:20001008031}
     ]
    );
    console.log(data);
 }
 insert();