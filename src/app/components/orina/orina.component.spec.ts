import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrinaComponent } from './orina.component';

describe('OrinaComponent', () => {
  let component: OrinaComponent;
  let fixture: ComponentFixture<OrinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrinaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
