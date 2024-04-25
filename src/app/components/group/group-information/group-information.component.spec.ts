import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupInformationComponent} from './group-information.component';

describe('GroupDetailComponent', () => {
  let component: GroupInformationComponent;
  let fixture: ComponentFixture<GroupInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupInformationComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GroupInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
