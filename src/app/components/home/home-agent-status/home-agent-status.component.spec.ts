import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAgentStatusComponent } from './home-agent-status.component';

describe('HomeAgentStatusComponent', () => {
  let component: HomeAgentStatusComponent;
  let fixture: ComponentFixture<HomeAgentStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeAgentStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeAgentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
