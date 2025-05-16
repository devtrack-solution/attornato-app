import { Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AppSidebarComponent } from './app.sidebar.component';
import { AuthenticationService } from '../core/services/authentication.service';
import { Router } from '@angular/router';
import { ONBOARDING_ROUTE } from '../app.constant';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopbarComponent {
    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;

    constructor(public layoutService: LayoutService, public el: ElementRef, private authenticationService: AuthenticationService, private router: Router) {}

    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }

    onProfileButtonClick() {
        this.layoutService.showRightMenu();
    }

    onSearchClick() {
        this.layoutService.toggleSearchBar();
    }

    onRightMenuClick() {
        this.layoutService.showRightMenu();
    }

    async logout(): Promise<void> {
        await this.authenticationService.signOut();
    }

    async alterarPerfil(): Promise<void> {
       await this.router.navigateByUrl(ONBOARDING_ROUTE)
    }

    get logo() {
        const logo =
            this.layoutService.config().menuTheme === 'white' ||
            this.layoutService.config().menuTheme === 'orange'
                ? 'dark'
                : 'white';
        return logo;
    }
}
