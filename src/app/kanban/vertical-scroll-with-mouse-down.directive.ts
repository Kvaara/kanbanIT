import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appVerticalScrollWithMouseDown]'
})
export class VerticalScrollWithMouseDownDirective {
  scrollableContainer?: any;
  startX: number = 0;
  scrollLeft: number = 0;
  isMouseDown: boolean = false;
  isBoardsContainer: boolean = false;

  constructor() { }

  @HostListener("mousedown", ["$event"])
  verticalScrollWhileMouseDown($event: MouseEvent) {
    this.scrollableContainer = $event.target;
    const isOverflown = this.scrollableContainer.scrollWidth > this.scrollableContainer.clientWidth; 
    if (isOverflown)  {
      this.isMouseDown = true;
      if (this.scrollableContainer.id === "boardsContainer") {
        this.isBoardsContainer = true;
        this.scrollableContainer.classList.add("cursor-grabbing");
      } else {
        this.isBoardsContainer = false;
      }
      this.startX = $event.pageX - this.scrollableContainer.offsetLeft;
      this.scrollLeft = this.scrollableContainer.scrollLeft;
    }
  }

  @HostListener("mousemove", ["$event"])
  verticalScrollWhileMouseMove($event: MouseEvent) {
    const isOverflown = this.scrollableContainer?.scrollWidth > this.scrollableContainer?.clientWidth
    if (this.isMouseDown && this.isBoardsContainer && isOverflown) {
        $event.preventDefault();
        this.scrollableContainer.classList.add("cursor-grabbing");
        const x = $event.pageX - this.scrollableContainer.offsetLeft;
        const walk = (x - this.startX) * 1.5;
        this.scrollableContainer.scrollLeft = this.scrollLeft - walk;
      }

  }

  @HostListener("mouseup")
  @HostListener("mouseleave")
  setMouseIsDownToFalse() {
    if (this.scrollableContainer) {
      this.scrollableContainer.classList?.remove("cursor-grabbing");
      this.isMouseDown = false;
    }
  }

}
