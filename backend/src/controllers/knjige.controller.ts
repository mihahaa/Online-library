import express from 'express'
import knjige from '../models/knjige'
import KnjigaModel from '../models/knjige'

export class KnjigaController{

    addbook = (req: express.Request, res: express.Response)=>{

        
                            let book = new KnjigaModel({
                                naziv:req.body.naziv,
                                godina:req.body.godina,
                                izdavac:req.body.izdavac,
                                autori:req.body.autori,
                                zanrovi:req.body.zanrovi,
                                jezik:req.body.jezik,
                                id:req.body.num,
                                ocena:0,
                                popularnost:0,
                                stanje:3,
                                zaduzena:0,
                                slika:req.body.slika,
                                status:"ubacena",
                                ubacena:false
                            })
                        book.save().then(user=>{
                            res.status(200).json({'message':'ok'})
                             }).catch(err=>{
                                res.status(200).json({'message':'error'})
                                       })
           
    
      
    }

    addbookwp = (req: express.Request, res: express.Response)=>{

                    let book = new KnjigaModel({
                            naziv:req.body.naziv,
                            godina:req.body.godina,
                            izdavac:req.body.izdavac,
                            autori:req.body.autori,
                            zanrovi:req.body.zanrovi,
                            id:req.body.num,
                            ocena:0,
                            populanost:0,
                            zaduzena:0,
                            stanje:3,
                            jezik:req.body.jezik,
                            slika:"",
                            status:"ubacena",
                            ubacena:false
                        })
                book.save().then(user=>{
                    res.status(200).json({'message':'ok'})
                     }).catch(err=>{
                        res.status(200).json({'message':'error'})
                               })
    


    }

    getpic  = (req: express.Request, res: express.Response) =>{
        res.sendFile(`${__dirname.substr(0,__dirname.lastIndexOf(require('path').sep, __dirname.lastIndexOf(require('path').sep) - 1))}${require('path').sep}slike${require('path').sep}${req.body.slika}`)
    }

    getpicrand  = (req: express.Request, res: express.Response) =>{

        let broj=req.body.broj

        KnjigaModel.findOne({'id':broj}).exec((err,book)=>{
            if(err) console.log(err)
            else
            {
            let slika = book.slika;
            var path = require('path');
            let lastindex = __dirname.lastIndexOf(path.sep);
            lastindex = __dirname.lastIndexOf(path.sep, lastindex - 1);
            let parentFolder = __dirname.substr(0,lastindex);
            res.sendFile(`${parentFolder}${path.sep}slike${path.sep}${slika}`)}
        })

        
    }

    getrandbook  = (req: express.Request, res: express.Response) =>{

        let broj=req.body.broj

        KnjigaModel.findOne({'id':broj}).exec((err,book)=>{
            if(err) console.log(err)
            else
            {
                res.json(book);}
        })

        
    }

    numofbooks = (req: express.Request, res: express.Response)=>{

        
        KnjigaModel.find({}).count().exec((err,num)=>{
            if(err)console.log(err)
            else{
                res.json(num);
    }
    })


    }

    numofappbooks = (req: express.Request, res: express.Response)=>{

        
        KnjigaModel.find({'status':'ubacena'}).count().exec((err,num)=>{
            if(err)console.log(err)
            else{
                res.json(num);
    }
    })


    }

    updaterat= (req: express.Request, res: express.Response)=>{
        let id=Number(req.body.id)
        let ocena=Number(req.body.ocena)

        KnjigaModel.updateOne({'id':id},{$set:{'ocena':ocena}}).exec((err,book)=>{
            if(!err) res.json(book)
            else console.log(err)
        })

    }

    gettopthree=(req: express.Request, res: express.Response)=>{
        KnjigaModel.find({'status':'ubacena'}).sort({'popularnost':-1}).limit(3).exec((err,resp)=>{
            if(err) console.log(err)
            else res.json(resp);
        })
    }

    deletebook=(req: express.Request, res: express.Response)=>{
        KnjigaModel.deleteOne({'id':Number(req.body.id)}).exec((err,resp)=>{
            if(!err) res.json(resp)
            else console.log(err)
        })
    }

    addbookreader = (req: express.Request, res: express.Response)=>{

        
       
                    let book = new KnjigaModel({
                        naziv:req.body.naziv,
                        godina:req.body.godina,
                        izdavac:req.body.izdavac,
                        autori:req.body.autori,
                        popularnost:0,
                        zaduzena:0,
                        stanje:3,
                        ocena:0,
                        zanrovi:req.body.zanrovi,
                        jezik:req.body.jezik,
                        id:Number(req.body.num),
                        slika:req.body.slika,
                        status:"zatrazena",
                        ubacena:false,
                        ko:req.body.username
                    })
                book.save().then(user=>{
                    res.status(200).json({'message':'ok'})
                     }).catch(err=>{
                        res.status(200).json({'message':'error'})
                               })
    


    }

    addbookreaderwp = (req: express.Request, res: express.Response)=>{

                    let book = new KnjigaModel({
                            naziv:req.body.naziv,
                            godina:req.body.godina,
                            ocena:0,
                            izdavac:req.body.izdavac,
                            autori:req.body.autori,
                            popularnost:0,
                            zaduzena:0,
                            stanje:3,
                            zanrovi:req.body.zanrovi,
                            id:Number(req.body.num),
                            jezik:req.body.jezik,
                            slika:"",
                            status:"zatrazena",
                            ubacena:false,
                            ko:req.body.username
                        })
                book.save().then(user=>{
                    res.status(200).json({'message':'ok'})
                    }).catch(err=>{
                        res.status(200).json({'message':'error'})
                            })
  


    }

