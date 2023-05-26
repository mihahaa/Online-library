import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ZaduzenjaService {

  constructor(private http:HttpClient) { }


  getallbrrwsold(uff)
  {
    const data={
      username:uff
    }
    return this.http.post('http://localhost:4000/zaduzenje/getallbrrwsold',data)
  }

  getallbrrwsact(uff)
  {
    const data={
      username:uff
    }
    return this.http.post('http://localhost:4000/zaduzenje/getallbrrwsact',data)
  }

  hadbrwd(uff,iff)
  {
    const data={
      username:uff,
      idknjige:iff
    }
    return this.http.post('http://localhost:4000/zaduzenje/hadbrwd',data)
  }
  returnbook(uff,iff,dff)
  {
    const data={
      username:uff,
      idknjige:iff,
      d:dff
    }
    return this.http.post('http://localhost:4000/zaduzenje/returnbook',data)
  }

  addborrow(uff,iff,dpff,dkff)
  {
    const data={
      username:uff,
      idknjige:iff,
      daniip:dpff,
      daniik:dkff
    }
    return this.http.post('http://localhost:4000/zaduzenje/addborrow',data)
  }

  updatedays(uff,iff,dff)
  {
    const data={
      username:uff,
      idknjige:iff,
      danii:dff
    }
    return this.http.post('http://localhost:4000/zaduzenje/updatedays',data)
  }


}
