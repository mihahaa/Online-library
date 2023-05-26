import express from 'express'
import { KorisnikController } from '../controllers/korisnici.controller';

const korisnikRouter = express.Router();

const multer=require('multer')
const upload=multer({dest:'./slike'})

korisnikRouter.post('/register',upload.single('slika'),(req:any,res:any)=>{
    req.body.slika= req.file.filename
    new KorisnikController().register(req,res)
})

korisnikRouter.post('/registerwp',upload.fields([]),(req:any,res:any)=>{
    new KorisnikController().registerwp(req,res)
})

korisnikRouter.route('/login').post(
    (req, res)=>new KorisnikController().login(req, res)
)

korisnikRouter.route('/getusermail').post(
    (req, res)=>new KorisnikController().getusermail(req, res)
)

korisnikRouter.route('/loginadmin').post(
    (req, res)=>new KorisnikController().loginadmin(req, res)
)

korisnikRouter.route('/getuser').post(
    (req, res)=> new KorisnikController().getuser(req, res)
)

korisnikRouter.route('/getuserid').post(
    (req, res)=> new KorisnikController().getuserid(req, res)
)

korisnikRouter.route('/getpic').post((req,res)=>{
    new KorisnikController().getpic(req,res);
    
})

korisnikRouter.route('/changepass').post((req,res)=>{
    new KorisnikController().changepass(req,res);
    
})

korisnikRouter.route('/checkuserpass').post((req,res)=>{
    new KorisnikController().checkuserpass(req,res);
    
})

korisnikRouter.route('/getallusers').get((req,res)=>{
    new KorisnikController().getallusers(req,res);
    
})

korisnikRouter.post('/update',upload.single('slika'),(req:any,res:any)=>{
    req.body.slika= req.file.filename
    new KorisnikController().update(req,res)
})

korisnikRouter.post('/updatewp',upload.fields([]),(req:any,res:any)=>{
    new KorisnikController().updatewp(req,res)
})

korisnikRouter.route('/delete').post(
    (req, res)=> new KorisnikController().deleteuser(req, res)
)


korisnikRouter.post('/updatewp',upload.fields([]),(req:any,res:any)=>{
    new KorisnikController().updatewp(req,res)
})

korisnikRouter.route('/borrow').post(
    (req, res)=> new KorisnikController().borrow(req, res)
)

korisnikRouter.route('/returnb').post(
    (req, res)=> new KorisnikController().returnb(req, res)
)

korisnikRouter.route('/dwnguser').post(
    (req, res)=> new KorisnikController().dwnguser(req, res)
)

korisnikRouter.route('/upguser').post(
    (req, res)=> new KorisnikController().upguser(req, res)
)

korisnikRouter.route('/blkuser').post(
    (req, res)=> new KorisnikController().blkuser(req, res)
)

korisnikRouter.route('/unblkuser').post(
    (req, res)=> new KorisnikController().unblkuser(req, res)
)

export default korisnikRouter;