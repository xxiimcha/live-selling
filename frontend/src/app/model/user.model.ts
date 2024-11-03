// user.model.ts
export interface User {
    id: number;
    first_name: string;
    middle_name?: string;
    last_name: string;
    email: string;
    password: string;
    address: string;
    zipcode: string;
    contact_number?: string;
    image?: string;
    role?: string;
}
  