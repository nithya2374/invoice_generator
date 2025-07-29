const mongoose = require("mongoose");
const invoiceSchema = new mongoose.Schema(
    {
        user:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"User",
          required:true,
        },

        clientName:{
            type:String,
            required:true,
        },

        Items:[
          {
            description:String,
            quantity:Number,
            price:Number,
          },
        ],

        totalAmount:{
            type:Number,
            required:true,
        },

        ispaid:{
            type:Boolean,
            default:false,
        },

        status:{
          type:String,
          required:true,
          enum: ["paid", "unpaid"],
          default: "unpaid",
        },
        
        createdAt: {
         type: Date,
         default: Date.now,
         },
        },
);

module.exports = mongoose.model("Invoice",invoiceSchema);