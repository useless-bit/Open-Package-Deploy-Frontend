import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PackageOverviewComponent} from './package-overview.component';

describe('PackageOverviewComponent', () => {
  let component: PackageOverviewComponent;
  let fixture: ComponentFixture<PackageOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageOverviewComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PackageOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
