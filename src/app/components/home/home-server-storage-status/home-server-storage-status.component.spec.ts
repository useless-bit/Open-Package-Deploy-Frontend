import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeServerStorageStatusComponent} from './home-server-storage-status.component';

describe('HomeServerStorageStatusComponent', () => {
  let component: HomeServerStorageStatusComponent;
  let fixture: ComponentFixture<HomeServerStorageStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeServerStorageStatusComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeServerStorageStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
