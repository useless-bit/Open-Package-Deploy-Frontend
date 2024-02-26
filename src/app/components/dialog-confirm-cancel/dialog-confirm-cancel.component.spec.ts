import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogConfirmCancelComponent} from './dialog-confirm-cancel.component';

describe('DialogConfirmCancelComponent', () => {
  let component: DialogConfirmCancelComponent;
  let fixture: ComponentFixture<DialogConfirmCancelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogConfirmCancelComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DialogConfirmCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
