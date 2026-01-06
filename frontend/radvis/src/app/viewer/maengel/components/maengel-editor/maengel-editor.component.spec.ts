import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaengelEditorComponent } from './maengel-editor.component';

describe('MaengelEditorComponent', () => {
  let component: MaengelEditorComponent;
  let fixture: ComponentFixture<MaengelEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaengelEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaengelEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
