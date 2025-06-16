import { Routes } from '@angular/router';

import { CriticaComponent } from './paginas/critica/critica.component';
import { AddFilmeComponent } from './paginas/filme/add-filme/add-filme.component';
import { EditarFilmeComponent } from './paginas/filme/editar-filme/editar-filme.component';
import { FilmeComponent } from './paginas/filme/filme.component';
import { HomeComponent } from './paginas/home/home.component';
import { LoginComponent } from './paginas/login/login.component';
import { PerfilComponent } from './paginas/perfil/perfil.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'filme/:id', component: FilmeComponent },
  { path: 'critica', component: CriticaComponent },
  { path: 'add-filme', component: AddFilmeComponent },
  { path: 'editar-filme/:id', component: EditarFilmeComponent },
];
