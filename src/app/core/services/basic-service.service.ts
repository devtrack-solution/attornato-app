import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject } from "@angular/core";
import { v4 as uuidv4 } from 'uuid';
import { AUTH_TOKEN_ONBOARDING } from "src/app/app.constant";


export abstract class BasicService {
    protected headers: HttpHeaders;
    protected httpClient: HttpClient = inject(HttpClient);

    protected constructor() {
        const idempotencyKey = uuidv4();
        this.headers = new HttpHeaders({
            'x-idempotency-key': idempotencyKey,
            Authorization: `Bearer ${this.getAuthToken()}`,
            'Content-Type': 'application/json'
        });
    }

    // Define common methods that can be used by all services extending this class
    protected handleError(error: any): void {
        console.error('An error occurred:', error);
        // Implement further error handling logic if needed
    }

    protected log(message: string): void {
        console.log(`BasicService: ${message}`);
        // Implement further logging logic if needed
    }

    private getAuthToken(): string {
        return localStorage.getItem(AUTH_TOKEN_ONBOARDING) || 'authkey';
    }
}