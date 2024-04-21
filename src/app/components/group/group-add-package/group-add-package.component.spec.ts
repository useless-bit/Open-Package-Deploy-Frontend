import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAddPackageComponent } from './group-add-package.component';

describe('GroupAddPackageComponent', () => {
  let component: GroupAddPackageComponent;
  let fixture: ComponentFixture<GroupAddPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupAddPackageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupAddPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
