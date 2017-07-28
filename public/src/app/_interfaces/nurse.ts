import { Location, NurseProfile, Profile } from './index';

export interface Nurse {
    _id: string;
    username: string;
    nurseProfile: NurseProfile;
    profile: Profile;
    location: Location;
}