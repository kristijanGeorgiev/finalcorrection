import { Component, OnInit } from '@angular/core';
import { Courses } from '../models/students';
import { CoursesService } from '../services/courses.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  standalone: false,
  
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit{
  courses: Courses[] = [];
  sortedColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';
  namefilter: string = '';
  codefilter: string = '';
  constructor(private courseService: CoursesService, private router: Router) { }

  ngOnInit(): void {
    this.getCourses();
  }
  sortByID(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

    this.courses.sort((a, b) => {
      if (this.sortDirection === 'asc') {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
  }
  
  sortByName(): void {

    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';


    this.courses.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (nameA < nameB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (nameA > nameB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
  getCourses(): void {
    this.courseService.getCourses().subscribe((courses) => {
      this.courses = courses;
      console.log(courses);
    });
  }

  applyFilters(): void {
    this.courseService.getCourses().subscribe((courses) => {
      this.courses= this.filterCourses(courses);
    });
  }

  filterCourses(course: Courses[]): Courses[] {
    return course.filter(course =>
      this.filterByName(course)
    )
  }

  filterByName(course: Courses): boolean {
    return this.namefilter === '' || course.name.toLowerCase().includes(this.namefilter.toLowerCase());
  }
  filterBycode(course: Courses): boolean {
      return this.namefilter === '' || course.code.toLowerCase().includes(this.codefilter.toLowerCase());
  }
  
  viewCourseDetails(course: Courses): void {
    this.router.navigate(['/course-detail', course.id]);
  }

  editCourse(course: Courses): void {
    this.router.navigate(['/course-edit', course.id]);
  }

  deleteCourse(course: Courses): void {
    if (confirm('Do you want to delete the course')) {
      this.courseService.deleteCourses(course.id).subscribe(() => {
        this.getCourses();
      });
    }
  }
}
