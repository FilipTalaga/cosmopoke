import { Directive, Input, ElementRef, OnInit, OnChanges, Renderer2 } from '@angular/core';
import { isTruthy } from '../utils/utils';

@Directive({
    selector: '[iconButton]'
})
export class IconButtonDirective implements OnInit, OnChanges {
    @Input() disabled: boolean;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) {
        this.applyStylesToElement({
            webkitTapHighlightColor: 'transparent',
            userSelect: 'none',
            color: '$color-text',
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            borderRadius: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '.4rem',
            cursor: 'pointer',
            transition: '200ms background-color',
        });
    }

    ngOnInit() {
        this.updateElementStyles();
    }

    ngOnChanges() {
        this.updateElementStyles();
    }

    private updateElementStyles() {
        this.applyStylesToElement({
            cursor: this.updateCursor(),
            opacity: this.updateOpacity(),
            pointerEvents: this.updatePointerEvents(),
        });

        this.updateDisabled();
    }

    private applyStylesToElement = (styles: object) =>
        Object.keys(styles).forEach(key => this.renderer.setStyle(this.el.nativeElement, key, styles[key]))

    private updateDisabled = () => this.el.nativeElement.disabled = isTruthy(this.disabled);

    private updateCursor = () => isTruthy(this.disabled) ? 'default' : 'pointer';

    private updateOpacity = () => isTruthy(this.disabled) ? .2 : 1;

    private updatePointerEvents = () => isTruthy(this.disabled) ? 'none' : 'all';
}
