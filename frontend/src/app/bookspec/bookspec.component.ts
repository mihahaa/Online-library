import { Component, OnInit } from '@angular/core';
import { Knjiga } from '../models/knjige';
import { KnjigeService } from '../services/knjige.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Korisnik } from '../models/korisnici';
import { KorisnikService } from '../services/korisnici.service';
import { Router } from '@angular/router';
import { Komentar } from '../models/komentari';
import { KomentariService } from '../services/komentari.service';
import { ZaduzenjaService } from '../services/zaduzenja.service';
import { Zaduzenje } from '../models/zaduzenja';
import { RezervacijeService } from '../services/rezervacije.service';
import { Rezervacija } from '../models/rezervacije';


@Component({
  selector: 'app-bookspec',
  templateUrl: './bookspec.component.html',
  styleUrls: ['./bookspec.component.css']
})
export class BookspecComponent implements OnInit {

  constructor(private knjs:KnjigeService,private rezs:RezervacijeService,private zads:ZaduzenjaService,private koms:KomentariService,private sanitizer:DomSanitizer,private ks:KorisnikService,private router:Router) { }

  allcomms:Komentar[]
  nije:boolean
  zad:number
  status:string
  jeste:boolean
  rez:boolean

  ngOnInit(): void {
    this.resi=[]
    this.neresi=[]
    this.id=Number(sessionStorage.getItem('zabookid'));
    this.status=sessionStorage.getItem('status')
    this.allcomms=[]
    if(!sessionStorage.getItem('koje')) this.koje=""
    else this.koje=sessionStorage.getItem('koje')
    this.username=sessionStorage.getItem('username')
    this.ks.getuserid(this.username).subscribe((i:Korisnik)=>{
      this.zad=i.zaduzeno
    })
    
    this.ima=false;
    this.zads.getallbrrwsact(this.username).subscribe((resp:Zaduzenje[])=>{
      resp.forEach((elem:Zaduzenje)=>{
        if(elem.datumdo<=new Date()) this.ima=true
      })
    })
    this.rezs.hadrez(this.username,this.id).subscribe((r:Rezervacija)=>{
      if(r) this.rez=true
      else this.rez=false
    })
    this.zads.hadbrwd(this.username,this.id).subscribe((resp:Zaduzenje)=>{
      if(resp) this.jeste=true
      else this.jeste=false
    })
    this.knjs.getrandbook(this.id).subscribe((book:Knjiga)=>{
      this.ks.getuserid(this.username).subscribe((user:Korisnik)=>{
        this.klk=book.stanje
        this.koji=user;
        this.naziv=book.naziv;
      this.autori=book.autori;
      this.ocena=book.ocena
      this.izdavac=book.izdavac
      this.zanrovi=book.zanrovi
      this.stanje=book.stanje
      this.godina=book.godina
      this.jezik=book.jezik
      this.knjs.getpic(book.slika).subscribe((data)=>{
        let url=URL.createObjectURL(data)
        this.nes=this.sanitizer.bypassSecurityTrustUrl(url)
      })
      })
    }) 
    this.koms.getbookscomm(this.id).subscribe((comms:Komentar[])=>{
      this.allcomms=comms
      this.allcomms.sort((e1:Komentar,e2:Komentar)=>{
        if(e1.datum>e2.datum) return -1
        else if(e1.datum==e2.datum) return 0
        else return 1
      })
    })
    this.koms.ifcomm(this.id,this.username).subscribe((num:Number)=>{
      if(num==0) this.nije=true
      else this.nije=false
    })
    }

    borrow()
    {
      this.ks.borrow(this.username).subscribe((resp)=>{})
    }
  
