import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/Shared/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
   itemCount: number = 0;
  message: string;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.count.subscribe(count => this.itemCount = count);
  }

}
