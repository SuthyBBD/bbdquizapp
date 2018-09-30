/// @Author Murhaf Sousli - Stackoverflow: https://stackoverflow.com/questions/44489580/angular-2-countdown-timer
import { Directive, Input, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';

import { Subject, Observable, SubscriptionLike, timer } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';

@Directive({
  selector: '[counter]'
})
export class TimerDirective implements OnChanges, OnDestroy {

  private counter$ = new Subject<any>();
  private countSub$: SubscriptionLike;

  @Input() counter: number;
  @Input() interval: number;
  @Output() value = new EventEmitter<number>();

  constructor() {
  }

  startTimer() {
    this.countSub$ = this.counter$.pipe(
      switchMap((options: any) =>
        timer(0, options.interval).pipe(
          take(options.count),
          tap(() => this.value.emit(--options.count))
        )
      )
    ).subscribe();
  }

  ngOnChanges() {
    this.counter$.next({ count: this.counter, interval: this.interval });
  }

  ngOnDestroy() {
    this.countSub$.unsubscribe();
  }

}
