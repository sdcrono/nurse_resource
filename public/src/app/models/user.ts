import { NurseProfile } from './nurseProfile';
import { Profile } from './profile';
import { Role } from './role';

export class User {
    _id: string;
    username: string;
	password: string;
    nurse: boolean;	
    admin: boolean;
    created_at: string;
    updated_at: string;
    nurse_profile: NurseProfile[];
    profile: Profile[];
    role: Role[]; 
    // isDelete: boolean;
}