import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';

const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled'
};

const routes: Routes = [
    {
        path: 'admin', component: AppLayoutComponent,
        children: [
            { path: 'dashboards', loadChildren: () => import('./pages/dashboards/dashboards.module').then(m => m.DashboardsModule) },
            { path: 'onboarding', loadChildren: () => import('./pages/onboarding/onboarding.module').then(m => m.OnboardingModule) },
            { path: 'uikit', data: { breadcrumb: 'UI Kit' }, loadChildren: () => import('./shared/components/uikit/uikit.module').then(m => m.UIkitModule) },
            { path: 'utilities', data: { breadcrumb: 'Utilities' }, loadChildren: () => import('./shared/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
            { path: 'pages', data: { breadcrumb: 'Pages' }, loadChildren: () => import('./shared/components/pages/pages.module').then(m => m.PagesModule) },
            { path: 'profile', data: { breadcrumb: 'User Management' }, loadChildren: () => import('./shared/components/profile/profile.module').then(m => m.ProfileModule) },
            { path: 'documentation', data: { breadcrumb: 'Documentation' }, loadChildren: () => import('./shared/components/documentation/documentation.module').then(m => m.DocumentationModule) },
            { path: 'blocks', data: { breadcrumb: 'Prime Blocks' }, loadChildren: () => import('./shared/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
            { path: 'ecommerce', data: { breadcrumb: 'E-Commerce' }, loadChildren: () => import('./shared/components/ecommerce/ecommerce.module').then(m => m.EcommerceModule) },
            { path: 'apps', data: { breadcrumb: 'Apps' }, loadChildren: () => import('./shared/components/apps/apps.module').then(m => m.AppsModule) },
            { path: 'settings', data: { breadcrumb: 'Cadastros' }, loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingModule) },
            { path: 'customer', data: { breadcrumb: 'Clientes' }, loadChildren: () => import('./pages/customer/customer.module').then(m => m.CustomerModule) },
            { path: 'process', data: { breadcrumb: 'Processos' }, loadChildren: () => import('./pages/process/process.module').then(m => m.ProcessModule) },
        ]
    },
    { path: '', data: { breadcrumb: 'Auth' }, loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) },
    { path: 'landing', loadChildren: () => import('./shared/components/landing/landing.module').then(m => m.LandingModule) },
    { path: 'notfound', loadChildren: () => import('./shared/components/notfound/notfound.module').then(m => m.NotfoundModule) },
    { path: '**', redirectTo: '/notfound' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
