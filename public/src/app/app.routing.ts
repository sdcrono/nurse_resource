import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { NavMenuComponent } from './nav-menu/index';
import { NurseProvideComponent } from './nurse-provide/nurse-provide.component';
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'search', component: NurseProvideComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: 'search' },
    { path: '**', component: NavMenuComponent, canActivate: [AuthGuard] }
];

export const routing = RouterModule.forRoot(appRoutes);