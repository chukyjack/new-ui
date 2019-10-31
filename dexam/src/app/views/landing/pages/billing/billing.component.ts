import { Component, OnInit } from '@angular/core';
import {SortPaginateTableService} from "../../components/sort-paginate-table/sort-paginate-table.service";

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  public opportunities;
  public session;
  public userId;

  constructor(private _expandPaginateTableService: SortPaginateTableService) { }

  ngOnInit() {
    this.getOpportunities();
    this.getSessionDetails();
  }

  getOpportunities() {
    this._expandPaginateTableService.list().subscribe(
        res => {
          console.log(Object.values(res));
          console.log('    ');
          console.log(JSON.stringify(res));
          this.opportunities = Array.from(Object.values(res)[1]);
        },
        err => console.error(err),
        () => console.log('successful')
    );
  }
  acceptOpportunity(opportunity) {
    opportunity.tutor = this.userId;
    console.log('this is the user id');
    console.log(this.userId);
    console.log('this is the user id');
    this._expandPaginateTableService.acceptOpportunity(opportunity).subscribe(
        res => {
          console.log(res);
        },
        err => console.error(err),
        () => console.log('succesfully accepted')
    );
    console.log('accepted opportunity' + JSON.stringify(opportunity));
  }
  getSessionDetails() {
    this._expandPaginateTableService.setUserSessionDetails().subscribe(
        res => {
          console.log(Object.values(res));
          console.log('    ');
          console.log(JSON.stringify(res));
          this.session = res;
          this.userId = res['user_id'];
          console.log('this is th session');
          console.log('this is th session');
          console.log(this.session);

        },
        err => console.error(err),
        () => console.log('successful')
    );
  }

}
