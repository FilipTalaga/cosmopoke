import { Component, OnInit, HostListener, ElementRef, Renderer2, ViewChild } from '@angular/core';

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

    constructor(private renderer: Renderer2) { }

    ngOnInit() {
        this.update();
    }

    @HostListener('window:resize')
    onResize() {
        this.update();
    }

    update() {
        const getTopBackPath = (width, height) => {
            const x = value => width * value / 950;
            const y = value => height * value / 500;

            return `
                M ${x(0)}   ${y(0)}
                L ${x(0)}   ${y(100)}
                Q ${x(400)} ${y(300)} ${x(700)} ${y(100)}
                Q ${x(850)} ${y(0)}   ${x(950)} ${y(75)}
                L ${x(950)} ${y(0)}
                Z
            `;
        };

        const getTopFrontPath = (width, height) => {
            const x = value => width * value / 950;
            const y = value => height * value / 500;

            return `
                M ${x(0)}   ${y(0)}
                L ${x(0)}   ${y(375)}
                Q ${x(100)} ${y(200)} ${x(250)} ${y(225)}
                Q ${x(400)} ${y(250)} ${x(500)} ${y(150)}
                Q ${x(600)} ${y(50)}  ${x(700)} ${y(0)}
                Z
            `;
        };

        const getBotBackPath = (width, height) => {
            const x = value => width * value / 950;
            const y = value => height * value / 500;

            return `
                M ${x(0)}   ${y(500)}
                L ${x(0)}   ${y(425)}
                Q ${x(150)} ${y(300)} ${x(350)} ${y(400)}
                Q ${x(550)} ${y(500)} ${x(950)} ${y(400)}
                L ${x(950)} ${y(500)}
                Z
            `;
        };

        const getBotFrontPath = (width, height) => {
            const x = value => width * value / 950;
            const y = value => height * value / 500;

            return `
                M ${x(0)}   ${y(500)}
                L ${x(0)}   ${y(475)}
                Q ${x(150)} ${y(350)} ${x(350)} ${y(425)}
                Q ${x(550)} ${y(500)} ${x(650)} ${y(350)}
                Q ${x(750)} ${y(200)} ${x(950)} ${y(300)}
                L ${x(950)} ${y(500)}
                Z
            `;
        };

        this.renderer.setAttribute(this.topSvg.nativeElement, 'width', window.innerWidth.toString());
        this.renderer.setAttribute(this.topSvg.nativeElement, 'height', window.innerHeight.toString());
        this.renderer.setAttribute(this.topBack.nativeElement, 'd', getTopBackPath(window.innerWidth, window.innerHeight));
        this.renderer.setAttribute(this.topFront.nativeElement, 'd', getTopFrontPath(window.innerWidth, window.innerHeight));

        this.renderer.setAttribute(this.botSvg.nativeElement, 'width', window.innerWidth.toString());
        this.renderer.setAttribute(this.botSvg.nativeElement, 'height', window.innerHeight.toString());
        this.renderer.setAttribute(this.botBack.nativeElement, 'd', getBotBackPath(window.innerWidth, window.innerHeight));
        this.renderer.setAttribute(this.botFront.nativeElement, 'd', getBotFrontPath(window.innerWidth, window.innerHeight));
    }
}
