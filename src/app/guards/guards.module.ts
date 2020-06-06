import {NgModule} from '@angular/core';
import {IsAuthenticatedGuard} from "./is-authenticated.guard";

@NgModule({
  providers: [
    IsAuthenticatedGuard
  ]
})
export class GuardsModule {}
