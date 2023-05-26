import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import korisnikRouter from './routers/korisnici.routes';
import knjigaRouter from './routers/knjige.routes';
import zahtevRouter from './routers/zahtevi.routes';
import zaduzenjeRouter from './routers/zaduzenja.routes';
import komentarRouter from './routers/komentari.routes';
import rezervacijaRouter from './routers/rezervacije.routes';

const app = express();
app.use(cors())
app.use(express.json())


mongoose.connect('mongodb://localhost:27017/projekat')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('db connected')
})

const router = express.Router();
router.use('/korisnik', korisnikRouter)
router.use('/knjiga', knjigaRouter)
router.use('/zahtev', zahtevRouter)
router.use('/zaduzenje', zaduzenjeRouter)
router.use('/komentar', komentarRouter)
router.use('/rezervacija', rezervacijaRouter)



app.use('/', router)
app.listen(4000, () => console.log(`Express server running on port 4000`));