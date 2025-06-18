import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AuthInterceptor } from './interceptors/auth.interceptor';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'front-end';
}
