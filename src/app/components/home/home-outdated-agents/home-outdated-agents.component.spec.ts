import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOutdatedAgentsComponent } from './home-outdated-agents.component';

describe('HomeOutdatedAgentsComponent', () => {
  let component: HomeOutdatedAgentsComponent;
  let fixture: ComponentFixture<HomeOutdatedAgentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeOutdatedAgentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeOutdatedAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
