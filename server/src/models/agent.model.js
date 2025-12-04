import mongoose , { Schema } from "mongoose";

const agentSchema = new Schema({

    name : {
        type : String,
        required : true,
        trim : true
    },
    phone : {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[0-9]{10}$/.test(v);
        },
        message: "Phone number must be 10 digits",
      },
    },
    address : {
        type : String,  
        trim : true
        
    }
},{timestamps:true});


export const Agent = mongoose.model("Agent",agentSchema);