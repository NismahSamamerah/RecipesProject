import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCocktailComponent } from './user-cocktail.component';

describe('UserCocktailComponent', () => {
  let component: UserCocktailComponent;
  let fixture: ComponentFixture<UserCocktailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCocktailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCocktailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
