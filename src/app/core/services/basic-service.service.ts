import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { inject } from "@angular/core";
import { AUTH_TOKEN_ONBOARDING } from "src/app/app.constant";


export abstract class BasicService {
    protected httpClient: HttpClient = inject(HttpClient);

    protected constructor() { }

    protected getAuthHeaders(): HttpHeaders {
        const token = localStorage.getItem(AUTH_TOKEN_ONBOARDING) || 'authkey';
        return new HttpHeaders({
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
    }

    protected handleError(error: any): void {
        console.error('An error occurred:', error);
    }

    protected log(message: string): void {
        console.log(`BasicService: ${message}`);
    }

    protected getRequestOptions(params?: Record<string, string | number | boolean>): {
        headers: HttpHeaders,
        params?: HttpParams
    } {
        const headers = this.getAuthHeaders();

        let httpParams: HttpParams | undefined;
        if (params) {
            httpParams = new HttpParams();
            Object.entries(params).forEach(([key, value]) => {
                httpParams = httpParams!.set(key, value.toString());
            });
        }

        return { headers, params: httpParams };
    }
}