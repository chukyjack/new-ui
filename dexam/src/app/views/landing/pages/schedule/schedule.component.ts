import { Component, OnInit } from '@angular/core';
import {FilterPipe} from "./filter.pipe";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  public optionsSelect: Array<any>;
  usersArray = ['MDB', 'Angular', 'Bootstrap', 'Framework', 'SPA', 'React', 'Vue'];
  public value: Date = new Date(2000, 2, 10, 10, 30, 0);

  constructor() { }

  ngOnInit() {
    this.optionsSelect = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
    ];
  }

}

