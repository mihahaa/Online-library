import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Knjiga } from '../models/knjige';
import { Zahtev } from '../models/zahtevi';
import { KnjigeService } from '../services/knjige.service';
import { ZahteviService } from '../services/zahtevi.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  constructor(private knjs:KnjigeService,private zahs:ZahteviService) { }

  ngOnInit(): void {
    this.allreqsn=[]
    this.zahs.getallreqs().subscribe((all:Zahtev[])=>{
      this.allreqs=all
      this.allreqs.forEach((elem:Zahtev)=>{
        this.knjs.getrandbook(elem.idknjige).subscribe((book:Knjiga)=>{
          book.username=elem.username
          this.allreqsn.push(book)
        })
      })
    })
  }

  approvereq(un,id)
  {
    this.knjs.approvebook(id).subscribe((resp)=>{
      this.zahs.deletereq(id).subscribe((resp)=>{
        this.ngOnInit()
      })
    })
    

  }

  deletereq(un,id)
  {
    this.knjs.declinebook(id).subscribe((resp)=>{
      this.zahs.deletereq(id).subscribe((resp)=>{
        this.ngOnInit()
      })
    })
    
  }

  allreqs:Zahtev[]
  allreqsn:Array<Knjiga>
}
