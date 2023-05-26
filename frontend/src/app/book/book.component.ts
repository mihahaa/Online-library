import { Component, OnInit } from '@angular/core';
import { KnjigeService } from '../services/knjige.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Knjiga } from '../models/knjige';
import { Komentar } from '../models/komentari';
import { KomentariService } from '../services/komentari.service';
import { ZaduzenjaService } from '../services/zaduzenja.service';
import { Zaduzenje } from '../models/zaduzenja';
import { RezervacijeService } from '../services/rezervacije.service';
import { Rezervacija } from '../models/rezervacije';
import { KorisnikService } from '../services/korisnici.service';
import { Korisnik } from '../models/korisnici';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor(private knjs:KnjigeService,private ks:KorisnikService,private sanitizer:DomSanitizer,private router:Router,private koms:KomentariService,private zads:ZaduzenjaService,
    private rezs:RezervacijeService) { }

  status:string
  zad:number
  jeste:boolean
  ima:boolean

  ngOnInit(): void {
    this.status=sessionStorage.getItem('status')
    this.id=Number(sessionStorage.getItem('zabookid'));
    this.ks.getuserid(this.username).subscribe((u:Korisnik)=>{
      this.zad=u.zaduzeno
    })
    this.allcomms=[]
    this.username=sessionStorage.getItem('username')
    if(!sessionStorage.getItem('koje')) this.koje=""
    else this.koje=sessionStorage.getItem('koje')
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
      this.klk=book.stanje
      this.naziv=book.naziv;
      this.ocena=Math.floor(book.ocena)
      this.autori=book.autori;
      this.knjs.getpic(book.slika).subscribe((data)=>{
        let url=URL.createObjectURL(data)
        this.nes=this.sanitizer.bypassSecurityTrustUrl(url)
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
  klk:number
  ocena:Number

  res(u,i)
  {
    this.rezs.numofrez().subscribe((num:number)=>{
      this.rezs.addrez(u,i,num).subscribe(()=>{
        this.ngOnInit()
      })
    })
  }

  add(un,id)
  {
    sessionStorage.removeItem('sta')
    sessionStorage.removeItem('staun')
    sessionStorage.removeItem('staid')
    sessionStorage.removeItem('odakle')
    sessionStorage.setItem('odakle','book')
    sessionStorage.setItem('sta','dodajem')
    sessionStorage.setItem('staun',un)
    sessionStorage.setItem('staid',id)
    this.router.navigate(['addcomm'])
  }

  nije:boolean

  go(un,id)
  {
    sessionStorage.removeItem('sta')
    sessionStorage.removeItem('staun')
    sessionStorage.removeItem('staid')
    sessionStorage.setItem('sta','menjam')
    sessionStorage.setItem('staun',un)
    sessionStorage.setItem('staid',id)
    this.router.navigate(['addcomm'])
  }

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


  rez:boolean
  username:string
  allcomms:Komentar[]=[]
  koje:string;
  nes;
  id:Number
  naziv:string;
  autori:string;
  zanrovi:string;
  slika:string;
  
  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  klik(){
    this.router.navigate(['']);
  }
}
