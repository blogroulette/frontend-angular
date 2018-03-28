import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { RouletteComponent } from './roulette.component';

const routes: Routes = [
  Route.withShell([
    { path: '', redirectTo: '/roulette', pathMatch: 'full' },
    { path: 'roulette', component: RouletteComponent, data: { title: extract('roulette') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class RouletteRoutingModule { }