    search=(req: express.Request, res: express.Response)=>{
        let naziv=req.body.naziv
        let autori=req.body.autori
        KnjigaModel.find({$and:[{autori: { $regex: String(autori), $options: "i" } },
        { naziv: { $regex: String(naziv), $options: "i" } },{'status':'ubacena'}]}).exec((err,books)=>{
            if(!err)
            {
                res.json(books);
            }
            else console.log(err);
        })
    }

    searchadv=(req: express.Request, res: express.Response)=>{
        let naziv=req.body.naziv
        let autori=req.body.autori
        let izdavac=req.body.izdavac
        let zanr=req.body.zanr
        let pocgod=Number(req.body.pocgod)
        let krajgod=Number(req.body.krajgod)
        KnjigaModel.find({$and:[
        {autori: { $regex: String(autori), $options: "i" } },
        {'status':'ubacena'},
        { naziv: { $regex: String(naziv), $options: "i" } },
        { izdavac: { $regex: String(izdavac), $options: "i" } },
        { zanrovi: { $regex: String(zanr), $options: "i" } },
        { godina: { $gt: pocgod, $lt: krajgod } }]}).exec((err,books)=>{
            if(!err)
            {
                res.json(books);
            }
            else console.log(err);
        })
    }

    getallbooks= (req: express.Request, res: express.Response)=>{
        KnjigaModel.find({}).exec((err,user)=>{
            if(!err) res.json(user)
            else console.log(err)
        })
    }

    getappbooks= (req: express.Request, res: express.Response)=>{
        KnjigaModel.find({'status':'ubacena'}).exec((err,user)=>{
            if(!err) res.json(user)
            else console.log(err)
        })
    }

    update= (req: express.Request, res: express.Response)=>{
        let id=req.body.id;
            KnjigaModel.updateOne({'id':Number(id)},{
                naziv:req.body.naziv,
                autori:req.body.autori,
                godina:req.body.godina,
                izdavac:req.body.izdavac,
                jezik:req.body.jezik,
                stanje:Number(req.body.stanje),
                zanrovi:req.body.zanrovi,
                slika:req.body.slika
              }).exec((err,resp)=>{
                if(err) {
                    res.json({'message':'error'})
                    console.log(err)
                }
                else 
                {
                    res.json(resp)
                }
      
              })

    }

    updatewp= (req: express.Request, res: express.Response)=>{
        let id=req.body.id;
            KnjigaModel.updateOne({'id':Number(id)},{
                naziv:req.body.naziv,
                autori:req.body.autori,
                godina:req.body.godina,
                izdavac:req.body.izdavac,
                stanje:Number(req.body.stanje),
                jezik:req.body.jezik,
                zanrovi:req.body.zanrovi
              }).exec((err,resp)=>{
                if(err) {
                    res.json({'message':'error'})
                    console.log(err)
                }
                else 
                {
                    res.json(resp)
                }
      
              })

    }

    approvebook= (req: express.Request, res: express.Response)=>{
        let id=req.body.id

        KnjigaModel.updateOne({'id':id},{$set:{'status':'ubacena','ubacena':true}}).exec((err,resp)=>{
            if(!err) res.json({'message':'ok'})
            else console.log(err)
        })
    }

    declinebook= (req: express.Request, res: express.Response)=>{
        let id=req.body.id

        KnjigaModel.deleteOne({'id':id}).exec((err,resp)=>{
            if(!err) res.json({'message':'ok'})
            else console.log(err)
        })
    }

    getapproved= (req: express.Request, res: express.Response)=>{
        KnjigaModel.find({'ko':req.body.username,'ubacena':true}).exec((err,resp)=>{
            if(!err) res.json(resp)
            else console.log(err)
        })
    }

    borrowbook= (req: express.Request, res: express.Response)=>{
        KnjigaModel.updateOne({'id':Number(req.body.id)},{$inc:{'stanje':-1}}).exec((e1,r1)=>{
            if(!e1)
            {
                KnjigaModel.updateOne({'id':Number(req.body.id)},{$inc:{'popularnost':1}}).exec((e2,r2)=>{
                    if(!e2)
                    {
                        KnjigaModel.updateOne({'id':Number(req.body.id)},{$inc:{'zaduzena':1}}).exec((e3,r3)=>{
                            if(!e3) res.json(r3)
                            else console.log(e3)
                        })
                    }
                    else console.log(!e2)
                })
            }
            else console.log(e1)
        })
    }

    returnbook= (req: express.Request, res: express.Response)=>{
       
        KnjigaModel.updateOne({'id':Number(req.body.id)},{$inc:{'stanje':1}}).exec((e2,r2)=>{
            if(!e2)
            {
                KnjigaModel.updateOne({'id':Number(req.body.id)},{$inc:{'zaduzena':-1}}).exec((e3,r3)=>{
                    if(!e3) res.json(r3)
                    else console.log(e3)
                })
            }
            else console.log(!e2)
        })
            
    }


}