import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDetailPopupComponent } from './group-detail-popup.component';

describe('GroupDetailPopupComponent', () => {
  let component: GroupDetailPopupComponent;
  let fixture: ComponentFixture<GroupDetailPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupDetailPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupDetailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
