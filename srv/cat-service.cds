using {capacitymanagement.db as db} from '../db/data-model';

@path: 'CapSRV'

define service MyService {
    define entity Materials  as projection on db.Materials;
    define entity TruckTypes as projection on db.TruckTypes;
}
