import express from 'express'
import ZaduzenjeModel from '../models/zaduzenja'

export class ZaduzenjeController{
    
    getallbrrwsold= (req: express.Request, res: express.Response)=>{
        let username=req.body.username
        ZaduzenjeModel.find({'username':username,'aktivan':false}).exec((err,user)=>{
            if(!err) res.json(user)
            else console.log(err)
        })
    }

    returnbook= (req: express.Request, res: express.Response)=>{
        let d=new Date(req.body.d)
        ZaduzenjeModel.updateMany({'username':req.body.username,'idknjige':Number(req.body.idknjige)},{$set:{'aktivan':false,'datumdo':d}}).exec((err,user)=>{
            if(!err) res.json(user)
            else console.log(err)
        })
    }

    updatedays= (req: express.Request, res: express.Response)=>{
        let username=req.body.username
        let idknjige=req.body.idknjige
        let danii=new Date(req.body.danii)
        ZaduzenjeModel.updateMany({'username':username,'idknjige':idknjige},{$set:{'produzio':true,'datumdo':danii}}).exec((err,zad)=>{
            if(!err) res.json(zad)
            else console.log(err)
        })
    }

    hadbrwd=(req: express.Request, res: express.Response)=>{
        ZaduzenjeModel.findOne({'username':req.body.username,'idknjige':Number(req.body.idknjige),'aktivan':true}).exec((e,r)=>{
            if(!e) res.json(r)
            else console.log(e)
        })
    }

    addborrow= (req: express.Request, res: express.Response)=>{
        let username=req.body.username
        let idknjige=req.body.idknjige
        let daniip=new Date(req.body.daniip)
        let daniik=new Date(req.body.daniik)
        let user = new ZaduzenjeModel({
            idknjige:idknjige,
            username:username,
            datumod:daniip,
            datumdo:daniik,
            aktivan:true,
            produzio:false,
        })
    user.save().then(user=>{
        res.status(200).json({'message':'ok'})
         }).catch(err=>{
            res.status(200).json({'message':'error'})
                   })
    }

    getallbrrwsact= (req: express.Request, res: express.Response)=>{
        let username=req.body.username
        ZaduzenjeModel.find({'username':username,'aktivan':true}).exec((err,user)=>{
            if(!err) res.json(user)
            else console.log(err)
        })
    }
    
}