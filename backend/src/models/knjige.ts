import mongoose from 'mongoose'

const Schema=mongoose.Schema

let Knjiga=new Schema({
    autori:{type:String},
    godina:{type:String},
    id:{type:Number},
    zanrovi:{type:String},
    slika:{type:String},
    naziv:{type:String},
    izdavac:{type:String},
    jezik:{type:String},
    status:{type:String},
    stanje:{type:Number},
    ocena:{type:Number},
    zaduzena:{type:Number},
    popularnost:{type:Number},
    ubacena:{type:Boolean},
    ko:{type:String}
})

export default mongoose.model('KnjigaModel',Knjiga,'knjige')