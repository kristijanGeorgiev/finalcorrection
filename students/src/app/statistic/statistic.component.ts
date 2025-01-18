import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Degrees } from '../models/students';
import { Courses } from '../models/students';
import { Student } from '../models/students';
import { StudentsService } from '../services/students.service';
import { CoursesService } from '../services/courses.service';
import { DegreesService } from '../services/degrees.service';
@Component({
  selector: 'app-statistic',
  standalone: false,
  
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.css'
})
export class StatisticComponent implements OnInit{
   students: Student[] = [];
   courses: Courses[] = [];
   degrees: Degrees[] = [];
   constructor(private route: ActivatedRoute, private studentservice: StudentsService, private courseservice: CoursesService, private degreeservice: DegreesService) { }
  ngOnInit(): void {
    this.getStudents();
    this.getCourses();
    this.getDegrees();
  }
 
  getStudents(): void {
    this.studentservice.getStudents().subscribe((students) => {
      this.students = students;
      console.log(students);
    });
  }

  getCourses(): void {
    this.courseservice.getCourses().subscribe((courses) => {
      this.courses = courses;
      console.log(courses);
    });
  }

  getDegrees(): void {
    this.degreeservice.getDegrees().subscribe((degrees) => {
      this.degrees = degrees;
      console.log(degrees);
    });
  }
}
