import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Courses } from '../models/students';
import { CoursesService } from '../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-edit',
  standalone: false,
  
  templateUrl: './course-edit.component.html',
  styleUrl: './course-edit.component.css'
})
export class CourseEditComponent implements OnInit{
  course: Courses | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseservice: CoursesService
  ) {}

  ngOnInit(): void {
    this.getCourseDetails();
    this.getCourses();
  }
  getCourseDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.courseservice.getCoursesById(+id).subscribe((course) => {
        this.course = course;
      });
    }
  }
  getCourses(): void {
    this.courseservice.getCourses().subscribe((courses) => {
      this.course = this.course;
    });
  }
  saveChanges(): void {
    if (this.course) {
      this.courseservice.updateCourses(this.course).subscribe(() => {
        this.router.navigate(['/courses', this.course!.id]);
      });
    }
 }
}
