import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportHematologiaComponent } from './report-hematologia.component';

describe('ReportHematologiaComponent', () => {
  let component: ReportHematologiaComponent;
  let fixture: ComponentFixture<ReportHematologiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportHematologiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportHematologiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
