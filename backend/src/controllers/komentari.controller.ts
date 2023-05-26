import express from 'express'
import KomentarModel from '../models/komentari'

export class KomentarController{

    getbookscomm=(req: express.Request, res: express.Response)=>{
        let idknjige=req.body.idknjige
        KomentarModel.find({'idknjige':idknjige}).exec((err,comm)=>{
            if(!err) res.json(comm)
            else console.log(err)
        })
    }

    getuseridcomm=(req: express.Request, res: express.Response)=>{
        let idknjige=Number(req.body.idknjige)
        let username=req.body.username
        KomentarModel.findOne({'idknjige':idknjige,'username':username}).exec((err,comm)=>{
            if(!err) res.json(comm)
            else console.log(err)
        })
    }

    
    

    addcomm=(req: express.Request, res: express.Response)=>{
        
        let user = new KomentarModel({
            idknjige:Number(req.body.idknjige),
            tekst:req.body.tekst,
            ocena:Number(req.body.ocena),
            username:req.body.username,
            datum:new Date(),
            izmenjen:false
        })
    user.save().then(user=>{
        res.status(200).json({'message':'ok'})
         }).catch(err=>{
            res.status(200).json({'message':'error'})
                   })
    }
    ifcomm=(req: express.Request, res: express.Response)=>{
        let username=req.body.username
        let idknjige=req.body.idknjige
        KomentarModel.find({'username':username,'idknjige':idknjige}).count().exec((err,comm)=>{
            if(!err) res.json(comm)
            else console.log(err)
        })
    
    
    }
    changecomm=(req: express.Request, res: express.Response)=>{
        let idknjige=Number(req.body.idknjige)
           let tekst=req.body.tekst
           let ocena=Number(req.body.ocena)
           let username=req.body.username

           KomentarModel.updateOne({'idknjige':idknjige,'username':username},{$set:{'izmenjen':true,'tekst':tekst,'ocena':ocena}}).exec((err,comm)=>{
            if(!err) res.json(comm)
            else console.log(err)
           })


    }
}