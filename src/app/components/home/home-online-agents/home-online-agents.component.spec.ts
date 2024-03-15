import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOnlineAgentsComponent } from './home-online-agents.component';

describe('HomeOnlineAgentsComponent', () => {
  let component: HomeOnlineAgentsComponent;
  let fixture: ComponentFixture<HomeOnlineAgentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeOnlineAgentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeOnlineAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
