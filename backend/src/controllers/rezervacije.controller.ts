import express from 'express'
import RezervacijaModel from '../models/rezervacije'

export class RezervacijaController{

    hadrez= (req: express.Request, res: express.Response)=>{
    
        RezervacijaModel.findOne({'username':req.body.username,'idknjige':Number(req.body.idknjige),'stanje':"a"}).exec((e,r)=>{
            if(!e) res.json(r)
            else console.log(e)
        })
    }

    addrez= (req: express.Request, res: express.Response)=>{
        
        let user = new RezervacijaModel({
            username:req.body.username,
            id:Number(req.body.id),
            idknjige:Number(req.body.idknjige),
            stanje:"a"
        })
    user.save().then(user=>{
        res.status(200).json({'message':'ok'})
         }).catch(err=>{
            res.status(200).json({'message':'error'})
                   })
    }

    numofrez= (req: express.Request, res: express.Response)=>{
        RezervacijaModel.find({}).count().exec((e,r)=>{
            if(!e) res.json(r)
            else console.log(e)
        })
    }

    allbookrez=(req: express.Request, res: express.Response)=>{
        RezervacijaModel.find({'idknjige':Number(req.body.id),'stanje':"a"}).sort({'id':1}).exec((e,r)=>{
            if(!e) res.json(r)
            else console.log(e)
        })
    }

    allbookrez1=(req: express.Request, res: express.Response)=>{
        RezervacijaModel.find({'username':req.body.id,'stanje':"b"}).sort({'id':1}).exec((e,r)=>{
            if(!e) res.json(r)
            else console.log(e)
        })
    }

    updaterez=(req: express.Request, res: express.Response)=>{
        RezervacijaModel.updateOne({'id':Number(req.body.id)},{$set:{'stanje':"b"}}).exec((err,resp)=>{
            if(!err) res.json(resp)
            else console.log(err)
        })
    }

    finishrez=(req: express.Request, res: express.Response)=>{
        RezervacijaModel.updateOne({'id':Number(req.body.id)},{$set:{'stanje':"c"}}).exec((err,resp)=>{
            if(!err) res.json(resp)
            else console.log(err)
        })
    }


}