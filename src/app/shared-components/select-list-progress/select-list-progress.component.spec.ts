import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectListProgressComponent} from './select-list-progress.component';

describe('SelectListProgressComponent', () => {
  let component: SelectListProgressComponent;
  let fixture: ComponentFixture<SelectListProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectListProgressComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SelectListProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
