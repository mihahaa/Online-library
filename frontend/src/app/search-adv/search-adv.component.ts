import { Component, OnInit } from '@angular/core';
import { Knjiga } from '../models/knjige';
import { KnjigeService } from '../services/knjige.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search-adv',
  templateUrl: './search-adv.component.html',
  styleUrls: ['./search-adv.component.css']
})
export class SearchAdvComponent implements OnInit {

  constructor(private knjs:KnjigeService,private sanit:DomSanitizer,private router:Router) { }

  ngOnInit(): void {
    this.koje=sessionStorage.getItem('koje');
    this.zx=[]
  }

  

  koje:string;
  izdavac:string;
  pocgod:string;
  zanr:string;
  krajgod:string;
  pg:number;
  kg:number;
  naziv:string;
  autori:string;
  search()
  {
    this.knjige=[]
    if(this.naziv==undefined) this.naziv=""
    if(this.autori==undefined) this.autori=""
    this.knjs.search(this.naziv,this.autori).subscribe((books:Knjiga[])=>{
      books.forEach((element:Knjiga) => {
        element.url=null;
        this.knjige.push(element)
        this.knjs.getpic(element.slika).subscribe((resp)=>{
          let objectURL=URL.createObjectURL(resp)
          element.url=this.sanit.bypassSecurityTrustUrl(objectURL)
        })
        
      });
    })
  }

  idi(id)
  {
    sessionStorage.setItem('zabookid',id);
    if(this.koje=='reader') this.router.navigate(['book'])
    else this.router.navigate(['bookspec']);
  }

  zx:Array<string>
  kx:Array<Number>

  dodaj(sf)
  {
    if(this.zx.indexOf(sf)==-1)
    {
      if(this.zx.indexOf("+")==-1)
        this.zx.push(sf);
      else
      this.zx[this.zx.indexOf("+")]=sf;
    }
    else
    {
      this.zx[this.zx.indexOf(sf)]="+";
    }
    
  }

  knjige:Array<Knjiga>
  searchadv()
  {
    this.knjige=[]
    this.kx=[]
    if(this.naziv==undefined) this.naziv=""
    if(this.autori==undefined) this.autori=""
    if(this.izdavac==undefined) this.izdavac=""
    if(this.pocgod==undefined || this.pocgod=="") this.pg=-35135135;
    else this.pg=Number(this.pocgod);
    if(this.krajgod==undefined || this.krajgod=="") this.kg=35135135;
    else this.kg=Number(this.krajgod);
    this.zx.forEach((elem:string)=>{
      if(elem!="+")
      {
        this.zanr=elem;
        this.knjs.searchadv(this.naziv,this.autori,this.zanr,this.izdavac,this.pg,this.kg).subscribe((books:Knjiga[])=>{
          books.forEach((element:Knjiga) => {
            if(this.kx.indexOf(element.id)==-1)
            {
              element.url=null;
              this.knjige.push(element)
              this.kx.push(element.id)
              this.knjs.getpic(element.slika).subscribe((resp)=>{
                let objectURL=URL.createObjectURL(resp)
                element.url=this.sanit.bypassSecurityTrustUrl(objectURL)
              })
            }
            
          });
        })
      }
    })
  }

}
