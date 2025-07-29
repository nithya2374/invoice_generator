const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
    name: {
       type:String,
       required:true,
    },

    email:{
        type:String,
        required:true,
        unique:true,
    },

    password: {
     type: String,
     required: function () {
        return !this.provider || this.provider === 'local';
       },
     },

    role:{
        type:String,
        enum:["user","admin"],
        default:"user",
    },

    businessName: {
       type: String,
       required:false,
     },

    contactNumber: {
       type: String,
       required:false,
    },

    country: {
      type: String,
      required:false,
    },

    isBlocked: {
         type: Boolean,
         default: false,
     },

     provider: {
       type: String,
       enum: ["local", "google"],
       default: "local"
    },
},{timestamps:true});

module.exports= mongoose.model("User",userschema);