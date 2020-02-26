import {Component, Input, OnInit} from '@angular/core';
import {Gig} from "../../pages/quick-gigs/state/gig.model";

@Component({
  selector: 'app-gig',
  template: `
  <div class="card" *ngIf="gig">
   <div class="card-body">
    <h5 class="card-title">{{ gig.title }}</h5>
    <p class="card-text">{{ gig.text }}</p>
  </div>
  </div>
  `,
  styleUrls: ['./gig.component.scss']
})
export class GigComponent implements OnInit {
  @Input() gig: Gig;

  constructor() { }

  ngOnInit() {
  }

}
