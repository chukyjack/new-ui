import { NgModule } from "@angular/core";
import { BlogDetailsPageComponent } from './blog-details-page/blog-details-page.component';
import { LandingV4Component } from './landing-v4/landing-v4.component';
import { LandingV2Component } from './landing-v2/landing-v2.component';

import { Routes, RouterModule } from '@angular/router';
import { LandingV1Component } from './landing-v1/landing-v1.component';
import { LandingV3Component } from './landing-v3/landing-v3.component';
import { LandingV5Component } from './landing-v5/landing-v5.component';
import { LandingV6Component } from './landing-v6/landing-v6.component';
import { LandingV7Component } from './landing-v7/landing-v7.component';
import { LandingV8Component } from './landing-v8/landing-v8.component';
import { LandingV9Component } from './landing-v9/landing-v9.component';
import { LandingV10Component } from './landing-v10/landing-v10.component';
import { DemosComponent } from './components/demos/demos.component';
import { LandingV11Component } from "./landing-v11/landing-v11.component";
import {CoursepageComponent} from "./pages/coursepage/coursepage.component";
import {InvoicepageComponent} from "./pages/invoicepage/invoicepage.component";
import {OpportunitypageComponent} from "./pages/opportunitypage/opportunitypage.component";
import {SchedulepageComponent} from "./pages/schedulepage/schedulepage.component";
import {StudentspageComponent} from "./pages/studentspage/studentspage.component";
import {TutorpageComponent} from "./pages/tutorpage/tutorpage.component";
import {UserprofilepageComponent} from "./pages/userprofilepage/userprofilepage.component";

const routes: Routes = [
  {
    path: "v1",
    component: LandingV1Component
  },
  {
    path: "v2",
    component: LandingV2Component
  },
  {
    path: "v3",
    component: LandingV3Component
  },
  {
    path: "v4",
    component: LandingV4Component
  },
  {
    path: "v5",
    component: LandingV5Component
  },
  {
    path: "v6",
    component: LandingV6Component
  }
  ,
  {
    path: "v7",
    component: LandingV7Component
  },

   {
    path: "v8",
    component: LandingV8Component
  },

  {
    path: "v9",
    component: LandingV9Component
  },

  {
    path: "v10",
    component: LandingV10Component
  },
  {
    path: "v11",
    component: LandingV11Component
  },
  {
    path: "blog-details",
    component: BlogDetailsPageComponent
  },
  {
    path: 'course',
    component: CoursepageComponent
  },
  {
    path: 'schedule',
    component: SchedulepageComponent
  },
  {
    path: 'opportunities',
    component: OpportunitypageComponent
  },
  {
    path: 'billing',
    component: InvoicepageComponent
  },
  {
    path: 'students',
    component: StudentspageComponent
  },
  {
    path: 'tutors',
    component: TutorpageComponent
  },
  {
    path: 'profile',
    component: UserprofilepageComponent
  },
   {
    path: "demos",
    component: DemosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
