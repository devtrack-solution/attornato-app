import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Mail } from 'src/app/shared/api/mail';
import { MailService } from 'src/app/shared/components/apps/mail/service/mail.service';

@Component({
    templateUrl: './mail-inbox.component.html',
})
export class MailInboxComponent implements OnDestroy {

    mails: Mail[] = [];

    subscription: Subscription;

    constructor(private mailService: MailService, private router: Router) {
        this.subscription = this.mailService.mails$.subscribe(data => {
            this.mails = data.filter(d => !d.archived && !d.spam && !d.trash && !d.hasOwnProperty('sent'));
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
