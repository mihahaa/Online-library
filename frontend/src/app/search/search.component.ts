import { Component, OnInit } from '@angular/core';
import { Knjiga } from '../models/knjige';
import { KnjigeService } from '../services/knjige.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private knjs:KnjigeService,private sanit:DomSanitizer,private router:Router) { }

  ngOnInit(): void {
    if(!sessionStorage.getItem('koje')) this.koje="niko"
    else this.koje=sessionStorage.getItem('koje')
  }

  naziv:string;
  autori:string;
  koje:string

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
    this.router.navigate(['book']);
  }

  knjige:Array<Knjiga>

}
