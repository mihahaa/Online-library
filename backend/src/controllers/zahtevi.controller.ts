import express from 'express'
import ZahtevModel from '../models/zahtevi'

export class ZahtevController{

    addreq = (req: express.Request, res: express.Response)=>{

                    let reqs = new ZahtevModel({
                            username:req.body.username,
                            idknjige:req.body.idknjige
                        })
                reqs.save().then(user=>{
                    res.status(200).json({'message':'ok'})
                     }).catch(err=>{
                        res.status(200).json({'message':'error'})
                               })



    }

    deletereq = (req: express.Request, res: express.Response)=>{
        let id=req.body.id


        ZahtevModel.deleteOne({'idknjige':Number(id)}).exec((err,resp)=>{
            if(!err) res.json(resp)
            else console.log(err)
        })
    }

    getallreqs= (req: express.Request, res: express.Response)=>{
        ZahtevModel.find({}).exec((err,user)=>{
            if(!err) res.json(user)
            else console.log(err)
        })
    }
}