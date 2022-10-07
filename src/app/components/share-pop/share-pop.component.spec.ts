import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharePopComponent } from './share-pop.component';

describe('SharePopComponent', () => {
  let component: SharePopComponent;
  let fixture: ComponentFixture<SharePopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharePopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharePopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
