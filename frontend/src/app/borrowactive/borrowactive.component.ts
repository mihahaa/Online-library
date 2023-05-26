import { ReturnStatement } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Knjiga } from '../models/knjige';
import { Korisnik } from '../models/korisnici';
import { Rezervacija } from '../models/rezervacije';
import { Zaduzenje } from '../models/zaduzenja';
import { KnjigeService } from '../services/knjige.service';
import { KorisnikService } from '../services/korisnici.service';
import { RezervacijeService } from '../services/rezervacije.service';
import { ZaduzenjaService } from '../services/zaduzenja.service';

@Component({
  selector: 'app-borrowactive',
  templateUrl: './borrowactive.component.html',
  styleUrls: ['./borrowactive.component.css']
})
export class BorrowactiveComponent implements OnInit {

  constructor(private zads:ZaduzenjaService,private ks:KorisnikService,private rezs:RezervacijeService,private knjs:KnjigeService,private sanit:DomSanitizer,private router:Router) { }

  status:string

  ngOnInit(): void {
    this.allbrrwsn=[]
    this.status=sessionStorage.getItem('status')
    this.allbrrws=[]
    this.nes=[]
    this.koje=sessionStorage.getItem('koje')
    this.username=sessionStorage.getItem('username')
    this.zads.getallbrrwsact(this.username).subscribe((zad:Zaduzenje[])=>{
      this.allbrrws=zad
      this.allbrrws.forEach((elem:Zaduzenje)=>{
        this.knjs.getrandbook(elem.idknjige).subscribe((book:Knjiga)=>{
          book.datumu=elem.datumod
          book.url=null
          book.brojdana=Math.floor(((new Date().getTime()-new Date(elem.datumdo).getTime())/(1000*3600*24)))
          book.produzio=elem.produzio
          book.datumv=elem.datumdo
          book.username=this.username
          this.allbrrwsn.push(book)
          this.knjs.getpic(book.slika).subscribe((resp)=>{
            let objectURL=URL.createObjectURL(resp)
            book.url=this.sanit.bypassSecurityTrustUrl(objectURL)
            if(!book.url) book.url='/assets/knjiga.jpg';
            })
        })
      })
    })
    
  }

  details(id)
  {
    sessionStorage.removeItem('zabookid')
    sessionStorage.setItem('zabookid',id)
    if(this.koje=='moderator' && this.status!='blokiran')
      this.router.navigate(['bookspec'])
    else this.router.navigate(['book'])
  }

  extend(un,dv,id)
  {
    let dat=new Date(dv)
    dat.setDate(dat.getDate()+Number(sessionStorage.getItem('zaduzenje')))
    this.zads.updatedays(un,id,dat).subscribe(()=>{this.ngOnInit()})
  }

  returnn(s,id)
  {
    let dx=new Date()
    this.ks.returnb(this.username).subscribe(()=>{
      this.knjs.returnbook(id).subscribe(()=>{
        this.zads.returnbook(this.username,id,dx).subscribe(()=>{
              this.razl=1
              this.rezs.allbookrez(id).subscribe((r:Rezervacija[])=>{
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
          this.ngOnInit()
        })
      })
    })
  }

  razl:number
  username:string
  koje:string;
  allbrrws:Zaduzenje[]
  allbrrwsn:Knjiga[]
  nes:SafeUrl[]

}
