import { Routes } from '@angular/router';
import { HomeComponent } from './paginas/home/home.component';
import { CriticaComponent } from './paginas/critica/critica.component';
import { FilmeComponent } from './paginas/filme/filme.component';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'filme/:id', component: FilmeComponent},
  { path: 'critica', component: CriticaComponent}
];
