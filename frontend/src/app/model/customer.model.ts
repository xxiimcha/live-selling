export interface Customer {
    id: number;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    zipcode: string;
    address: string;
    middle_name?: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}
