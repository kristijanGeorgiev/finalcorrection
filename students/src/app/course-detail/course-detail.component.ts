import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { Courses} from '../models/students';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-course-detail',
  standalone: false,
  
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent implements OnInit{
  course: Courses | undefined
  constructor(private route: ActivatedRoute, private router: Router, private courseService: CoursesService) { }
  ngOnInit(): void {
    this.getCourseDetails();
  }
  getCourseDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.courseService.getCoursesById(+id).subscribe((course: Courses| undefined) => {
        this.course = course;
      });
    }
  }
  goToCourseList(): void {
    this.router.navigate(['/courses']);
  }
}
