import {
  Directive,
  Input,
  OnInit,
  OnDestroy,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

export interface CarouselContext {
  $implicit: string;
}

@Directive({selector: '[appCarousel]'})
export class CarouselDirective implements OnInit, OnDestroy {

  context: CarouselContext;
  index = 0;
  intervalId: number;

  @Input('appCarouselFrom') imageUrls: string[];
  @Input('appCarouselDelay') delay: number;

  constructor(
    private template: TemplateRef<CarouselContext>,
    private vcr: ViewContainerRef
  ) { }

  ngOnInit(): void {
    this.context = {
      $implicit: this.imageUrls[0]
    };

    this.vcr.createEmbeddedView(this.template, this.context);

    this.setInterval();
  }

  ngOnDestroy(): void {
    this.clearInterval();
  }

  nextImage(): void {
    this.determineIndex();
    this.updateContext();
  }

  updateContext(): void {
    this.context.$implicit = this.imageUrls[this.index];
  }

  determineIndex(): void {
    this.index++;
    if (this.shouldResetIndex()) {
      this.index = 0;
    }
  }

  shouldResetIndex(): boolean {
    return this.index >= this.imageUrls.length;
  }

  setInterval(): void {
    this.intervalId = window.setInterval(() => this.nextImage(), this.delay);
  }

  clearInterval(): void {
    window.clearInterval(this.intervalId);
  }

}
