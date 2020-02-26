import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {MdbTableDirective, MdbTablePaginationComponent} from "ng-uikit-pro-standard";
import {ScheduleListService} from "../../components/schedule-list/schedule-list.service";
import {IsLoadingService} from "@service-work/is-loading";
import {SortPaginateTableService} from "../../components/sort-paginate-table/sort-paginate-table.service";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, AfterViewInit {
  // @ts-ignore
  @ViewChild(MdbTableDirective, { static : true }) mdbTable: MdbTableDirective;
  // @ts-ignore
  @ViewChild(MdbTableDirective, { static : true }) mdbTable2: MdbTableDirective;
  // @ts-ignore
  @ViewChild(MdbTablePaginationComponent, { static : true }) mdbTablePagination: MdbTablePaginationComponent;
  // @ts-ignore
  @ViewChild('row', { static : true }) row: ElementRef;

  maxVisibleItems: number = 8;
  public elements: any = new Array(this.maxVisibleItems * 5);
  headElements = ['Name', 'Subject', 'Time', 'Location'];
  pendingHeadElements = ['Name', 'Subject', 'Time', 'Action'];

  searchText: string = '';
  previous: string;
  public schedules;
  pendingSchedules;
  public show = false;
  public session;
  public userId;

  constructor(
      private _scheduleService: ScheduleListService,
      private cdRef: ChangeDetectorRef,
      private loader: IsLoadingService,
      private _expandPaginateTableService: SortPaginateTableService
  ) { }

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  ngOnInit() {
    this.getSessionDetails();
    this.getSchedules();

    this.mdbTable.setDataSource(this.elements);
    console.log('setting data');
    console.log(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
    // this.loader.remove();
  }

  addNewRow() {
    this.mdbTable.addRow({
      id: this.elements.length.toString(),
      first: 'Wpis ' + this.elements.length,
      last: 'Last ' + this.elements.length,
      handle: 'Handle ' + this.elements.length
    });
    this.emitDataSourceChange();
  }

  addNewRowAfter() {
    this.mdbTable.addRowAfter(1, {id: '2', first: 'Nowy', last: 'Row', handle: 'Kopytkowy'});
    this.mdbTable.getDataSource().forEach((el: any, index: any) => {
      el.id = (index + 1).toString();
    });
    this.emitDataSourceChange();
  }

  removeLastRow() {
    this.mdbTable.removeLastRow();
    this.emitDataSourceChange();
    this.mdbTable.rowRemoved().subscribe((data: any) => {
      console.log(data);
    });
  }

  removeRow() {
    this.mdbTable.removeRow(1);
    this.mdbTable.getDataSource().forEach((el: any, index: any) => {
      el.id = (index + 1).toString();
    });
    this.emitDataSourceChange();
    this.mdbTable.rowRemoved().subscribe((data: any) => {
      console.log(data);
    });
  }

  emitDataSourceChange() {
    this.mdbTable.dataSourceChange().subscribe((data: any) => {
      console.log(data);
    });
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();

    this.mdbTable.searchDataObservable(this.searchText).subscribe(() => {
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
    });
  }
  getSchedules() {
    this._scheduleService.list().subscribe(
        res => {
          console.log(res);
          this.loader.add();
          this.schedules = Object.values(res)[1];
          // this.dataSource = new MatTableDataSource(this.schedules);
          this.elements = this.schedules.filter(this.filterConfirmedSchedule);
          this.pendingSchedules = this.schedules.filter(this.filterPendingSchedule);
          console.log(this.pendingSchedules);
          // console.log(this.elements);
          console.log(this.elements + 'elememts');
          // this.dataSource.paginator = this.paginator;
          // this.dataSource.sort = this.sort;
        },
        err => console.error(err),
        () => this.loader.remove()
    );
  }
  confirmSchedule(id, data) {
    data = {
      status: 1
    }
    // data = {
    //   "contact": "702503495",
    //   "end_time": "2019-10-09T06:13:48",
    //   "id": 1,
    //   "location": "henderson",
    //   "name": "Emenike Obi",
    //   "resource_uri": "/api/v1/schedule/1/",
    //   "start_time": "09 Oct, 06:13AM",
    //   "status": "pending",
    //   "student": 1,
    //   "subject": "mathematics",
    //   "tutor": 4,
    //   "type": 2
    // }

    this.loader.add();
    this._scheduleService.confirm(id, data).subscribe(
        res => {
          console.log(res);
          console.log(this.elements);
          console.log(this.elements + 'elememts');
        },
        err => console.error(err),
        // () => this.isLoadingService.remove()
    );
  }
  filterPendingSchedule(schedule) {
    return schedule.status === 'pending';
  }

  filterConfirmedSchedule(schedule) {
    return schedule.status === 'confirmed';
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
  formatDateTime(date: string) {
    console.log(date);
    const newdate = date.replace(/-/gi, ':');
    console.log(newdate);
    return newdate;
  }
}


