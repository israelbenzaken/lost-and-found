import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes,RouterModule} from '@angular/router';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TabsComponent } from './tabs/tabs.component';
import { HomeComponent } from './tabs/home/home.component';
import { FoundComponent } from './tabs/found/found.component';
import { LostComponent } from './tabs/lost/lost.component';

const appRoutes: Routes=[
{ path:'',component: HomeComponent },
{ path:'found',component: FoundComponent },
{ path:'lost',component: LostComponent },
];


@NgModule({
  declarations: [
  AppComponent,
  HeaderComponent,
  TabsComponent,
  HomeComponent,
  FoundComponent,
  LostComponent
  ],
  imports: [
  AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCqusDREoWcray47KIVdP7NmkQkqyRcF04',
      libraries: ['places']
    }),
  BrowserModule,
  FormsModule,
  HttpModule,
  RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
