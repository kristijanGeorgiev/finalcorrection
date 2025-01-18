import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-about',
  standalone: false,
  
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit{
  Student: Student | undefined
  private student = {year: 2024, name: 'Kristijan Georgiev', id: 5422};
  constructor(private route: ActivatedRoute, private studentService: StudentService) { }
  ngOnInit(): void {
    this.getStudent();
  }
 
  getStudent() : void {
    this.Student=this.studentService.getStudent()
  } 
}