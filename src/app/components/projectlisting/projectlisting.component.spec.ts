import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectlistingComponent } from './projectlisting.component';

describe('ProjectlistingComponent', () => {
  let component: ProjectlistingComponent;
  let fixture: ComponentFixture<ProjectlistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectlistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectlistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
