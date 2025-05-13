export const LOGIN_SERVICE = 'auth/login';
export const DASHBOARD_SERVICE = 'dashboards';
export const RESET_SERVICE = 'reset-password';
export const ONBOARDING_SERVICE = 'onboarding';
export const INPUT_OUTPUT_SERVICE = 'inputs-outputs';
export const WIDGET_SERVICE = 'widget';

export const AUTH_ROUTE = '/auth';

export const LOGIN_PAGE_ROUTE = `/guest/${LOGIN_SERVICE}`;
export const RESET_PAGE_ROUTE = `/guest/${RESET_SERVICE}`;
export const HOME_PAGE_ROUTE = `/admin/${DASHBOARD_SERVICE}`;
export const ONBOARDING_ROUTE = `/admin/dashboards`;
export const INPUT_OUTPUT_ROUTE = `/admin/${WIDGET_SERVICE}/${INPUT_OUTPUT_SERVICE}`

export const AUTH_TOKEN = 'attornato-auth-token';
export const AUTH_USER_DATA = 'attornato-auth-user-data';
export const AUTH_ROLE = 'attornato-auth-user-role';
export const AUTH_COMPANY = 'attornato-auth-user-company';
