import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './filter.pipe';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';

//I keep the new line
@NgModule({
    declarations: [AppComponent, FilterPipe],
    imports: [
        BrowserModule,
        SharedModule,
        HttpClientModule,
        BrowserAnimationsModule,

        AppRoutingModule,

        DateInputsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
