import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAgentOnlineComponent } from './home-agent-online.component';

describe('HomeOnlineAgentsComponent', () => {
  let component: HomeAgentOnlineComponent;
  let fixture: ComponentFixture<HomeAgentOnlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeAgentOnlineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeAgentOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
