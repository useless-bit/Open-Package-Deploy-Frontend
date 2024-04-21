import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupShowAgentsComponent} from './group-show-agents.component';

describe('GroupShowAgentsComponent', () => {
  let component: GroupShowAgentsComponent;
  let fixture: ComponentFixture<GroupShowAgentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupShowAgentsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GroupShowAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
