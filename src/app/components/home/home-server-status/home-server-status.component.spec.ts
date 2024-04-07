import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeServerStatusComponent} from './home-server-status.component';

describe('HomeServerStatusComponent', () => {
  let component: HomeServerStatusComponent;
  let fixture: ComponentFixture<HomeServerStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeServerStatusComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeServerStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
