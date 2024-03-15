import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomePackageStatusComponent} from './home-package-status.component';

describe('HomePackageStatusComponent', () => {
  let component: HomePackageStatusComponent;
  let fixture: ComponentFixture<HomePackageStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePackageStatusComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomePackageStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
