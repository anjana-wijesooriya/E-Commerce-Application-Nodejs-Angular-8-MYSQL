import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  constructor(){
    const serverURL = 'https://turing-tshirtshop-by-anjana.herokuapp.com/api/';
    localStorage.setItem('ServerUrl', serverURL);
  }
}
