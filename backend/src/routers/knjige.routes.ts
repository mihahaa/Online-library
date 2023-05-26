import express from 'express'
import { KnjigaController } from '../controllers/knjige.controller';

const knjigaRouter = express.Router();

const multer=require('multer')
const upload=multer({dest:'./slike'})

knjigaRouter.post('/addbook',upload.single('slika'),(req:any,res:any)=>{
    req.body.slika= req.file.filename
    new KnjigaController().addbook(req,res)
})

knjigaRouter.post('/addbookwp',upload.fields([]),(req:any,res:any)=>{
    new KnjigaController().addbookwp(req,res)
})

knjigaRouter.route('/getpic').post((req,res)=>{
    new KnjigaController().getpic(req,res);
    
})

knjigaRouter.route('/getpicrand').post((req,res)=>{
    new KnjigaController().getpicrand(req,res);
    
})
knjigaRouter.route('/getrandbook').post((req,res)=>{
    new KnjigaController().getrandbook(req,res);
    
})

knjigaRouter.route('/numofbooks').get((req,res)=>{
    new KnjigaController().numofbooks(req,res);
    
})

knjigaRouter.route('/numofappbooks').get((req,res)=>{
    new KnjigaController().numofappbooks(req,res);
    
})

knjigaRouter.route('/gettopthree').get((req,res)=>{
    new KnjigaController().gettopthree(req,res);
    
})

knjigaRouter.route('/getallbooks').get((req,res)=>{
    new KnjigaController().getallbooks(req,res);
    
})

knjigaRouter.route('/getappbooks').get((req,res)=>{
    new KnjigaController().getappbooks(req,res);
    
})

knjigaRouter.post('/addbookreader',upload.single('slika'),(req:any,res:any)=>{
    req.body.slika= req.file.filename
    new KnjigaController().addbookreader(req,res)
})

knjigaRouter.post('/update',upload.single('slika'),(req:any,res:any)=>{
    req.body.slika= req.file.filename
    new KnjigaController().update(req,res)
})

knjigaRouter.post('/updatewp',upload.fields([]),(req:any,res:any)=>{
    new KnjigaController().updatewp(req,res)
})

knjigaRouter.post('/addbookreaderwp',upload.fields([]),(req:any,res:any)=>{
    new KnjigaController().addbookreaderwp(req,res)
})

knjigaRouter.route('/search').post((req,res)=>{
    new KnjigaController().search(req,res);
    
})

knjigaRouter.route('/returnbook').post((req,res)=>{
    new KnjigaController().returnbook(req,res);
    
})

knjigaRouter.route('/borrowbook').post((req,res)=>{
    new KnjigaController().borrowbook(req,res);
    
})

knjigaRouter.route('/delete').post((req,res)=>{
    new KnjigaController().deletebook(req,res);
    
})

knjigaRouter.route('/getapproved').post((req,res)=>{
    new KnjigaController().getapproved(req,res);
    
})

knjigaRouter.route('/updaterat').post((req,res)=>{
    new KnjigaController().updaterat(req,res);
    
})

knjigaRouter.route('/searchadv').post((req,res)=>{
    new KnjigaController().searchadv(req,res);
    
})

knjigaRouter.route('/approvebook').post((req,res)=>{
    new KnjigaController().approvebook(req,res);
    
})

knjigaRouter.route('/declinebook').post((req,res)=>{
    new KnjigaController().declinebook(req,res);
    
})



export default knjigaRouter;