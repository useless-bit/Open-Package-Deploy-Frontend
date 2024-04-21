import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupShowPackagesComponent } from './group-show-packages.component';

describe('GroupShowPackagesComponent', () => {
  let component: GroupShowPackagesComponent;
  let fixture: ComponentFixture<GroupShowPackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupShowPackagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupShowPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
