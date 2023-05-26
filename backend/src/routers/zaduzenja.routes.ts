import express from 'express'
import { ZaduzenjeController } from '../controllers/zaduzenja.controller';

const zaduzenjeRouter = express.Router();

const multer=require('multer')
const upload=multer({dest:'./slike'})


zaduzenjeRouter.route('/getallbrrwsold').post((req,res)=>{
    new ZaduzenjeController().getallbrrwsold(req,res);
    
})

zaduzenjeRouter.route('/getallbrrwsact').post((req,res)=>{
    new ZaduzenjeController().getallbrrwsact(req,res);
    
})

zaduzenjeRouter.route('/returnbook').post((req,res)=>{
    new ZaduzenjeController().returnbook(req,res);
    
})

zaduzenjeRouter.route('/updatedays').post((req,res)=>{
    new ZaduzenjeController().updatedays(req,res);
    
})
zaduzenjeRouter.route('/hadbrwd').post((req,res)=>{
    new ZaduzenjeController().hadbrwd(req,res);
    
})

zaduzenjeRouter.route('/addborrow').post((req,res)=>{
    new ZaduzenjeController().addborrow(req,res);
    
})


export default zaduzenjeRouter;