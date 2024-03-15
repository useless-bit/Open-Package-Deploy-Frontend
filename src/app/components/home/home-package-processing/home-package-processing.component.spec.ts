import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePackageProcessingComponent } from './home-package-processing.component';

describe('HomePackageProcessingComponent', () => {
  let component: HomePackageProcessingComponent;
  let fixture: ComponentFixture<HomePackageProcessingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePackageProcessingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomePackageProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
