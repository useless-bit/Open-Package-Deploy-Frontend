import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupAddAgentComponent} from './group-add-agent.component';

describe('GroupAddAgentComponent', () => {
  let component: GroupAddAgentComponent;
  let fixture: ComponentFixture<GroupAddAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupAddAgentComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GroupAddAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
