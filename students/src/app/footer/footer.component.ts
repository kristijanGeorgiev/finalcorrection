import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-footer',
  standalone: false,
  
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{
  Student: Student | undefined
  private student = {year: 2024, id: 5422, name: 'Kristijan Georgiev'};
  constructor(private route: ActivatedRoute, private studentService: StudentService) { }
  ngOnInit(): void {
    this.getStudent();
  }
 
  getStudent() : void {
    this.Student=this.studentService.getStudent()
  } 
}
