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
                icon: 'pi pi-users',
                items: [
                    {
                        label: 'Listar Cliente',
                        icon: 'pi pi-users',
                        routerLink: ['/admin/apps/calendar']
                    }
                ]
            },
            { separator: true },
            {
                label: 'Processos',
                icon: 'pi pi-file-edit',
                items: [
                    {
                        label: 'Listar Processos',
                        icon: 'pi pi-file-edit',
                        routerLink: ['/admin/apps/calendar']
                    }
                ]
            },
            { separator: true },
            {
                label: 'Cadastros',
                icon: 'pi pi-plus',
                items: [
                    {
                        label: 'Processos',
                        icon: 'pi pi-plus',
                        items: [
                            {
                                label: 'Grupo de Processos',
                                icon: 'pi pi-fw pi-plus',
                                routerLink: ['/admin/settings/process-group']
                            },
                            {
                                label: 'Local de Trâmite',
                                icon: 'pi pi-fw pi-plus',
                                routerLink: ['/admin/settings/local-procedure']
                            },
                            {
                                label: 'Parceiro',
                                icon: 'pi pi-fw pi-plus',
                                routerLink: ['/admin/settings/partner']
                            },
                            {
                                label: 'Prognóstico',
                                icon: 'pi pi-fw pi-plus',
                                routerLink: ['/admin/settings/prognosis']
                            },
                            {
                                label: 'Origem',
                                icon: 'pi pi-fw pi-plus',
                                routerLink: ['/admin/settings/origin']
                            },
                            {
                                label: 'Detalhes',
                                icon: 'pi pi-fw pi-plus',
                                routerLink: ['/admin/settings/details']
                            },
                            {
                                label: 'Responsável',
                                icon: 'pi pi-fw pi-plus',
                                routerLink: ['/admin/settings/responsible']
                            },
                            {
                                label: 'Área de Atuação',
                                icon: 'pi pi-fw pi-plus',
                                routerLink: ['/admin/settings/practice-area']
                            },
                            {
                                label: 'Status Processual',
                                icon: 'pi pi-fw pi-plus',
                                routerLink: ['/admin/settings/procedural-status']
                            }
                        ]
                    },
                    {
                        label: 'Clientes',
                        icon: 'pi pi-plus',
                        items: [
                            {
                                label: 'Grupo de Clientes',
                                icon: 'pi pi-fw pi-plus',
                                routerLink: ['/admin/settings/customers-group']
                            },
                            {
                                label: 'Perfil',
                                icon: 'pi pi-fw pi-plus',
                                routerLink: ['/admin/settings/roles']
                            },
                            {
                                label: 'Tipos de Contato',
                                icon: 'pi pi-fw pi-plus',
                                routerLink: ['/admin/settings/contact-types']
                            },
                            {
                                label: 'Campo Livre 2',
                                icon: 'pi pi-fw pi-plus',
                                routerLink: ['/admin/settings/free-field2']
                            }
                        ]
                    },


                ]
            }
        ];
    }
}
