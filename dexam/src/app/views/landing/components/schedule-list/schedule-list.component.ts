import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Opportunity} from "../opportunity/opportunity";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ScheduleListService} from "./schedule-list.service";
import {Schedule} from './schedule';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  // templateUrl: '../sort-paginate-table/sort-paginate-table.component.html',
  styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent implements OnInit {
  public schedules;
  public opportunities1;
  displayedColumns: string[] = ['student', 'time', 'accept'];
  dataSource: MatTableDataSource<Schedule>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _scheduleService: ScheduleListService) { }

  ngOnInit() {
    this.getSchedules();
  }

  getSchedules() {
    this._scheduleService.list().subscribe(
        res => {
          this.schedules = Object.values(res)[1];
          this.dataSource = new MatTableDataSource(this.schedules);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        err => console.error(err),
        () => console.log('successfully got schedules')
    );
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
