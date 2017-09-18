import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPartSubmissionComponent } from './project-part-submission.component';

describe('ProjectPartSubmissionComponent', () => {
  let component: ProjectPartSubmissionComponent;
  let fixture: ComponentFixture<ProjectPartSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectPartSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPartSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
