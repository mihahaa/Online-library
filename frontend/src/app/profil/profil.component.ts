import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnici';
import { KorisnikService } from '../services/korisnici.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ZaduzenjaService } from '../services/zaduzenja.service';
import { Zaduzenje } from '../models/zaduzenja';
import { KnjigeService } from '../services/knjige.service';
import { Knjiga } from '../models/knjige';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor(private ks:KorisnikService,private sanitizer:DomSanitizer,private zads:ZaduzenjaService,private knjs:KnjigeService) { }

  sd;
  sd1;

  ngOnInit(): void {
    this.addrm=""
    this.napravi();
    this.allbrw=[]
    this.koje=sessionStorage.getItem('koje');
    this.image=null;
    this.nes=null
    this.allbooks=[]
    this.ks.getpic(this.slika).subscribe((data)=>{
      let url=URL.createObjectURL(data)
      this.nes=this.sanitizer.bypassSecurityTrustUrl(url)
    })
    this.zads.getallbrrwsold(this.username).subscribe((resp:Zaduzenje[])=>{
      this.allbrw=resp
      this.allbrw.forEach((elem:Zaduzenje)=>{
        let gp=new Date(elem.datumod).getFullYear();
        let gk=new Date(elem.datumdo).getFullYear();
        let mp=new Date(elem.datumod).getMonth();
        let mk=new Date(elem.datumdo).getMonth();
        while(gp!=gk || mp!=mk)
        {
          this.brmes[mp]++;
          mp++;
          if(mp==12) 
          {
            mp=0;
            gp++;
          }
        }
        this.brmes[mk]++;
        this.sd1 = [
          { name: "Januar", value: this.brmes[0] },
          { name: "Februar", value: this.brmes[1] },
          { name: "Mart", value: this.brmes[2] },
          { name: "April", value: this.brmes[3] },
          { name: "Maj", value: this.brmes[4] },
          { name: "Jun", value: this.brmes[5] },
          { name: "Jul", value: this.brmes[6] },
          { name: "Avgust", value: this.brmes[7] },
          { name: "Septembar", value: this.brmes[8] },
          { name: "Oktobar", value: this.brmes[9] },
          { name: "Novembar", value: this.brmes[10] },
          { name: "Decembar", value: this.brmes[11] },
        ];
        this.knjs.getrandbook(elem.idknjige).subscribe((e:Knjiga)=>{
          this.c=-1
          this.p=0
          while(1)
          {
            this.c=e.zanrovi.substring(this.p,this.p+e.zanrovi.length).indexOf(",")
            if(this.c==-1) break
              if(e.zanrovi.substring(this.p,this.p+this.c)=='drama')
                this.brzanr[0]++;
              if(e.zanrovi.substring(this.p,this.p+this.c)=='klasika')
                this.brzanr[1]++;
              if(e.zanrovi.substring(this.p,this.p+this.c)=='akcija')
                this.brzanr[2]++;
              if(e.zanrovi.substring(this.p,this.p+this.c)=='humor')
                this.brzanr[3]++;
              if(e.zanrovi.substring(this.p,this.p+this.c)=='fantazija')
                this.brzanr[4]++;
              if(e.zanrovi.substring(this.p,this.p+this.c)=='triler')
                this.brzanr[5]++;
              if(e.zanrovi.substring(this.p,this.p+this.c)=='romansa')
                this.brzanr[6]++;
              if(e.zanrovi.substring(this.p,this.p+this.c)=='poezija')
                this.brzanr[7]++;
              if(e.zanrovi.substring(this.p,this.p+this.c)=='edukacija')
                this.brzanr[8]++;
              if(e.zanrovi.substring(this.p,this.p+this.c)=='horor')
                this.brzanr[9]++;
              if(e.zanrovi.substring(this.p,this.p+this.c)=='fikcija')
                this.brzanr[10]++;
              if(e.zanrovi.substring(this.p,this.p+this.c)=='istorija')
                this.brzanr[11]++;

              this.p=this.p+this.c+1
          }
              if(e.zanrovi.substring(this.p,this.p+e.zanrovi.length)=='drama')
                this.brzanr[0]++;
              if(e.zanrovi.substring(this.p,this.p+e.zanrovi.length)=='klasika')
                this.brzanr[1]++;
              if(e.zanrovi.substring(this.p,this.p+e.zanrovi.length)=='akcija')
                this.brzanr[2]++;
              if(e.zanrovi.substring(this.p,this.p+e.zanrovi.length)=='humor')
                this.brzanr[3]++;
              if(e.zanrovi.substring(this.p,this.p+e.zanrovi.length)=='fantazija')
                this.brzanr[4]++;
              if(e.zanrovi.substring(this.p,this.p+e.zanrovi.length)=='triler')
                this.brzanr[5]++;
              if(e.zanrovi.substring(this.p,this.p+e.zanrovi.length)=='romansa')
                this.brzanr[6]++;
              if(e.zanrovi.substring(this.p,this.p+e.zanrovi.length)=='poezija')
                this.brzanr[7]++;
              if(e.zanrovi.substring(this.p,this.p+e.zanrovi.length)=='edukacija')
                this.brzanr[8]++;
              if(e.zanrovi.substring(this.p,this.p+e.zanrovi.length)=='horor')
                this.brzanr[9]++;
              if(e.zanrovi.substring(this.p,this.p+e.zanrovi.length)=='fikcija')
                this.brzanr[10]++;
              if(e.zanrovi.substring(this.p,this.p+e.zanrovi.length)=='istorija')
                this.brzanr[11]++;
                this.sd = [
                  { name: "Drama", value: this.brzanr[0] },
                  { name: "Klasika", value: this.brzanr[1] },
                  { name: "Akcija", value: this.brzanr[2] },
                  { name: "Humor", value: this.brzanr[3] },
                  { name: "Fantazija", value: this.brzanr[4] },
                  { name: "Triler", value: this.brzanr[5] },
                  { name: "Romansa", value: this.brzanr[6] },
                  { name: "Poezija", value: this.brzanr[7] },
                  { name: "Edukacija", value: this.brzanr[8] },
                  { name: "Horor", value: this.brzanr[9] },
                  { name: "Fikcija", value: this.brzanr[10] },
                  { name: "Istorija", value: this.brzanr[11] },
                ];
        })
        
      })
      
      
    })
    
    
  }
  p:number
  c:number
  koje:string;
  allbooks:Array<Knjiga>
  allbrw:Zaduzenje[]
  brzanr:number[]=[0,0,0,0,0,0,0,0,0,0,0,0]
  brmes:number[]=[0,0,0,0,0,0,0,0,0,0,0,0]
  onFileChanged(event) {
    if (event.target.value) {
        this.image = event.target.files[0];
    }
      else this.image=null as any;
  }

  update()
  {
    this.checkaddr()
    if(this.addrm=="")
    {
    let formdata = new FormData();
      if(this.usernamee==undefined || this.usernamee=="")
        formdata.append('username', this.username);
      else formdata.append('username', this.usernamee);
      if(this.imee==undefined || this.imee=="")
        formdata.append('ime', this.ime);
      else formdata.append('ime', this.imee);
      if(this.prezimee==undefined || this.prezime=="")
        formdata.append('prezime', this.prezime);
      else formdata.append('prezime', this.prezimee);
      if(this.adresaa==undefined || this.adresaa=="")
        formdata.append('adresa', this.adresa);
      else formdata.append('adresa', this.adresaa);
      if(this.emaill==undefined || this.emaill=="")
        formdata.append('email', this.email);
      else formdata.append('email', this.emaill);
      if(this.telefonn==undefined || this.telefonn=="")
        formdata.append('telefon', this.telefon);
      else formdata.append('telefon', this.telefonn);  
      if(this.koje=='reader') formdata.append('tip','citalac');
      else formdata.append('tip','moderator');
      if(this.image)
      {
        formdata.append('slika', this.image,this.image.name);
        this.ks.update(formdata).subscribe((resp) => {
          sessionStorage.removeItem('username')
          sessionStorage.removeItem('ime')
          sessionStorage.removeItem('prezime')
          sessionStorage.removeItem('adresa')
          sessionStorage.removeItem('email')
          sessionStorage.removeItem('telefon')
          sessionStorage.removeItem('username')
          if(this.usernamee==undefined || this.usernamee=="")
            
          {
            sessionStorage.setItem('username', this.username);
            this.ks.getuserid(this.username).subscribe((user:Korisnik)=>{
              sessionStorage.removeItem('slika')
              sessionStorage.setItem('slika',user.slika)
              
          if(this.imee==undefined || this.imee=="")
          sessionStorage.setItem('ime', this.ime);
          else sessionStorage.setItem('ime', this.imee);
          if(this.prezimee==undefined || this.prezimee=="")
          sessionStorage.setItem('prezime', this.prezime);
          else sessionStorage.setItem('prezime', this.prezimee);
          if(this.adresaa==undefined || this.adresaa=="")
          sessionStorage.setItem('adresa', this.adresa);
          else sessionStorage.setItem('adresa', this.adresaa);
          if(this.emaill==undefined || this.emaill=="")
          sessionStorage.setItem('email', this.email);
          else sessionStorage.setItem('email', this.emaill);
          if(this.telefonn==undefined || this.telefonn=="")
          sessionStorage.setItem('telefon', this.telefon);
          else sessionStorage.setItem('telefon', this.telefonn);  
          if(this.koje=='reader') sessionStorage.setItem('tip','citalac');
          else sessionStorage.setItem('tip','moderator');
          this.message=resp['message'];
          this.ngOnInit()
            })
          }
          else 
          {
            sessionStorage.setItem('username', this.usernamee);
            this.ks.getuserid(this.usernamee).subscribe((user:Korisnik)=>{
              sessionStorage.removeItem('slika')
              sessionStorage.setItem('slika',user.slika)

              if(this.imee==undefined || this.imee=="")
              sessionStorage.setItem('ime', this.ime);
              else sessionStorage.setItem('ime', this.imee);
              if(this.prezimee==undefined || this.prezimee=="")
              sessionStorage.setItem('prezime', this.username);
              else sessionStorage.setItem('prezime', this.prezimee);
              if(this.adresaa==undefined || this.adresaa=="")
              sessionStorage.setItem('adresa', this.adresa);
              else sessionStorage.setItem('adresa', this.adresaa);
              if(this.emaill==undefined || this.emaill=="")
              sessionStorage.setItem('email', this.email);
              else sessionStorage.setItem('email', this.emaill);
              if(this.telefonn==undefined || this.telefonn=="")
              sessionStorage.setItem('telefon', this.telefon);
              else sessionStorage.setItem('telefon', this.telefonn);  
              if(this.koje=='reader') sessionStorage.setItem('tip','citalac');
              else sessionStorage.setItem('tip','moderator');
              this.message=resp['message'];
              this.ngOnInit()
            })
          }
        });
      }
      else
      {
        this.ks.updatewp(formdata).subscribe((resp) => {
          sessionStorage.removeItem('username')
          sessionStorage.removeItem('ime')
          sessionStorage.removeItem('prezime')
          sessionStorage.removeItem('adresa')
          sessionStorage.removeItem('email')
          sessionStorage.removeItem('telefon')
          sessionStorage.removeItem('username')
          if(this.usernamee==undefined || this.usernamee=="")
            sessionStorage.setItem('username', this.username);
          else sessionStorage.setItem('username', this.usernamee);
          if(this.imee==undefined || this.imee=="")
          sessionStorage.setItem('ime', this.ime);
          else sessionStorage.setItem('ime', this.imee);
          if(this.prezimee==undefined || this.prezime=="")
          sessionStorage.setItem('prezime', this.prezime);
          else sessionStorage.setItem('prezime', this.prezimee);
          if(this.adresaa==undefined || this.adresaa=="")
          sessionStorage.setItem('adresa', this.adresa);
          else sessionStorage.setItem('adresa', this.adresaa);
          if(this.emaill==undefined || this.emaill=="")
          sessionStorage.setItem('email', this.email);
          else sessionStorage.setItem('email', this.emaill);
          if(this.telefonn==undefined || this.telefonn=="")
          sessionStorage.setItem('telefon', this.telefon);
          else sessionStorage.setItem('telefon', this.telefonn);  
          if(this.koje=='reader') sessionStorage.setItem('tip','citalac');
          else sessionStorage.setItem('tip','moderator');
          this.message=resp['message'];
          this.ngOnInit()
        });
      }
    }
    
  }
    
  message:string;
  ime:string;
  prezime:string;
  username:string;
  adresa:string;
  telefon:string;
  email:string;
  imee:string;
  status:string
  prezimee:string;
  usernamee:string;
  adresaa:string;
  telefonn:string;
  emaill:string;
  slika:string;
  image:File;
  nes;
  addrm:string

  napravi()
  {
    this.username=sessionStorage.getItem('username');
    this.ime=sessionStorage.getItem('ime');
    this.prezime=sessionStorage.getItem('prezime');
    this.adresa=sessionStorage.getItem('adresa');
    this.email=sessionStorage.getItem('email');
    this.telefon=sessionStorage.getItem('telefon');
    this.slika=sessionStorage.getItem('slika');
    this.status=sessionStorage.getItem('status')
    this.nes=null as any;
  }

  checkaddr(){
    let rx=/^[A-Z]([a-zA-Z])+\s\d+,\s(.)+$/
    if (rx.test(this.adresaa) || this.adresaa==undefined || this.adresaa=="") this.addrm = ''
    else this.addrm="Vasa adresa mora biti oblika:Ulica broj, Grad"

  }

}
