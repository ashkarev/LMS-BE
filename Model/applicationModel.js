// const { default: mongoose } = require('mongoose')
const mongoose=require('mongoose')
// import mongoose



// schema create

const applicationSchema=mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
      phone:{
        type:Number,
        required:true
    },
      email:{
        type:String,
        required:true
    }, 
     resume:{
        type:String,
        required:true
    },
     jobId:{
        type:String,
        required:true
    },
     jobTitle:{
        type:String,
        required:true
    },
})

//model

const applicationModel=mongoose.model('applications',applicationSchema)

module.exports=applicationModel