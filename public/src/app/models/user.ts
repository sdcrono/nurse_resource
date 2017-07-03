export class User {
    _id: string;
    username: string;
	password: string;
    nurse: boolean;	
    admin: boolean;
    created_at: Date;
    updated_at: Date;
    isDelete: boolean;
}