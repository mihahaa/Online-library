import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.css']
})
export class MainAdminComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  obrisi(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }

}
