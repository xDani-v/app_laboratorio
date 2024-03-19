import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanguineaComponent } from './sanguinea.component';

describe('SanguineaComponent', () => {
  let component: SanguineaComponent;
  let fixture: ComponentFixture<SanguineaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SanguineaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SanguineaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
