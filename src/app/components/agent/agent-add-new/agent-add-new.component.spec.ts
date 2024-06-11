import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AgentAddNewComponent} from './agent-add-new.component';

describe('AgentAddNewComponent', () => {
  let component: AgentAddNewComponent;
  let fixture: ComponentFixture<AgentAddNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentAddNewComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AgentAddNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
