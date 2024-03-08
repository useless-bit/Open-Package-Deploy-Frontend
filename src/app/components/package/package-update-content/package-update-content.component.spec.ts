import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PackageUpdateContentComponent} from './package-update-content.component';

describe('PackageUpdateContent', () => {
  let component: PackageUpdateContentComponent;
  let fixture: ComponentFixture<PackageUpdateContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageUpdateContentComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PackageUpdateContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
