import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Store, Action } from "@ngrx/store";
import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/scan';

declare var Object;

@Component({
  selector: "ns-ngrx-debugger",
  styleUrls: ['./debugger.css'],
  templateUrl: './debugger.html',
})
export class Debugger implements OnInit, OnDestroy {
  states$: Observable<any[]>;
  actions$: Observable<Action>;
  states = {};
  expanded: string[] = [];
  selected: string;
  position$: Observable<{ top: number, left: number }>;
  pan$ = new BehaviorSubject({ top: 0, left: 300 });
  @Input() hidden = false;

  constructor(private store$: Store<any>, actions: Actions) {
    this.actions$ = actions.do(({ type }) => console.log('[ACTION] ' + type));
  }

  ngOnInit() {
    this.position$ = Observable.from(this.pan$)
      .debounceTime(50)
      .scan((position, { top, left }) => ({ top: position.top + top, left: position.left + left }))

    this.states$ = this.store$
      .distinctUntilChanged()
      .do(states => this.states = states)
      .map(states => Object.keys(states));
  }

  onDump(state) {
    let debug;
    if (this.selected && this.states[this.selected][state])
      debug = this.states[this.selected][state];
    else
      debug = this.states[state]

    typeof debug == 'string' ? console.log(debug) : console.dir(debug);
  }

  onExpand(state) {
    this.selected = this.selected == state ? false : state;
    this.expanded = this.selected && Object.keys(this.states[this.selected]);
  }

  ngOnDestroy() {
  }
}
