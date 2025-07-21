import {Schema,model} from 'mongoose'

let contentSchema=new Schema({
    link:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:["document","video","audio","twitter"],
        required:true
    },
    title:{
        type:String,
        required:true
    },
    tag:{
        type:[{type:Schema.Types.ObjectId,reference:"Tag"}],
    },
    userId:{
        type:Schema.Types.ObjectId,
        reference:"User",
        required:true
    }
},{timestamps:true})

let Content=model("Content",contentSchema)

export default Content;