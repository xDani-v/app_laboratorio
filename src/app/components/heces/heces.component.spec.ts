import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HecesComponent } from './heces.component';

describe('HecesComponent', () => {
  let component: HecesComponent;
  let fixture: ComponentFixture<HecesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HecesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
