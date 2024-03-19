import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TumoralComponent } from './tumoral.component';

describe('TumoralComponent', () => {
  let component: TumoralComponent;
  let fixture: ComponentFixture<TumoralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TumoralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TumoralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
