import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestContentComponent } from './test-content.component';

describe('TestContentComponent', () => {
  let component: TestContentComponent;
  let fixture: ComponentFixture<TestContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
