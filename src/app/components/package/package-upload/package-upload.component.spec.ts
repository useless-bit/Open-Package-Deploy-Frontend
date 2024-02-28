import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PackageUploadComponent} from './package-upload.component';

describe('PackageUploadComponent', () => {
  let component: PackageUploadComponent;
  let fixture: ComponentFixture<PackageUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageUploadComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PackageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
