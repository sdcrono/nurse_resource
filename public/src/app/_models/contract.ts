import { Contract } from '../_interfaces/index'
export class ContractModel implements Contract{
    
    constructor(
        public userId: string,
        public nurseId: string, 
        public created_at: Date, 
        public end_at: Date
    ) { }
    
}