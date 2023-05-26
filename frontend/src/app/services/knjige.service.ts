import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class KnjigeService {

  constructor(private http:HttpClient) { }

  addbook(data){
    return this.http.post('http://localhost:4000/knjiga/addbook',data)
  }

  addbookwp(data){
    return this.http.post('http://localhost:4000/knjiga/addbookwp',data)
  }

  getpic(sff)
  {
    const data={
      slika:sff
    }
    return this.http.post('http://localhost:4000/knjiga/getpic',data,{responseType:'blob'})
  }

  getpicrand(sff)
  {
    const data={
      broj:sff
    }
    return this.http.post('http://localhost:4000/knjiga/getpicrand',data,{responseType:'blob'})
  }
  numofbooks()
  {
    return this.http.get('http://localhost:4000/knjiga/numofbooks')
  }

  numofappbooks()
  {
    return this.http.get('http://localhost:4000/knjiga/numofappbooks')
  }

  gettopthree()
  {
    return this.http.get('http://localhost:4000/knjiga/gettopthree')
  }

  getallbooks()
  {
    return this.http.get('http://localhost:4000/knjiga/getallbooks')
  }

  getappbooks()
  {
    return this.http.get('http://localhost:4000/knjiga/getappbooks')
  }
  
  getrandbook(sff)
  {
    const data={
      broj:sff
    }
    return this.http.post('http://localhost:4000/knjiga/getrandbook',data)
  }

  deletebook(sff)
  {
    const data={
      id:sff
    }
    return this.http.post('http://localhost:4000/knjiga/delete',data)
  }

  updaterat(iff,off)
  {
    const data={
      id:iff,
      ocena:off
    }
    return this.http.post('http://localhost:4000/knjiga/updaterat',data)
  }

  update(data){
    return this.http.post('http://localhost:4000/knjiga/update',data)
  }

  updatewp(data){
    return this.http.post('http://localhost:4000/knjiga/updatewp',data)
  }

  addbookreader(data){
    return this.http.post('http://localhost:4000/knjiga/addbookreader',data)
  }

  addbookreaderwp(data){
    return this.http.post('http://localhost:4000/knjiga/addbookreaderwp',data)
  }

  search(nff,aff)
  {
    const data={
      naziv:nff,
      autori:aff
    }
    return this.http.post('http://localhost:4000/knjiga/search',data)
  }
  searchadv(nff,aff,zff,iff,pff,kff)
  {
    const data={
      naziv:nff,
      autori:aff,
      zanr:zff,
      izdavac:iff,
      pocgod:pff,
      krajgod:kff
    }
    return this.http.post('http://localhost:4000/knjiga/searchadv',data)
  }

  approvebook(iff)
  {
    const data={
      id:iff
    }
    return this.http.post('http://localhost:4000/knjiga/approvebook',data)
  }

  returnbook(iff)
  {
    const data={
      id:iff
    }
    return this.http.post('http://localhost:4000/knjiga/returnbook',data)
  }

  declinebook(iff)
  {
    const data={
      id:iff
    }
    return this.http.post('http://localhost:4000/knjiga/declinebook',data)
  }

  borrowbook(iff)
  {
    const data={
      id:iff
    }
    return this.http.post('http://localhost:4000/knjiga/borrowbook',data)
  }

  getapproved(iff)
  {
    const data={
      username:iff
    }
    return this.http.post('http://localhost:4000/knjiga/getapproved',data)
  }
}
