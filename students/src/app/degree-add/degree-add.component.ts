import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DegreesService } from '../services/degrees.service';
import { Degrees } from '../models/students';

@Component({
  selector: 'app-degree-add',
  standalone: false,
  
  templateUrl: './degree-add.component.html',
  styleUrl: './degree-add.component.css'
})
export class DegreeAddComponent implements OnInit{
    newDegree: Degrees = {id: 0, name: '', code: '', yearsToComplete: 0, active: true}
     degree: Degrees[] = [];
     constructor(private degreeService: DegreesService, private router: Router) {}
    ngOnInit(): void {
      this.getDegrees();
    }
    addDegree(): void {
      this.degreeService.addDegrees(this.newDegree).subscribe(() => {
        this.router.navigate(['/degrees']);
      });
    }
    goToDegreeList(): void {
      this.router.navigate(['/degrees']);
    }
   getDegrees(): void {
    this.degreeService.getDegrees().subscribe((degree) => {
      this.degree = degree;
    });
   }
}
