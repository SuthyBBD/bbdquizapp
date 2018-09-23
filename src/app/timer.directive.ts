///<reference path="../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import { Directive, Input, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';

import { Subject, Observable, SubscriptionLike, timer } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';

@Directive({
  selector: '[appTimer]'
})
export class CounterDirective implements OnChanges, OnDestroy {

  private timer$ = new Subject<any>();
  private countSub$: SubscriptionLike;

  @Input() timer: number;
  @Input() time: number;
  @Output() value = new EventEmitter<number>();

  constructor() {

    this.countSub$ = this.timer$.pipe(
      switchMap((options: any) =>
        timer(0, options.interval).pipe(
          take(options.count),
          tap(() => this.value.emit(--options.count))
        )
      )
    ).subscribe();
  }

  ngOnChanges() {
    this.timer$.next({ count: this.timer, time: this.time });
  }

  ngOnDestroy() {
    this.countSub$.unsubscribe();
  }

}
