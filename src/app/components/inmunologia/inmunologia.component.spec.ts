import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InmunologiaComponent } from './inmunologia.component';

describe('InmunologiaComponent', () => {
  let component: InmunologiaComponent;
  let fixture: ComponentFixture<InmunologiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InmunologiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InmunologiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
