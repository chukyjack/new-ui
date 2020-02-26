import { Component, OnInit } from '@angular/core';
import {Gig} from "./state/gig.model";
import {Observable} from "rxjs";
import {GigsQuery} from "./state/gigs.query";
import {GigsService} from "./state/gigs.service";

@Component({
  selector: 'app-quick-gigs',
  // templateUrl: './quick-gigs.component.html',
  template: `
    <div class="container">

      <app-infinite-scroll (scrolled)="onScroll()" style="height: 400px; overflow-y: auto">
        <app-gig *ngFor="let gig of gigs$ | async" [gig]="gig"></app-gig>

        <div class="alert alert-dark"*ngIf="isLoading$ | async">
          Fetching tweets...
        </div>
      </app-infinite-scroll>

    </div>
  `,
  styleUrls: ['./quick-gigs.component.scss']
})
export class QuickGigsComponent implements OnInit {
  gigs$: Observable<Gig[]>;
  isLoading$: Observable<boolean>;

  constructor(
      private gigsQuery: GigsQuery,
      private gigsService: GigsService
  ) { }

  ngOnInit() {
    this.fetchGigs();
    this.gigs$ = this.gigsQuery.selectAll();
    this.isLoading$ = this.gigsQuery.selectLoading();
  }

  onScroll() {
    this.fetchGigs();
  }

  private fetchGigs() {
    if (this.gigsQuery.getHasMore()) {
      this.gigsService.get(this.gigsQuery.getPage());
    }
  }
}
