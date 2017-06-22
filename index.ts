import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { Debugger } from './src/debugger';

@NgModule({
  declarations: [Debugger],
  imports: [NativeScriptModule],
  exports: [Debugger],
  schemas: [NO_ERRORS_SCHEMA]
})
export class NSNgRxDebuggerModule {
}
