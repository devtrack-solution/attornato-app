import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { AlertIcon, SweetAlertService } from 'src/app/shared/service/sweet-alert.service';
import { RolesNamespace } from 'src/app/shared/components/types/roles.type';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import Swal from 'sweetalert2';
import { ProfileService } from '../service/profile.service';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';
import { ProfileNewComponent } from '../profile-new/profile-new.component';

@Component({
  selector: 'app-profile-list',
  standalone: true,
  imports: [CommonModule, SharedModule, TableModule, ProfileEditComponent, ProfileNewComponent,
    PaginatorModule, ButtonModule, DialogModule],
  templateUrl: './profile-list.component.html',
  styleUrl: './profile-list.component.scss'
})
export class ProfileListComponent implements OnInit {

  display: boolean = false
  profileList: RolesNamespace.RolesList | any
  @ViewChild('showUpdate') showUpdate: any;
  @ViewChild('showCreate', { static: false }) showCreate: any;
  @ViewChild('name') nameInput!: ElementRef;


  constructor(private readonly sweetAlertService: SweetAlertService, private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getProfiles(100, 0, true).subscribe((profileList: RolesNamespace.RolesList) => {
      this.profileList = profileList;
    });
  }

  ngAfterViewInit() {
    console.log("showCreate:", this.showCreate); // Verifique se a referência está sendo capturada corretamente
  }

  rowClass(product: any): string {
    if (product.quantity === 0) {
      return 'out-of-stock';
    } else if (product.quantity <= 5) {
      return 'low-stock';
    } else {
      return 'in-stock';
    }
  }

  rowStyle(product: any): any {
    return { color: undefined };
    /*if (product.quantity === 0) {
      return { 'color': 'red' };
    } else if (product.quantity <= 5) {
      return { 'color': 'orange' };
    } else {
      return { 'color': 'green' };
    }*/
  }

  async openEditRoles(process: any): Promise<void> {
    await this.showUpdate.openLg(process);
  }

  async openCreateRoles() {
    if (!this.showCreate) {
      console.error("showCreate não foi inicializado corretamente.");
      return;
    }

    await this.showCreate.openLg();
  }


  async deleteRoles(process: any) {
    await this.confirmForRemove(process.id);
  }

  async confirmForRemove(id: string): Promise<any> {
    this.sweetAlertService.confirmAlert({
      title: 'Deseja remover esse Perfil?',
      text: 'Ao remover esse Perfil, todo o acesso associado a ele serão removidos!',
      icon: AlertIcon.WARNING,
      confirmText: 'O Perfil foi removido com sucesso!',
      cancellText: 'Os dados do Perfil não foram modificados!'
    }).then(async (willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire('', 'Os dados do Perfil não foram modificados!', 'error');
      } else {
        try {
          await this.profileService.deleteProfile(id)
          await Swal.fire('', 'O Perfil foi removida com sucesso!', 'success');
          location.reload();
        } catch (e) {
          Swal.fire('', 'Os dados do Perfil não foram modificados!', 'error');
          console.error(e);
        }
      }
    });
  }


  async filter(name: any): Promise<void> {
    this.profileService.getSearchProfiles(100, 0, true, name).subscribe((profileList: any) => {
      this.profileList = profileList;
    });
  }


  cleanFilter(): void {
    this.nameInput.nativeElement.value = '';
    this.ngOnInit()
  }
}
