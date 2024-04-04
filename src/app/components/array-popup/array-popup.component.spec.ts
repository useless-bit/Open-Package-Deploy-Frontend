import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayPopupComponent } from './array-popup.component';

describe('ArrayPopupComponent', () => {
  let component: ArrayPopupComponent;
  let fixture: ComponentFixture<ArrayPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrayPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArrayPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
