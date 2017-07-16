import { NurseProfile } from './nurseProfile';
import { Profile } from './profile';
import { Role } from './role';

export class User {
    _id: string;
    username: string;
    password: string;
    role: String; 
    email: string;
    phone: number;
    age: number;
    gender: string;
    address: string;
    created_at: string;
    updated_at: string;
    // isDelete: boolean;
}