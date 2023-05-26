import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Knjiga } from '../models/knjige';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { KnjigeService } from '../services/knjige.service';
import { KorisnikService } from '../services/korisnici.service';

@Component({
  selector: 'app-main-moderator',
  templateUrl: './main-moderator.component.html',
  styleUrls: ['./main-moderator.component.css']
})
export class MainModeratorComponent implements OnInit {

  constructor(private router:Router,private knjs:KnjigeService,private sanit:DomSanitizer,private ks:KorisnikService) { }

  k1:SafeUrl
  k2:SafeUrl
  k3:SafeUrl
  nesp;
  slika:string

  ngOnInit(): void {

    this.slika=sessionStorage.getItem('slika')
    this.status=sessionStorage.getItem('status')

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
        this.ks.getpic(this.slika).subscribe((data)=>{
          let url=URL.createObjectURL(data)
          this.nesp=this.sanit.bypassSecurityTrustUrl(url)
        })
  }

  profile()
  {
    this.router.navigate(['profil'])
  }

  status:string

  obrisi(){
    this.router.navigate(['']);
  }

}