  username:string
  ima:boolean
  koji:Korisnik
  koje:string
  id:Number
  nes;
  autori:string;
  naziv:string;
  izdavac:string
  stanje:number
  zanrovi:string
  godina:string
  jezik:string
  autorii:string;
  nazivv:string;
  izdavacc:string
  stanjee:number
  zanrovii:string
  godinaa:string
  jezikk:string
  image:File
  razl:number
  update()
  {
    let formdata = new FormData();
    formdata.append('id', String(this.id));
      if(this.nazivv==undefined || this.nazivv=="")
        formdata.append('naziv', this.naziv);
      else formdata.append('naziv', this.nazivv);
      if(this.autorii==undefined || this.autorii=="")
        formdata.append('autori', this.autori);
      else formdata.append('autori', this.autorii);
      if(this.izdavacc==undefined || this.izdavacc=="")
        formdata.append('izdavac', this.izdavac);
      else formdata.append('izdavac', this.izdavacc);
      if(this.zanrovii==undefined || this.zanrovii=="")
        formdata.append('zanrovi', this.zanrovi);
      else formdata.append('zanrovi', this.zanrovii);
      if(this.godinaa==undefined || this.godinaa=="")
        formdata.append('godina', this.godina);
      else formdata.append('godina', this.godinaa);
      if(this.jezikk==undefined || this.jezikk=="")
        formdata.append('jezik', this.jezik);
      else formdata.append('jezik', this.jezikk);
      if(this.stanjee==undefined)
      {
        formdata.append('stanje', String(this.stanje));
        this.razl=this.stanje
      }
      else 
      {
        formdata.append('stanje', String(this.stanjee));
        this.razl=this.stanjee
      }  
      if(this.image)
      {
        formdata.append('slika', this.image,this.image.name);
        this.knjs.update(formdata).subscribe((resp) => {
          if(this.razl>0)
          {
            this.rezs.allbookrez(this.id).subscribe((r:Rezervacija[])=>{
              r.forEach((e:Rezervacija)=>{
                if(this.razl>0)
                {
                  let x=false
                  this.zads.getallbrrwsact(e.username).subscribe((z:Zaduzenje[])=>{
                    if(z)
                      z.forEach((ez:Zaduzenje)=>{
                        if(new Date(ez.datumdo)<=new Date()) x=true
                      })
                  this.ks.getuserid(e.username).subscribe((u:Korisnik)=>{
                    if(u.zaduzeno>=3 || u.status=='blokiran') x=true
                  })
                    if(!x) 
                    {
                      this.razl=this.razl-1
                      this.rezs.updaterez(e.id).subscribe(()=>{
                        let d1=new Date()
                        let d2=new Date()
                        d2.setDate(d2.getDate()+Number(sessionStorage.getItem('zaduzenje')))
                        this.zads.addborrow(e.username,e.idknjige,d1,d2).subscribe(()=>{
                          this.knjs.borrowbook(e.idknjige).subscribe(()=>{
                            this.ks.borrow(e.username).subscribe(()=>{})
                          })
                        })
                      })
                    }
                  })
                }
              })
            })
          }
            
          this.ngOnInit()
        });
      }
      else
      {
        this.knjs.updatewp(formdata).subscribe((resp) => {
          if(this.razl>0)
          {
            this.rezs.allbookrez(this.id).subscribe((r:Rezervacija[])=>{
              r.forEach((e:Rezervacija)=>{
                if(this.razl>0)
                {
                  let x=false
                  this.zads.getallbrrwsact(e.username).subscribe((z:Zaduzenje[])=>{
                    if(z)
                      z.forEach((ez:Zaduzenje)=>{
                        if(new Date(ez.datumdo)<=new Date()) x=true
                      })
                      this.ks.getuserid(e.username).subscribe((u:Korisnik)=>{
                        if(u.zaduzeno>=3 || u.status=='blokiran') x=true
                      })
                    if(!x) 
                    {
                      this.razl=this.razl-1
                      this.rezs.updaterez(e.id).subscribe(()=>{
                        let d1=new Date()
                        let d2=new Date()
                        d2.setDate(d2.getDate()+Number(sessionStorage.getItem('zaduzenje')))
                        this.zads.addborrow(e.username,e.idknjige,d1,d2).subscribe(()=>{
                          this.knjs.borrowbook(e.idknjige).subscribe(()=>{
                            this.ks.borrow(e.username).subscribe(()=>{})
                          })
                        })
                      })
                    }
                  })
                }
              })
            })
          }
            
          this.ngOnInit()
        });
      }
    
  }

  klk:number
  resi:Array<Rezervacija>
  neresi:Array<Rezervacija>

  brw(u,i)
  {
    let d1=new Date()
    let d2=new Date()
    d2.setDate(d2.getDate()+Number(sessionStorage.getItem('zaduzenje')))
    this.zads.addborrow(u,i,d1,d2).subscribe(()=>{
      this.knjs.borrowbook(i).subscribe(()=>{
        this.ks.borrow(u).subscribe(()=>{
          this.ngOnInit()
        })
        
      })
    })
  }

  ocena:Number

  add(un,id)
  {
    sessionStorage.removeItem('sta')
    sessionStorage.removeItem('staun')
    sessionStorage.removeItem('staid')
    sessionStorage.removeItem('odakle')
    sessionStorage.setItem('odakle','bookspec')
    sessionStorage.setItem('sta','dodajem')
    sessionStorage.setItem('staun',un)
    sessionStorage.setItem('staid',id)
    this.router.navigate(['addcomm'])
  }

  res(u,i)
  {
    this.rezs.numofrez().subscribe((num:number)=>{
      this.rezs.addrez(u,i,num).subscribe(()=>{
        this.ngOnInit()
      })
    })
  }


  go(un,id)
  {
    sessionStorage.removeItem('sta')
    sessionStorage.removeItem('staun')
    sessionStorage.removeItem('staid')
    sessionStorage.removeItem('odakle')
    sessionStorage.setItem('odakle','bookspec')
    sessionStorage.setItem('sta','menjam')
    sessionStorage.setItem('staun',un)
    sessionStorage.setItem('staid',id)
    this.router.navigate(['addcomm'])
  }

  message:string

  onFileChanged(event) {
    if (event.target.value) {
        this.image = event.target.files[0];
    }
      else this.image=null as any;
  }

}
