import { Component ,OnInit} from '@angular/core';
import { KnjigeService } from './services/knjige.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  constructor(private knjs:KnjigeService) { }

  ngOnInit(): void {
    
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
}
