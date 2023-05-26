import express from 'express'
import { ZahtevController } from '../controllers/zahtevi.controller';

const zahtevRouter = express.Router();

const multer=require('multer')
const upload=multer({dest:'./slike'})

zahtevRouter.route('/addreq').post(
    (req, res)=>new ZahtevController().addreq(req, res)
)

zahtevRouter.route('/deletereq').post(
    (req, res)=>new ZahtevController().deletereq(req, res)
)

zahtevRouter.route('/getallreqs').get((req,res)=>{
    new ZahtevController().getallreqs(req,res);
    
})


export default zahtevRouter;