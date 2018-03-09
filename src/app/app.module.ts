import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {NavigationComponent} from './navigation/navigation.component';
import {FooterComponent} from './footer/footer.component';
import {PagerComponent} from './calendar/pager/pager.component';
import {MonthStatisticsComponent} from './calendar/month-statistics/month-statistics.component';
import {DayComponent} from './day/day.component';
import { DayStatisticsComponent } from './day/day-statistics/day-statistics.component';
import { NewTaskModalComponent } from './day/new-task-modal/new-task-modal.component';
import { CalendarComponent } from './calendar/calendar.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EditTaskModalComponent } from './day/edit-task-modal/edit-task-modal.component';

const appRoutes: Routes = [
  {
    path: 'day/:visibleYear/:visibleMonth/:numberOfDay',
    component: DayComponent
  },
  {
    path: 'month',
    component: CalendarComponent
  },
  {
    path: '',
    redirectTo: '/month',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    PagerComponent,
    MonthStatisticsComponent,
    DayComponent,
    DayStatisticsComponent,
    NewTaskModalComponent,
    CalendarComponent,
    EditTaskModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
