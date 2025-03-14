import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Dashboards',
                icon: 'pi pi-home',
                routerLink: ['/admin/dashboards']
            },
            { separator: true },
            {
                label: 'Clientes',
                icon: 'pi pi-th-large',
                items: [
                    {
                        label: 'Listar Cliente',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/admin/apps/calendar']
                    }
                ]
            },
            { separator: true },
            {
                label: 'Processos',
                icon: 'pi pi-th-large',
                items: [
                    {
                        label: 'Listar Processos',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/admin/apps/calendar']
                    }
                ]
            },
            { separator: true },
            {
                label: 'Start',
                icon: 'pi pi-fw pi-download',
                items: [
                    {
                        label: 'Buy Now',
                        icon: 'pi pi-fw pi-shopping-cart',
                        url: ['https://www.primefaces.org/store']
                    },
                    {
                        label: 'Documentation',
                        icon: 'pi pi-fw pi-info-circle',
                        routerLink: ['/admin/documentation']
                    }
                ]
            }
        ];
    }
}
