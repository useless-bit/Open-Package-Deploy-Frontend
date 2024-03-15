import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeDeploymentStatusComponent} from './home-deployment-status.component';

describe('HomeDeploymentStatusComponent', () => {
  let component: HomeDeploymentStatusComponent;
  let fixture: ComponentFixture<HomeDeploymentStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeDeploymentStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeDeploymentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
