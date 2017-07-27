import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { NavMenuComponent } from './nav-menu/index';
import { NurseProvideComponent } from './nurse-provide/index';
import { NurseComponent, NurseDetailComponent, NurseCreateComponent, NurseEditComponent, UserComponent, UserDetailComponent, UserCreateComponent, UserEditComponent  } from './_components/index';
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'search', component: NurseProvideComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UserComponent, canActivate: [AuthGuard] },
    { path: 'users/add', component: UserCreateComponent, canActivate: [AuthGuard] },
    { path: 'users/:id/edit', component: UserEditComponent, canActivate: [AuthGuard] },
    { path: 'users/:id', component: UserDetailComponent, canActivate: [AuthGuard] },
    { path: 'nurses', component: NurseComponent, canActivate: [AuthGuard] },
    { path: 'nurses/add', component: NurseCreateComponent, canActivate: [AuthGuard] },
    { path: 'nurses/:id/edit', component: NurseEditComponent, canActivate: [AuthGuard] },
    { path: 'nurses/:id', component: NurseDetailComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    // { path: '**', redirectTo: '' },
    { path: '**', component: NavMenuComponent, canActivate: [AuthGuard] }
];

export const routing = RouterModule.forRoot(appRoutes);