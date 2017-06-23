# Nativescript @Ngrx/Store Debugger
A minimal Nativescript (v3+) debugger for @ngrx/store & @ngrx/effects.

## How To
* Install.
```
npm i ns-ngrx-debugger --save
```

* In your App module.
``` javascript
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NSNgRxDebuggerModule } from "ns-ngrx-debugger";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ],
  imports: [
    NativeScriptModule,
    NSNgRxDebuggerModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }

```

* In your Component. (Root component preferably).
``` html
<ActionBar title="Hello"></ActionBar>

<ns-ngrx-debugger [hidden]="false"></ns-ngrx-debugger>
```

* Thats all. No dependencies. 

Set up your @ngrx/store however you want. You get a log of all Actions going through the store and an option to dump States and Sub-States of the Store at request on the terminal.

## License

[MIT](/LICENSE)
