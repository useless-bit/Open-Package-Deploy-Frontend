import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingFullscreenComponent } from './loading-fullscreen.component';

describe('LoadingFullscreenComponent', () => {
  let component: LoadingFullscreenComponent;
  let fixture: ComponentFixture<LoadingFullscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingFullscreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoadingFullscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
