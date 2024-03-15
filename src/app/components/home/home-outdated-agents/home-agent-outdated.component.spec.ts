import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeAgentOutdatedComponent} from './home-agent-outdated.component';

describe('HomeOutdatedAgentsComponent', () => {
  let component: HomeAgentOutdatedComponent;
  let fixture: ComponentFixture<HomeAgentOutdatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeAgentOutdatedComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeAgentOutdatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
