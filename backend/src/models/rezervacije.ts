import mongoose from 'mongoose'

const Schema=mongoose.Schema

let Rezervacija=new Schema({
    username:{type:String},
    id:{type:Number},
    idknjige:{type:Number},
    stanje:{type:String}
})

export default mongoose.model('RezervacijaModel',Rezervacija,'rezervacije')