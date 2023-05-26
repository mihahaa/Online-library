import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnici';
import { KorisnikService } from '../services/korisnici.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private ks:KorisnikService) { }

  ngOnInit(): void {
    this.message=""
    this.poruke=[]
    if(!sessionStorage.getItem('koje'))
    {
      this.koje=""
    }
    else this.koje=sessionStorage.getItem('koje')
  }

  username:string;
  password:string;
  password1:string;
  adresa:string;
  ime:string;
  prezime:string;
  koje:string;
  email:string;
  telefon:string;
  image:File;
  poruke:Array<string>
  passm:string
  passcm:string
  addrm:string
  message:string;

  checkpass()
  {
    let x = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[*.!@&^%${}():;><.,?]).{8,12}$/
    let y=/^[A-Z]/
    if ((x.test(this.password) && y.test(this.password)) || this.password==undefined || this.password=="") this.passm = ''
    else this.passm = 'Vasa lozinka mora imati pocetno veliko slovo, izmedju 8 i 12 karaktera i sadrzati bar po veliko i malo slovo, broj i specijalan karakter'
  }

  samepass()
  {
    if(this.password!=this.password1 || this.password1==undefined || this.password1=="") this.passcm="Ne poklapaju se lozinke"
    else this.passcm=""
  }

  checkaddr(){
    let rx=/^[A-Z]([a-zA-Z])+\s\d+,\s(.)+$/
    if (rx.test(this.adresa) || this.adresa==undefined || this.adresa=="") this.addrm = ''
    else this.addrm="Vasa adresa mora biti oblika:Ulica broj, Grad"

  }

  validation()
  {
    this.poruke=[]
    let vr=true;
    if(this.password==undefined || this.password=="") 
    {
      this.poruke.push("Lozinka je obavezna")
      vr=false;
    }
    if(this.password1==undefined || this.password1=="") 
    {
      this.poruke.push("Potvrda lozinke je obavezna")
      vr=false;
    }
    if(this.ime==undefined || this.ime=="") 
    {
      this.poruke.push("Ime je obavezno")
      vr=false;
    }
    if(this.prezime==undefined || this.prezime=="") {
      vr=false;
      this.poruke.push("Prezime je obavezno")
    }
    if(this.email==undefined || this.email=="")
    
  {
    vr=false;
    this.poruke.push("Email je obavezan")
  }
    if(this.telefon==undefined || this.telefon=="") {
      vr=false;
      this.poruke.push("Broj telefona je obavezan")}
    if(this.adresa==undefined || this.adresa=="") {
      this.poruke.push("Adresa je obavezna")
      vr=false;
    }
    this.checkpass()
    this.samepass()
    this.checkaddr()
    if(this.passcm!="" || this.passm!="" || this.addrm!="") vr=false
    return vr
    
  }

  register()
  {
    if(this.validation()){
      this.ks.getuserid(this.username).subscribe((resp:Korisnik)=>{
        if(resp) this.poruke.push("Molim promenite korisnicko ime")
        else{
          this.ks.getusermail(this.email).subscribe((r:Korisnik)=>{
            if(r) this.poruke.push("Molim promenite email adresu")
            else 
            {
              let formdata = new FormData();

              formdata.append('username', this.username);
              formdata.append('ime', this.ime);
              formdata.append('prezime', this.prezime);
              formdata.append('adresa', this.adresa);
              formdata.append('lozinka', this.password);
              formdata.append('email', this.email);
              formdata.append('telefon', this.telefon);
              if(this.image)
              {
                formdata.append('slika', this.image,this.image.name);
                this.ks.register(formdata).subscribe((resp) => {
                  this.message="Uspesno ste se registrovali"
                });
              }
              else
              {
                this.ks.registerwp(formdata).subscribe((resp) => {
                  this.message="Uspesno ste se registrovali"
                });
              }
            }
          })
        }
      })
    
  }
    }

  onFileChanged(event) {
    if (event.target.value) {
        this.image = event.target.files[0];
    }
      else this.image=null as any;
  }
}
