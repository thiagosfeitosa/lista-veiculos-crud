import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMockComponent } from './lista-mock.component';

describe('ListaMockComponent', () => {
  let component: ListaMockComponent;
  let fixture: ComponentFixture<ListaMockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaMockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaMockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
