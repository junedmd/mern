import { Schema, model } from 'mongoose';
const strapiSchema = new Schema({

    name:{
        type:String,
       
    },
    email:{
        type:String,
        unique:true,
    },
    mobile:{
        type:Number,
        unique:true,
      
    },
    birthday:{
        type:Date,
       
    },
    
    
},{
    timestamps:true,
});

const Strapi = model('users',strapiSchema);
export default Strapi ;