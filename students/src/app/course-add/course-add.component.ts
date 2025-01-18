import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { Courses } from '../models/students';

@Component({
  selector: 'app-course-add',
  standalone: false,
  
  templateUrl: './course-add.component.html',
  styleUrl: './course-add.component.css'
})
export class CourseAddComponent implements OnInit {
  newCourse: Courses = {id: 0, name: '', code: '', semester: '', yearOfStudy: 0}
  course: Courses[] = [];
  constructor(private courseService: CoursesService, private router: Router) {}
 ngOnInit(): void {
   this.getCourses();
 }
 addCourse(): void {
   this.courseService.addCourses(this.newCourse).subscribe(() => {
     this.router.navigate(['/courses']);
   });
 }
 goToCourseList(): void {
   this.router.navigate(['/courses']);
 }
getCourses(): void {
 this.courseService.getCourses().subscribe((course) => {
   this.course = course;
 });
}
}
