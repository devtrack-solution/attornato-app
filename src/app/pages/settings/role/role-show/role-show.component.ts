import { Component, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from 'src/app/core/services/util.service';
import { RoleService } from '../service/role.service';

@Component({
  selector: 'app-role-show',
  templateUrl: './role-show.component.html',
  styleUrls: ['./role-show.component.scss']
})
export class RoleShowComponent {

  closeResult = '';
  content: any = {};
  listPermission: any = {};
  isOpened = false;
  display: boolean = false

  @ViewChild('modalContent') modalContent: any;

  // Constructor
  constructor(
    protected readonly util: UtilService,
    protected modalService: NgbModal,
    private roleService: RoleService
  ) { }

  async openLg(data: string): Promise<void> {
    this.content = this.roleService.getRole();
    this.roleService.clearRole(); 
    this.listPermission = this.content.permissions
    this.display = true;
    if (!this.isOpened) {
      this.open(this.modalContent);
      this.isOpened = true;
    } else {
      this.isOpened = false
    }
  }
  open(content: any) {
    this.modalService.open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title' }).result.then(
      () => { },
      () => {
        this.isOpened = false;
      }
    );
  }

  closeMyModal() {
    this.display = false
    location.reload();
  }

  openMyModal(event: any) {
    this.content = event
    this.display = true
  }

  close(modal: any) {
    modal.close();
    this.isOpened = false;
  }

  // getPermissionLabel(name: string): string {
  //   console.log(name)
  //   return this.util.getLabel(name, Permissions);
  // }
}
