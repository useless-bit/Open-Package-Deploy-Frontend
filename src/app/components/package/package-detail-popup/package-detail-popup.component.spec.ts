import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PackageDetailPopupComponent} from './package-detail-popup.component';

describe('PackageDetailPopipComponent', () => {
  let component: PackageDetailPopupComponent;
  let fixture: ComponentFixture<PackageDetailPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageDetailPopupComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PackageDetailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
