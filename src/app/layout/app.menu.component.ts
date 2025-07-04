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
                        routerLink: ['/admin/customer']
                    },
                    {
                        label: 'Cadastrar Cliente',
                        icon: 'pi pi-users',
                        routerLink: ['/admin/customer/new']
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
                        routerLink: ['/admin/process']
                    },
                    {
                        label: 'Cadastrar Processo',
                        icon: 'pi pi-file-edit',
                        routerLink: ['/admin/process/new']
                    }
                ]
            },
            { separator: true },
            {
                label: 'Cadastros',
                icon: 'pi pi-plus',
                items: [
                    {
                        label: 'Usuário',
                        icon: 'pi pi-user',
                        routerLink: ['/admin/accounts']
                    },
                    {
                        label: 'Processos',
                        icon: 'pi pi-folder', // ícone principal de processos
                        items: [
                            {
                                label: 'Grupo de Processos',
                                icon: 'pi pi-th-large',
                                routerLink: ['/admin/settings/process-group']
                            },
                            {
                                label: 'Local de Trâmite',
                                icon: 'pi pi-map-marker',
                                routerLink: ['/admin/settings/local-procedure']
                            },
                            {
                                label: 'Parceiro',
                                icon: 'pi pi-users',
                                routerLink: ['/admin/settings/partner']
                            },
                            {
                                label: 'Prognóstico',
                                icon: 'pi pi-chart-line',
                                routerLink: ['/admin/settings/prognosis']
                            },
                            {
                                label: 'Origem',
                                icon: 'pi pi-send',
                                routerLink: ['/admin/settings/origin']
                            },
                            {
                                label: 'Detalhes',
                                icon: 'pi pi-info-circle',
                                routerLink: ['/admin/settings/details']
                            },
                            {
                                label: 'Responsável',
                                icon: 'pi pi-user',
                                routerLink: ['/admin/settings/responsible']
                            },
                            {
                                label: 'Área de Atuação',
                                icon: 'pi pi-briefcase',
                                routerLink: ['/admin/settings/practice-area']
                            },
                            {
                                label: 'Status Processual',
                                icon: 'pi pi-flag',
                                routerLink: ['/admin/settings/procedural-status']
                            },
                            {
                                label: 'Comarca',
                                icon: 'pi pi-globe',
                                routerLink: ['/admin/settings/county']
                            },
                            {
                                label: 'Objeto de Ação',
                                icon: 'pi pi-box',
                                routerLink: ['/admin/settings/object-action']
                            },
                            {
                                label: 'Fase',
                                icon: 'pi pi-step-forward',
                                routerLink: ['/admin/settings/phase']
                            },
                            {
                                label: 'Localizador',
                                icon: 'pi pi-compass',
                                routerLink: ['/admin/settings/locator']
                            },
                            {
                                label: 'Assunto',
                                icon: 'pi pi-comments',
                                routerLink: ['/admin/settings/subjects']
                            },
                            {
                                label: 'Campo Livre 1',
                                icon: 'pi pi-comments',
                                routerLink: ['/admin/settings/process/free-field1']
                            },
                            {
                                label: 'Campo Livre 2',
                                icon: 'pi pi-comments',
                                routerLink: ['/admin/settings/process/free-field2']
                            },
                            {
                                label: 'Campo Livre 6',
                                icon: 'pi pi-comments',
                                routerLink: ['/admin/settings/process/free-field6']
                            }
                        ]
                    },
                    {
                        label: 'Clientes',
                        icon: 'pi pi-users', // ícone principal de clientes
                        items: [
                            {
                                label: 'Grupo de Clientes',
                                icon: 'pi pi-users',
                                routerLink: ['/admin/settings/customers-group']
                            },
                            {
                                label: 'Perfil',
                                icon: 'pi pi-id-card',
                                routerLink: ['/admin/settings/profile']
                            },
                            {
                                label: 'Tipos de Contato',
                                icon: 'pi pi-phone',
                                routerLink: ['/admin/settings/contact-types']
                            },
                            {
                                label: 'Campo Livre 2',
                                icon: 'pi pi-pencil',
                                routerLink: ['/admin/settings/free-field2']
                            }
                        ]
                    }
                ]
            },
            { separator: true },
            {
                label: 'Configurações',
                icon: 'pi pi-cog',
                items: [
                    {
                        label: 'Perfil',
                        icon: 'pi pi-lock',
                        routerLink: ['/admin/settings/roles']
                    },
                    {
                        label: 'Permissões',
                        icon: 'pi pi-shield',
                        routerLink: ['/admin/settings/permissions']
                    }
                ]
            }
        ];
    }
}
