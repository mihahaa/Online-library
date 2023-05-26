import express from 'express'
import KorisnikModel from '../models/korisnici'

export class KorisnikController{

    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;
        KorisnikModel.findOne({'username': username, 'lozinka': password,'tip':{$ne : 'admin'},'status':{$ne:'novi'}}).exec((err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }

    loginadmin = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;
        KorisnikModel.findOne({'username': username, 'lozinka': password,'tip':'admin'}).exec((err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }
    
    register = (req: express.Request, res: express.Response)=>{

                            let user = new KorisnikModel({
                                ime:req.body.ime,
                                prezime:req.body.prezime,
                                username:req.body.username,
                                lozinka:req.body.lozinka,
                                zaduzeno:0,
                                tip:'citalac',
                                status:'novi',
                                adresa:req.body.adresa,
                                telefon:req.body.telefon,
                                email:req.body.email,
                                slika:req.body.slika
                            })
                        user.save().then(user=>{
                            res.status(200).json({'message':'ok'})
                             }).catch(err=>{
                                res.status(200).json({'message':'error'})
                                       })
                                     
            
    }

    registerwp = (req: express.Request, res: express.Response)=>{

                            let user = new KorisnikModel({
                                ime:req.body.ime,
                                prezime:req.body.prezime,
                                username:req.body.username,
                                lozinka:req.body.lozinka,
                                zaduzeno:0,
                                tip:'citalac',
                                status:'novi',
                                adresa:req.body.adresa,
                                telefon:req.body.telefon,
                                email:req.body.email,
                                slika:""
                            })
                        user.save().then(user=>{
                            res.status(200).json({'message':'ok'})
                             }).catch(err=>{
                                res.status(200).json({'message':'error'})
                                       })
                                     
    }

    deleteuser=(req: express.Request, res: express.Response)=>{
        KorisnikModel.deleteOne({'username':req.body.username}).exec((err,resp)=>{
            if(!err) res.json(resp)
            else console.log(err)
        })
    }

    getuser = (req: express.Request, res: express.Response)=>{
        let username=req.body.username;
        KorisnikModel.find({'username':username}, (err, news)=>{
            if(err) console.log(err)
            else res.json(news)
        })

    }

    getuserid = (req: express.Request, res: express.Response)=>{
        let username=req.body.username;
        KorisnikModel.findOne({'username':username}, (err, news)=>{
            if(err) console.log(err)
            else res.json(news)
        })

    }

    getusermail=(req: express.Request, res: express.Response)=>{
        KorisnikModel.findOne({'email':req.body.email}, (err, news)=>{
            if(err) console.log(err)
            else res.json(news)
        })
    }

    getpic  = (req: express.Request, res: express.Response) =>{
        res.sendFile(`${__dirname.substr(0,__dirname.lastIndexOf(require('path').sep, __dirname.lastIndexOf(require('path').sep) - 1))}${require('path').sep}slike${require('path').sep}${req.body.slika}`)
       
    }

    changepass = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;
        
                    KorisnikModel.updateOne({'username': username}, {$set: {'lozinka': password}}, (err, resp)=>{
                        if(err) console.log(err)
                        else {
                            res.json({'message': 'ok'})
                        }
                    })

    }

    checkuserpass= (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;
                    KorisnikModel.findOne({'username': username,'lozinka': password}).exec( (err, resp)=>{
                        if(err) console.log(err)
                        else res.json(resp)
                    })

    }

    update= (req: express.Request, res: express.Response)=>{
        KorisnikModel.updateOne({'username':req.body.username},{$set:{
                    ime:req.body.ime,
                    prezime:req.body.prezime,
                    tip:req.body.tip,
                    adresa:req.body.adresa,
                    telefon:req.body.telefon,
                    email:req.body.email,
                    slika:req.body.slika
                    }
                }).exec((e,r)=>{
                    if(e) {
                        res.json({'message':'error'})
                        console.log(e)
                    }
                    else 
                    {
                        res.json(r)
                    }
          
                  })
            }

    updatewp= (req: express.Request, res: express.Response)=>{
        KorisnikModel.updateOne({'username':req.body.username},{$set:{
                    ime:req.body.ime,
                    prezime:req.body.prezime,
                    tip:req.body.tip,
                    adresa:req.body.adresa,
                    telefon:req.body.telefon,
                    email:req.body.email
                    }
                }).exec((e,r)=>{
                    if(e) {
                        res.json({'message':'error'})
                        console.log(e)
                    }
                    else 
                    {
                        res.json(r)
                    }
          
                  })
            }
           

    getallusers= (req: express.Request, res: express.Response)=>{
        KorisnikModel.find({}).exec((err,user)=>{
            if(!err) res.json(user)
            else console.log(err)
        })
    }

    upguser= (req: express.Request, res: express.Response)=>{
        let username=req.body.username

        KorisnikModel.updateOne({'username':username},{$set:{'tip':'moderator'}}).exec((err,resp)=>{
            if(!err) res.json({'message':'ok'})
            else console.log(err)
        })
    }

    dwnguser= (req: express.Request, res: express.Response)=>{
        let username=req.body.username

        KorisnikModel.updateOne({'username':username},{$set:{'tip':'citalac'}}).exec((err,resp)=>{
            if(!err) res.json({'message':'ok'})
            else console.log(err)
        })
    }

    blkuser= (req: express.Request, res: express.Response)=>{
        let username=req.body.username

        KorisnikModel.updateOne({'username':username},{$set:{'status':'blokiran'}}).exec((err,resp)=>{
            if(!err) res.json({'message':'ok'})
            else console.log(err)
        })
    }

    unblkuser= (req: express.Request, res: express.Response)=>{
        let username=req.body.username

        KorisnikModel.updateOne({'username':username},{$set:{'status':'odobren'}}).exec((err,resp)=>{
            if(!err) res.json({'message':'ok'})
            else console.log(err)
        })
    }

    borrow= (req: express.Request, res: express.Response)=>{
    
        let username=req.body.username

        KorisnikModel.updateOne({'username':username},{$inc:{'zaduzeno':1}}).exec((err,resp)=>{
            if (!err) res.json(resp)
            else console.log(err)
        })

    }

    returnb= (req: express.Request, res: express.Response)=>{
    
        let username=req.body.username

        KorisnikModel.updateOne({'username':username},{$inc:{'zaduzeno':-1}}).exec((err,resp)=>{
            if (!err) res.json(resp)
            else console.log(err)
        })

    }



}