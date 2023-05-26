import { Component, OnInit } from '@angular/core';
import { KnjigeService } from '../services/knjige.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Knjiga } from '../models/knjige';
import { KorisnikService } from '../services/korisnici.service';
import { ZaduzenjaService } from '../services/zaduzenja.service';
import { Zaduzenje } from '../models/zaduzenja';
import { RezervacijeService } from '../services/rezervacije.service';
import { Rezervacija } from '../models/rezervacije';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {

  constructor(private knjs:KnjigeService,private rezs:RezervacijeService,private sanitizer:DomSanitizer,private ks:KorisnikService,private zads:ZaduzenjaService) { }

  nes;
  naziv:string;
  autori:string;
  id:number;
  zad:number
  username:string
  ocena:number
  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  ngOnInit(): void {
      this.id=Number(sessionStorage.getItem('rand'))
      this.status=sessionStorage.getItem('status')
      this.username=sessionStorage.getItem('username')
      this.zad=Number(sessionStorage.getItem('zaduzeno'))
      this.knjs.getappbooks().subscribe((data:Knjiga[])=>{
        this.autori=data[this.id].autori;
        this.naziv=data[this.id].naziv;
        this.ocena=data[this.id].ocena;
        this.knjs.getpicrand(data[this.id].id).subscribe((data)=>{
          let url=URL.createObjectURL(data)
          this.nes=this.sanitizer.bypassSecurityTrustUrl(url)
      })
    })
    this.poruke=[]
    if(this.status=='blokiran') this.poruke.push("Blokirani ste od strane administratora")
    if(this.zad==3) this.poruke.push("Zaduzili ste maksimalne tri knjige")
    this.knjs.getapproved(this.username).subscribe((resp:Knjiga[])=>{
      resp.forEach((elem:Knjiga)=>{
        this.poruke.push("Vas predlog za knjigu "+elem.naziv+" je prihvacen")
      })
    })
    this.zads.getallbrrwsact(this.username).subscribe((resp:Zaduzenje[])=>{
      resp.forEach((elem:Zaduzenje)=>{
        this.knjs.getrandbook(elem.idknjige).subscribe((e:Knjiga)=>{
          let x=Math.floor(((new Date().getTime()-new Date(elem.datumdo).getTime())/(1000*3600*24)))
          if(x>=0) this.poruke.push("Istekao je rok za vracanje knjige "+e.naziv+" pre "+String(x)+" dana")
          else if(x>=-2) this.poruke.push("Za dva dana Vam istice rok za vracanje knjige "+e.naziv)
        })
        
      })
    })
    this.rezs.allbookrez1(this.username).subscribe((resp:Rezervacija[])=>{
      resp.forEach((elem:Rezervacija)=>{
        this.rezs.finishrez(elem.id).subscribe(()=>{
          this.knjs.getrandbook(elem.idknjige).subscribe((r:Knjiga)=>{
            this.poruke.push("Knjiga "+r.naziv+" vise nije rezervisana nego zaduzena")
          })
        })
      })
    })
    
  }

  poruke:Array<string>
  status:string
  profile(){}
  slika:string

}
