import { Nurse, Name } from './index';

export interface NurseProfile {
    career: string;
    working_place: string;
    hospital: string;
    type: string;
    owner: Nurse;
    name: Name;
    // address: string;
    // age: number;
    // sex: string;
}