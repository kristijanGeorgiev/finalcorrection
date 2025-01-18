import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Degrees } from '../models/students';
import { DegreesService } from '../services/degrees.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-degree-edit',
  standalone: false,
  
  templateUrl: './degree-edit.component.html',
  styleUrl: './degree-edit.component.css'
})
export class DegreeEditComponent implements OnInit{
    degree: Degrees | undefined;
     constructor(
       private route: ActivatedRoute,
       private router: Router,
       private degreeservice: DegreesService
     ) {}
   
     ngOnInit(): void {
       this.getDegreeDetails();
       this.getDegrees();
     }
     getDegreeDetails(): void {
       const id = this.route.snapshot.paramMap.get('id');
   
       if (id) {
         this.degreeservice.getDegreesById(+id).subscribe((degree) => {
           this.degree = degree;
         });
       }
     }
     getDegrees(): void {
       this.degreeservice.getDegrees().subscribe((degrees) => {
         this.degree = this.degree;
       });
     }
     saveChanges(): void {
       if (this.degree) {
         this.degreeservice.updateDegrees(this.degree).subscribe(() => {
           this.router.navigate(['/degrees', this.degree!.id]);
         });
       }
    }
}
