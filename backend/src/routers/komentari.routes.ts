import express from 'express'
import { KomentarController } from '../controllers/komentari.controller';

const komentarRouter = express.Router();

const multer=require('multer')
const upload=multer({dest:'./slike'})


komentarRouter.route('/getbookscomm').post((req,res)=>{
    new KomentarController().getbookscomm(req,res);
    
})


komentarRouter.route('/getuseridcomm').post((req,res)=>{
    new KomentarController().getuseridcomm(req,res);
    
})

komentarRouter.route('/addcomm').post((req,res)=>{
    new KomentarController().addcomm(req,res);
    
})

komentarRouter.route('/ifcomm').post((req,res)=>{
    new KomentarController().ifcomm(req,res);
    
})

komentarRouter.route('/changecomm').post((req,res)=>{
    new KomentarController().changecomm(req,res);
    
})



export default komentarRouter;