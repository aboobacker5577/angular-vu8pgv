import {Directive} from "@angular/core";


@Directive({
  selector: '[renderDebug]'
})
export class RenderDebugDirective {
  constructor() {
    console.log('RenderDebug');
  }
}