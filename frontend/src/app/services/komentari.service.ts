import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class KomentariService {

  constructor(private http:HttpClient) { 
  }

  getbookscomm(sff)
  {
    const data={
      idknjige:sff
    }
    return this.http.post('http://localhost:4000/komentar/getbookscomm',data)
  }
  getuseridcomm(sff,un)
  {
    const data={
      idknjige:sff,
      username:un
    }
    return this.http.post('http://localhost:4000/komentar/getuseridcomm',data)
  }

  ifcomm(sff,un)
  {
    const data={
      idknjige:sff,
      username:un
    }
    return this.http.post('http://localhost:4000/komentar/ifcomm',data)
  }


  addcomm(iff,uff,tff,off)
  {
    const data={
      idknjige:iff,
      username:uff,
      tekst:tff,
      ocena:off
    }
    return this.http.post('http://localhost:4000/komentar/addcomm',data)
  }

  

  changecomm(iff,uff,tff,off)
  {
    const data={
      idknjige:iff,
      username:uff,
      tekst:tff,
      ocena:off
    }
    return this.http.post('http://localhost:4000/komentar/changecomm',data)
  }
}
