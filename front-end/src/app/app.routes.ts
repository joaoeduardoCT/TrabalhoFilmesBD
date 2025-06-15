import { Routes } from '@angular/router';

import { CriticaComponent } from './paginas/critica/critica.component';
import { FilmeComponent } from './paginas/filme/filme.component';
import { HomeComponent } from './paginas/home/home.component';
import { LoginComponent } from './paginas/login/login.component';

export const routes: Routes = [
  { path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  { path: 'filme/:id', component: FilmeComponent},
  { path: 'critica', component: CriticaComponent}
];
