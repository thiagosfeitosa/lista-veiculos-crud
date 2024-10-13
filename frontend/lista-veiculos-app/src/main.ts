import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/pages/home/home.component';
import { ListaComponent } from './app/pages/lista/lista.component';
import { ContatoComponent } from './app/pages/contato/contato.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { ListaMockComponent } from './app/pages/lista-mock/lista-mock.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', component: HomeComponent },
      { path: 'lista', component: ListaComponent },
      { path: 'lista-mock', component: ListaMockComponent },
      { path: 'contato', component: ContatoComponent }
    ]),
    provideHttpClient()
  ]
}).catch(err => console.error(err));
