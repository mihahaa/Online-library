import mongoose from 'mongoose'

const Schema=mongoose.Schema

let Komentar=new Schema({
    username:{type:String},
    tekst:{type:String},
    ocena:{type:Number},
    izmenjen:{type:Boolean},
    idknjige:{type:Number},
    datum:{type:Date}
})

export default mongoose.model('KomentarModel',Komentar,'komentari')