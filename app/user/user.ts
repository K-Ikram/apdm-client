export interface User{
    client_id: number;
    phone_contact: string;
    phone_sms: string;
    email: string;
    first_name: string;
    last_name: string;
    username: string;
    gender: string;
    language: string,
    date_joined: string,
    is_staff: boolean,
    is_active: boolean,
    is_superuser: boolean,
    last_login: string
}