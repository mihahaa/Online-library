import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ZahteviService {

  constructor(private http:HttpClient) { }

  addreq(uff,iff)
  {
    const data={
      username:uff,
      idknjige:iff
    }
    return this.http.post('http://localhost:4000/zahtev/addreq',data)
  }

  deletereq(iff)
  {
    const data={
      id:iff
    }
    return this.http.post('http://localhost:4000/zahtev/deletereq',data)
  }

  getallreqs()
  {
    return this.http.get('http://localhost:4000/zahtev/getallreqs')
  }
}
