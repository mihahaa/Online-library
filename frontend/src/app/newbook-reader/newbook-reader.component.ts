import { Component, OnInit } from '@angular/core';
import { Knjiga } from '../models/knjige';
import { KnjigeService } from '../services/knjige.service';
import { ZahteviService } from '../services/zahtevi.service';

@Component({
  selector: 'app-newbook-reader',
  templateUrl: './newbook-reader.component.html',
  styleUrls: ['./newbook-reader.component.css']
})
export class NewbookReaderComponent implements OnInit {

  constructor(private knjs:KnjigeService,private zahs:ZahteviService) { }

  username:string

  ngOnInit(): void {
    this.m1=""
    this.message=""
    this.username=sessionStorage.getItem('username')
  }

  num:number

  addbook()
  {
    if(this.naziv==undefined || this.naziv=="" || this.godina==undefined || this.godina=="" ||
    this.izdavac==undefined || this.izdavac=="" || this.autori==undefined || this.autori=="" || 
    this.zanrovi==undefined || this.zanrovi=="" || this.jezik==undefined || this.jezik=="")
      this.message="Sva polja osim slike su obavezna!"
      else
      {
    let formdata = new FormData();

    this.knjs.getallbooks().subscribe((boo:Knjiga[])=>{
      this.knjs.numofbooks().subscribe((n:number)=>{
        if(n>0) this.num=boo[n-1].id+1
        else this.num=0
        formdata.append('num',String(this.num))
        formdata.append('naziv', this.naziv);
    formdata.append('godina', this.godina);
    formdata.append('izdavac', this.izdavac);
    formdata.append('autori', this.autori);
    formdata.append('zanrovi', this.zanrovi);
    formdata.append('jezik', this.jezik);
    formdata.append('username',this.username)
      if(this.image)
      {
        formdata.append('slika', this.image,this.image.name);
        this.knjs.addbookreader(formdata).subscribe((resp) => {
            this.zahs.addreq(this.username,this.num).subscribe((resp)=>{
              this.message="Vas zahtev je prihvacen"
            })
          
        });
      }
      else
      {
        this.knjs.addbookreaderwp(formdata).subscribe((resp) => {
            this.zahs.addreq(this.username,this.num).subscribe((resp)=>{
              this.message="Vas zahtev je prihvacen"
            })
          
        });
      }
      })
    })
    
    }
      
  }

  onFileChanged(event) {
    if (event.target.value) {
        this.image = event.target.files[0];
    }
      else this.image=null as any;
  }

  naziv:string;
  izdavac:string;
  autori:string;
  jezik:string;
  godina:string;
  zanrovi:string;
  image:File;
  message:string;
  m1:string;

}
