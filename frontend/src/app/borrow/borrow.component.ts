import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Knjiga } from '../models/knjige';
import { Zaduzenje } from '../models/zaduzenja';
import { KnjigeService } from '../services/knjige.service';
import { ZaduzenjaService } from '../services/zaduzenja.service';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css']
})
export class BorrowComponent implements OnInit {

  constructor(private zads:ZaduzenjaService,private knjs:KnjigeService,private router:Router) { }

  status:string

  ngOnInit(): void {
    this.allbrrwsn=[]
    this.allbrrws=[]
    this.koje=sessionStorage.getItem('koje')
    this.status=sessionStorage.getItem('status')
    this.username=sessionStorage.getItem('username')
    this.zads.getallbrrwsold(this.username).subscribe((zad:Zaduzenje[])=>{
      this.allbrrws=zad
      this.allbrrws.forEach((elem:Zaduzenje)=>{
        this.knjs.getrandbook(elem.idknjige).subscribe((book:Knjiga)=>{
          book.datumv=elem.datumdo
          book.username=this.username
          book.datumu=elem.datumod
          this.allbrrwsn.push(book)
        })
      })
    })
  }

  sta:string

  sort()
  {
    if(this.sta=="+" || this.sta=="" || this.sta==undefined)
    {
      return
    }
    else if(this.sta=="nd")
    {
      this.allbrrwsn.sort((b1,b2)=>{
        if(b1.naziv>b2.naziv) return -1;
        else if(b1.naziv==b2.naziv) return 0;
        else return 1;
      })
    }
    else if(this.sta=="na")
    {
      this.allbrrwsn.sort((b1,b2)=>{
        if(b1.naziv>b2.naziv) return 1;
        else if(b1.naziv==b2.naziv) return 0;
        else return -1;
      })
    }
    else if(this.sta=="ad")
    {
      this.allbrrwsn.sort((b1,b2)=>{
        if(b1.autori>b2.autori) return -1;
        else if(b1.autori==b2.autori) return 0;
        else return 1;
      })
    }
    else if(this.sta=="aa")
    {
      this.allbrrwsn.sort((b1,b2)=>{
        if(b1.autori>b2.autori) return 1;
        else if(b1.autori==b2.autori) return 0;
        else return -1;
      })
    }
    else if(this.sta=="dud")
    {
      this.allbrrwsn.sort((b1,b2)=>{
        if(b1.datumu>b2.datumu) return -1;
        else if(b1.datumu==b2.datumu) return 0;
        else return 1;
      })
    }
    else if(this.sta=="dua")
    {
      this.allbrrwsn.sort((b1,b2)=>{
        if(b1.datumu>b2.datumu) return 1;
        else if(b1.datumu==b2.datumu) return 0;
        else return -1;
      })
    }
    else if(this.sta=="dvd")
    {
      this.allbrrwsn.sort((b1,b2)=>{
        if(b1.datumv>b2.datumv) return -1;
        else if(b1.datumv==b2.datumv) return 0;
        else return 1;
      })
    }
    else if(this.sta=="dva")
    {
      this.allbrrwsn.sort((b1,b2)=>{
        if(b1.datumv>b2.datumv) return 1;
        else if(b1.datumv==b2.datumv) return 0;
        else return -1;
      })
    }

  }

  details(id)
  {
    sessionStorage.removeItem('zabookid')
    sessionStorage.setItem('zabookid',id)
    if(this.koje=='moderator' && this.status!='blokiran')
      this.router.navigate(['bookspec'])
    else this.router.navigate(['book'])
  }

  koje:string
  allbrrws:Zaduzenje[]
  username:string
  allbrrwsn:Knjiga[]
}
