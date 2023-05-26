import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Knjiga } from '../models/knjige';
import { Komentar } from '../models/komentari';
import { KnjigeService } from '../services/knjige.service';
import { KomentariService } from '../services/komentari.service';

@Component({
  selector: 'app-addcomm',
  templateUrl: './addcomm.component.html',
  styleUrls: ['./addcomm.component.css']
})
export class AddcommComponent implements OnInit {

  constructor(private router:Router,private koms:KomentariService,private knjs:KnjigeService) { }

  ngOnInit(): void {
    this.sta=sessionStorage.getItem('sta')
    this.odakle=sessionStorage.getItem('odakle')
    this.username=sessionStorage.getItem('staun')
    this.id=Number(sessionStorage.getItem('staid'))
    if(this.sta=='menjam')
    this.koms.getuseridcomm(this.id,this.username).subscribe((comm:Komentar)=>{
      this.tekst=comm.tekst
      this.ocena=comm.ocena
    })
    this.porm=""
    this.poruka=""
  }

  poruka:string


  addcomm()
  {
    this.porm=""
    this.poruka=""
    this.checkcomm()
    if(this.porm=="" && this.poruka=="")
    {
      if(this.tekstt==undefined) this.tekstt=""
      if(this.ocenaa==undefined) this.ocenaa=5
    this.koms.getbookscomm(this.id).subscribe((comms:Komentar[])=>{
      this.knjs.getrandbook(this.id).subscribe((book:Knjiga)=>{
        this.knjs.updaterat(this.id,(book.ocena*comms.length+Number(this.ocenaa))/(comms.length+1)).subscribe(()=>{
          this.koms.addcomm(this.id,this.username,this.tekstt,this.ocenaa).subscribe(()=>{
            if(sessionStorage.getItem('odakle')=='book')
            this.router.navigate(['book'])
            else this.router.navigate(['bookspec'])
          })
        })  
      })
    }) 
  }  
  }

  porm:string

  checkcomm(){
    if(this.tekstt==undefined || this.tekstt=="") this.poruka="Morate uneti tekst komentara"
    else  
      if(this.tekstt.length>1000) this.porm="Komentar moze imati maksimalno hiljadu karaktera"
    else this.porm="" 
  }

  changecomm()
  {
    this.checkcomm()
    if(this.porm=="")
    {
    if(this.tekstt=="" || this.tekstt==undefined) this.tekstt=this.tekst
    if(this.ocenaa==undefined) this.ocenaa=this.ocena
    this.koms.getbookscomm(this.id).subscribe((comms:Komentar[])=>{
      this.knjs.getrandbook(this.id).subscribe((book:Knjiga)=>{
        this.knjs.updaterat(this.id,(book.ocena*comms.length+Number(this.ocenaa)-Number(this.ocena))/(comms.length)).subscribe(()=>{
          this.koms.changecomm(this.id,this.username,this.tekstt,this.ocenaa).subscribe(()=>{
            if(sessionStorage.getItem('odakle')=='book')
            this.router.navigate(['book'])
            else this.router.navigate(['bookspec'])
          })
        })  
      })
    }) 
  }
  }

  kamo:string
  odakle:string;
  ocenaa:number
  tekstt:string
  tekst:string
  ocena:number
  sta:string
  username:string
  id:Number
}
