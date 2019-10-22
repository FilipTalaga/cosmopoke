import { Component, OnInit, HostListener, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'background',
    templateUrl: './background.component.html',
    styleUrls: ['./background.component.scss'],
})
export class BackgroundComponent implements OnInit {
    @ViewChild('topSvg', null) topSvg: ElementRef;
    @ViewChild('topBack', null) topBack: ElementRef;
    @ViewChild('topFront', null) topFront: ElementRef;
    @ViewChild('botSvg', null) botSvg: ElementRef;
    @ViewChild('botBack', null) botBack: ElementRef;
    @ViewChild('botFront', null) botFront: ElementRef;

    private expanded = false;

    constructor(private renderer: Renderer2, private router: Router) { }

    ngOnInit() {
        this.update(this.width, this.height);

        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => this.animate());
    }

    @HostListener('window:resize')
    onResize() {
        this.update(this.width, this.height);
    }

    private animate() {
        this.expanded = !this.expanded;

        this.setStyle(this.topBack, 'transform', this.expanded ? 'scale(1.1)' : '');
        this.setStyle(this.topFront, 'transform', !this.expanded ? 'scale(1.1)' : '');
        this.setStyle(this.botBack, 'transform', !this.expanded ? 'scale(1.1)' : '');
        this.setStyle(this.botFront, 'transform', this.expanded ? 'scale(1.1)' : '');
    }

    private get height() {
        return (window.innerWidth < window.innerHeight ? window.innerHeight / 2 : window.innerHeight) - 60;
    }

    private get width() {
        return window.innerWidth;
    }

    private setStyle(el: ElementRef, style: string, value: string) {
        this.renderer.setStyle(el.nativeElement, style, value);
    }

    private setAttr(el: ElementRef, attr: string, value: string) {
        this.renderer.setAttribute(el.nativeElement, attr, value);
    }

    private update(width: number, height: number) {
        const x = (value: number) => width * value / 950;
        const y = (value: number) => height * value / 500;

        this.setAttr(this.topSvg, 'width', width.toString());
        this.setAttr(this.topSvg, 'height', height.toString());
        this.setAttr(this.botSvg, 'width', width.toString());
        this.setAttr(this.botSvg, 'height', height.toString());

        this.setAttr(this.topBack, 'd', `
            M ${x(0)}   ${y(0)} L ${x(0)}   ${y(100)}
            Q ${x(400)} ${y(300)} ${x(700)} ${y(100)}
            Q ${x(850)} ${y(0)}   ${x(950)} ${y(75)}
            L ${x(950)} ${y(0)} Z
        `);
        this.setAttr(this.topFront, 'd', `
            M ${x(0)}   ${y(0)} L ${x(0)}   ${y(375)}
            Q ${x(100)} ${y(200)} ${x(250)} ${y(225)}
            Q ${x(400)} ${y(250)} ${x(500)} ${y(150)}
            Q ${x(600)} ${y(50)}  ${x(700)} ${y(0)} Z
        `);
        this.setAttr(this.botBack, 'd', `
            M ${x(0)}   ${y(500)} L ${x(0)} ${y(425)}
            Q ${x(150)} ${y(300)} ${x(350)} ${y(400)}
            Q ${x(550)} ${y(500)} ${x(950)} ${y(400)}
            L ${x(950)} ${y(500)} Z
        `);
        this.setAttr(this.botFront, 'd', `
            M ${x(0)}   ${y(500)} L ${x(0)} ${y(475)}
            Q ${x(150)} ${y(350)} ${x(350)} ${y(425)}
            Q ${x(550)} ${y(500)} ${x(650)} ${y(350)}
            Q ${x(750)} ${y(200)} ${x(950)} ${y(300)}
            L ${x(950)} ${y(500)} Z
        `);
    }
}
