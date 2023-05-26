import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  constructor(private http:HttpClient) { }

  register(data){
    return this.http.post('http://localhost:4000/korisnik/register',data)
  }

  registerwp(data){
    return this.http.post('http://localhost:4000/korisnik/registerwp',data)
  }

  login(uff,pff){
    const data={
      username:uff,
      password:pff
    }
    return this.http.post('http://localhost:4000/korisnik/login',data)
  }
  loginadmin(uff,pff){
    const data={
      username:uff,
      password:pff
    }
    return this.http.post('http://localhost:4000/korisnik/loginadmin',data)
  }

  getuser(uff)
  {
    const data={username:uff}
    return this.http.post('http://localhost:4000/korisnik/getuser',data)
  }

  getuserid(uff)
  {
    const data={username:uff}
    return this.http.post('http://localhost:4000/korisnik/getuserid',data)
  }

  getpic(sff)
  {
    const data={
      slika:sff
    }
    return this.http.post('http://localhost:4000/korisnik/getpic',data,{responseType:'blob'})
  }

  changepass(uff,pff)
  {
    const data={
      username:uff,
      password:pff
        }
    return this.http.post('http://localhost:4000/korisnik/changepass',data)
  }

  checkuserpass(uff,pff)
  {
    const data={
      username:uff,
      password:pff
    }
    return this.http.post('http://localhost:4000/korisnik/checkuserpass',data)
  }

  getallusers()
  {
    return this.http.get('http://localhost:4000/korisnik/getallusers')
  }

  update(data){
    return this.http.post('http://localhost:4000/korisnik/update',data)
  }

  updatewp(data){
    return this.http.post('http://localhost:4000/korisnik/updatewp',data)
  }

  deleteuser(uff)
  {
    const data={username:uff}
    return this.http.post('http://localhost:4000/korisnik/delete',data)
  }

  blkuser(uff)
  {
    const data={username:uff}
    return this.http.post('http://localhost:4000/korisnik/blkuser',data)
  }

  unblkuser(uff)
  {
    const data={username:uff}
    return this.http.post('http://localhost:4000/korisnik/unblkuser',data)
  }

  upguser(uff)
  {
    const data={username:uff}
    return this.http.post('http://localhost:4000/korisnik/upguser',data)
  }

  getusermail(uff)
  {
    const data={email:uff}
    return this.http.post('http://localhost:4000/korisnik/getusermail',data)
  }

  dwnguser(uff)
  {
    const data={username:uff}
    return this.http.post('http://localhost:4000/korisnik/dwnguser',data)
  }

  borrow(uff)
  {
    const data={username:uff}
    return this.http.post('http://localhost:4000/korisnik/borrow',data)
  }

  returnb(uff)
  {
    const data={username:uff}
    return this.http.post('http://localhost:4000/korisnik/returnb',data)
  }
  
  


}
