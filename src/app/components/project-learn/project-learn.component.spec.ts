import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectLearnComponent } from './project-learn.component';

describe('ProjectLearnComponent', () => {
  let component: ProjectLearnComponent;
  let fixture: ComponentFixture<ProjectLearnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectLearnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectLearnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
