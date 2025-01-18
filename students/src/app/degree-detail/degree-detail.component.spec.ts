import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreeDetailComponent } from './degree-detail.component';

describe('DegreeDetailComponent', () => {
  let component: DegreeDetailComponent;
  let fixture: ComponentFixture<DegreeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DegreeDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DegreeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
