import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store, Action } from "@ngrx/store";
import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/distinctUntilChanged';

declare var Object;

@Component({
  selector: "ns-ngrx-debugger",
  styleUrls: ['./debugger.css'],
  templateUrl: './debugger',
})
export class Debugger implements OnInit, OnDestroy {
  states$: Observable<any[]>;
  Sub: Subscription;
  states = {};
  expanded = {};
  selected: string;
  show = false;

  constructor(private store$: Store<any>, private actions$: Actions){}

  ngOnInit() {
    this.Sub = this.actions$.do(({ type }) => console.log('ACTION: -'+type+'-')).subscribe();

    this.states$ = this.store$
      .distinctUntilChanged()
      .do(states => this.states = states)
      .map(states => Object.keys(states));
  }

  dump(state) {
    let debug;
    if(this.selected && this.states[this.selected][state])
      debug = this.states[this.selected][state];
    else
      debug = this.states[state]

    typeof debug == 'string' ? console.log(debug) : console.dir(debug);
  }

  expand(state) {
    this.selected = this.selected == state ? false : state;
    this.expanded = this.selected && Object.keys(this.states[this.selected]);
  }

  ngOnDestroy() {
    this.Sub.unsubscribe();
  }
}

