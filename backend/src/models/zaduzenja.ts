import mongoose from 'mongoose'

const Schema=mongoose.Schema

let Zaduzenje=new Schema({
    datumod:{type:Date},
    datumdo:{type:Date},
    idknjige:{type:Number},
    aktivan:{type:Boolean},
    produzio:{type:Boolean},
    broj:{type:Number},
    username:{type:String}
})

export default mongoose.model('ZaduzenjeModel',Zaduzenje,'zaduzenja')