const momgoose=require('mongoose')

momgoose.connect(process.env.mongoConnectionString).then((res)=>{
console.log('connect to momgo')
}).catch((err)=>{

})