import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KnjigeService } from '../services/knjige.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Knjiga } from '../models/knjige';
import { Zaduzenje } from '../models/zaduzenja';
import { ZaduzenjaService } from '../services/zaduzenja.service';


@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html',
  styleUrls: ['./moderator.component.css']
})
export class ModeratorComponent implements OnInit {

  constructor(private router:Router,private knjs:KnjigeService,private sanitizer:DomSanitizer,private zads:ZaduzenjaService) { }

  ngOnInit(): void {

    this.username=sessionStorage.getItem('username')
    this.zad=Number(sessionStorage.getItem('zaduzeno'))
    this.poruke=[]
    this.id=Number(sessionStorage.getItem('rand'))
    this.status=sessionStorage.getItem('status')
      this.knjs.getappbooks().subscribe((data:Knjiga[])=>{
        this.autori=data[this.id].autori;
        this.naziv=data[this.id].naziv;
        this.ocena=data[this.id].ocena
        this.knjs.getpicrand(data[this.id].id).subscribe((data)=>{
          let url=URL.createObjectURL(data)
          this.nes=this.sanitizer.bypassSecurityTrustUrl(url)
      })
    })
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
  }

  ocena:number
  zad:number
  username:string
  poruke:Array<string>
  nes;
  status;
  id:number
  naziv:string;
  autori:string;
  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

}
