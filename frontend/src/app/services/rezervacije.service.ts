import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RezervacijeService {

  constructor(private http:HttpClient) { }

  hadrez(uff,iff)
  {
    const data={
      username:uff,
      idknjige:iff
    }
    return this.http.post('http://localhost:4000/rezervacija/hadrez',data)
  }

  allbookrez(uff)
  {
    const data={
      id:uff
    }
    return this.http.post('http://localhost:4000/rezervacija/allbookrez',data)
  }

  allbookrez1(uff)
  {
    const data={
      id:uff
    }
    return this.http.post('http://localhost:4000/rezervacija/allbookrez1',data)
  }

  updaterez(uff)
  {
    const data={
      id:uff
    }
    return this.http.post('http://localhost:4000/rezervacija/updaterez',data)
  }

  finishrez(uff)
  {
    const data={
      id:uff
    }
    return this.http.post('http://localhost:4000/rezervacija/finishrez',data)
  }

  numofrez()
  {
    return this.http.get('http://localhost:4000/rezervacija/numofrez')
  }

  addrez(uff,ikff,iff)
  {
    const data={
      username:uff,
      idknjige:ikff,
      id:iff
    }
    return this.http.post('http://localhost:4000/rezervacija/addrez',data)
  }


}
