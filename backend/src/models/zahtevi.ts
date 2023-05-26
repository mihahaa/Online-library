import mongoose from 'mongoose'

const Schema=mongoose.Schema

let Zahtev=new Schema({
    username:{type:String},
    spreman:{type:Boolean},
    idknjige:{type:Number}
})

export default mongoose.model('ZahtevModel',Zahtev,'zahtevi')