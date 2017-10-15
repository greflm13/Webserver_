import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HereComponent } from './here.component';
import { HomeComponent } from './home.component';
import { WhoComponent } from './who.component';
import { WhooComponent } from './whoo.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'who', component: WhoComponent },
    { path: 'whoo', component: WhooComponent },
    { path: 'here', component: HereComponent },
    { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
