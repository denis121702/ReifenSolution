import {IAuditableEntity} from './common/auditable';

export interface ICustomer extends IAuditableEntity {
    name: string;
    vorname: string;
    street: string;
    hausnummer: string;
    plz: string;
    ort: string;
    telefon: string;
    email: string;
    automodell: string;
    kennzeichen: string;
    lagerplatz: string;
    sommer: boolean;
    winter: boolean;
    reifensize: string;
    reifenmarke: string;
    profiltiefe: string;
    dot: string;
    felgeninfo: string;
    schraubensize: string;
    damagestate: string;
    notizenempfehlungen: string;
    history: string;
}
