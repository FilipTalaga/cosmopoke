import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
    template: `<button iconButton></button>`
})
class TestButtonComponent { }

describe('IconButtonDirective', () => {
    let component: TestButtonComponent;
    let fixture: ComponentFixture<TestButtonComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestButtonComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestButtonComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement.query(By.css('button'));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(el.nativeElement).toBeTruthy();
    });
});
