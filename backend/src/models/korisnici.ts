import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'

const Schema=mongoose.Schema

let Korisnik=new Schema({
    id:{type:Number},
    ime:{type:String},
    prezime:{type:String},
    username:{type:String},
    lozinka:{type:String},
    tip:{type:String},
    adresa:{type:String},
    email:{type:String},
    slika:{type:String},
    status:{type:String},
    telefon:{type:String},
    zaduzeno:{type:Number}
})

export default mongoose.model('KorisnikModel',Korisnik,'korisnici')