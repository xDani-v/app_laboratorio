import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HormonalComponent } from './hormonal.component';

describe('HormonalComponent', () => {
  let component: HormonalComponent;
  let fixture: ComponentFixture<HormonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HormonalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HormonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
