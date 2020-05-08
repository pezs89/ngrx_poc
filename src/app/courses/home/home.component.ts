import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { map, shareReplay } from 'rxjs/operators';
import { CoursesHttpService } from '../services/courses-http.service';
import { CoursesState } from '../store/courses.reducer';
import { Store, select } from '@ngrx/store';
import * as fromCourses from '../store/courses.selectors';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  promoTotal$: Observable<number>;

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(private dialog: MatDialog, private store: Store<CoursesState>) {}

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.beginnerCourses$ = this.store.pipe(
      select(fromCourses.selectBeginnerCourses)
    );
    this.advancedCourses$ = this.store.pipe(
      select(fromCourses.selectAdvancedCourses)
    );
    this.promoTotal$ = this.store.pipe(select(fromCourses.selectPromoTotal));
  }

  onAddCourse() {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Create Course',
      mode: 'create',
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);
  }
}
