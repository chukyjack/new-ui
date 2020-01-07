import { Component, OnInit } from '@angular/core';
import {InteractionMode} from "igniteui-angular";
import {SortPaginateTableService} from "../sort-paginate-table/sort-paginate-table.service";
import {ScheduleListService} from "../schedule-list/schedule-list.service";
import {ScheduleServiceService} from "../../pages/schedule/schedule-service.service";
import {MatTableDataSource} from "@angular/material/table";
import {StudentListService} from "../student-list/student-list.service";
import {IMyOptions} from "ng-uikit-pro-standard";

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.scss']
})
export class ScheduleFormComponent implements OnInit {
  public myStudents;
  public optionsSelect: Array<any>;
  public mode: InteractionMode = InteractionMode.DropDown;
  public format: string = 'hh:mm tt';
  model = new Appointment();
  submitted = false;
  public showSpinner = false;
  public optionsTutors: Array<any>;
  public optionsSubjects: Array<any>;
  public myDatePickerOptions: IMyOptions = {
        // Your options
    };
  // optionsSelect: Array<any>;
  // public date: Date = new Date(2018, 10, 27, 17, 45, 0, 0);


  constructor(private _scheduleService: ScheduleServiceService, private _studentService: StudentListService) { }

  ngOnInit() {
      this.optionsTutors = [
          { value: '1', label: 'Option 14' },
          { value: '2', label: 'Option 2' },
          { value: '3', label: 'Option 3' },
      ];
      this.optionsSubjects = [
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
          { value: '3', label: 'Option 3' },
      ];
    this.getStudents();
  }
  onSubmit() {
      this.submitted = true;
      this.createAppointment(this.model);
  }

  createAppointment(appointment) {
    this._scheduleService.postSchedule(appointment).subscribe(
        res => {
          console.log(res);
          this.showSpinner = true;
        },
        err => console.error(err),
        () => {console.log('succesfully accepted');
        this.showSpinner = false;
        }
    );
    console.log('accepted opportunity' + JSON.stringify(appointment));
  }
  getStudents() {
    this._studentService.allstudents().subscribe(
        res => {
          this.myStudents = Object.values(res)[1];
          console.log(this.myStudents);
        },
        err => console.error(err),
        () => console.log('successfully got students')
    );
  }

}

export class Appointment {
  student: number;
  subject: number;
  date: string;
  time: string;
}
