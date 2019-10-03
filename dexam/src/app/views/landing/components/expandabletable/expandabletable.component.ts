import {Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {SessionData} from "../sort-paginate-table/sort-paginate-table.component";
import {SortPaginateTableService} from "../sort-paginate-table/sort-paginate-table.service";

@Component({
  selector: 'app-expandabletable',
  templateUrl: './expandabletable.component.html',
  styleUrls: ['./expandabletable.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      // state('expanded', style({height: '*'})),
      // transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ExpandabletableComponent implements OnInit {
  public opportunities;
  // columnsToDisplay = ['Subject', 'Start Date', 'Distance', 'Expected Pay', 'Details'];
  columnsToDisplay = ['subject',  'type', 'duration', 'location', 'details'];
  expandedElement: PeriodicElement;
  // dataSource = ELEMENT_DATA;
  dataSource: MatTableDataSource<PeriodicElement>;

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _expandPaginateTableService: SortPaginateTableService) { }

  ngOnInit() {
    // this.getData();
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSource.sort = this.sort;
  }

  getData() {
    this._expandPaginateTableService.list().subscribe(
        res => {
          console.log(Object.values(res));
          console.log('    ');
          console.log(JSON.stringify(res));
          this.opportunities = Array.from(Object.values(res)[1]);
          this.dataSource = new MatTableDataSource(this.opportunities);
          // this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log(this.dataSource);
        },
        err => console.error(err),
        () => console.log('successful')
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}


export interface PeriodicElement {
  type: string;
  subject: string;
  duration: number;
  location: string;
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    subject: 'Algebra 1',
    type: 'Online',
    duration: 1,
    symbol: 'H',
    location: '6 miles',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`
  },
  {
    subject: 'SAT Math',
    type: 'Online',
    duration: 2,
    symbol: 'H',
    location: '6 miles',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`
  },
  {
    subject: 'Calculus II',
    type: 'Online',
    duration: 1.5,
    symbol: 'H',
    location: '6 miles',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`
  },
  {
    subject: 'SAT English',
    type: 'Online',
    duration: 2,
    symbol: 'H',
    location: '6 miles',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`
  },
  {
    subject: 'Python programing',
    type: 'Online',
    duration: 1,
    symbol: 'H',
    location: '6 miles',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`
  },
  {
    subject: 'French Language',
    type: 'Online',
    duration: 2,
    symbol: 'H',
    location: '6 miles',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`
  },
  {
    subject: 'SAT Math',
    type: 'Online',
    duration: 1.5,
    symbol: 'H',
    location: '6 miles',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`
  },
  {
    subject: 'Photography',
    type: 'Online',
    duration: 1,
    symbol: 'H',
    location: '6 miles',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`
  },
  {
    subject: 'Guitar',
    type: 'Online',
    duration: 1,
    symbol: 'H',
    location: '6 miles',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`
  },
  {
    subject: 'Graphics designing',
    type: 'Online',
    duration: 2,
    symbol: 'H',
    location: '6 miles',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`
  },
];
