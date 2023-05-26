import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Knjiga } from '../models/knjige';
import { KnjigeService } from '../services/knjige.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private knjs:KnjigeService,private sanit:DomSanitizer) { }

  ngOnInit(): void {
      this.i=0;
      if(!sessionStorage.getItem('zaduzenje'))
      {
        this.i=14
      } 
      else this.i=Number(sessionStorage.getItem('zaduzenje'))
      sessionStorage.clear()
      this.ae=[]
        
      
      
      this.knjs.numofappbooks().subscribe((num:number)=>{
        sessionStorage.removeItem('rand')
        sessionStorage.setItem('rand',String((new Date().getFullYear()*(new Date().getMonth()+1)*(new Date().getDate()))%num))
      })
      sessionStorage.setItem('zaduzenje',String(this.i))
      this.knjs.gettopthree().subscribe((books:Knjiga[])=>
      {
        
              this.knjs.getpic(books[0].slika).subscribe((resp)=>{
              let objectURL=URL.createObjectURL(resp)
              this.k1=this.sanit.bypassSecurityTrustUrl(objectURL)
              if(!this.k1) this.k1='/assets/knjiga.jpg';
            })
          
          
            this.knjs.getpic(books[1].slika).subscribe((resp)=>{
              let objectURL=URL.createObjectURL(resp)
              this.k2=this.sanit.bypassSecurityTrustUrl(objectURL)
              if(!this.k2) this.k2='/assets/knjiga.jpg';
            })
          
              this.knjs.getpic(books[2].slika).subscribe((resp)=>{
              let objectURL=URL.createObjectURL(resp)
              this.k3=this.sanit.bypassSecurityTrustUrl(objectURL)
              if(!this.k3) this.k3='/assets/knjiga.jpg';
              })
          
          
          
        });
  }
  saleData;
  ae:Array<String>
  i:Number
  k1:SafeUrl
  k2:SafeUrl
  k3:SafeUrl
  init:string
  rand:string

}
