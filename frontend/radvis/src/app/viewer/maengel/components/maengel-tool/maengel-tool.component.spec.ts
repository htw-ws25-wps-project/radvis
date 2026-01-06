import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaengelToolComponent } from './maengel-tool.component';

describe('MaengelToolComponent', () => {
  let component: MaengelToolComponent;
  let fixture: ComponentFixture<MaengelToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaengelToolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaengelToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
