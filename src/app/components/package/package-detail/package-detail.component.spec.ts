import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PackageDetailComponent} from './package-detail.component';

describe('PackageDetailComponent', () => {
  let component: PackageDetailComponent;
  let fixture: ComponentFixture<PackageDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageDetailComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PackageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
