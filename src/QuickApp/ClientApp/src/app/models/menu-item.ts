/* Defines the IMenuItem entity */

export class IMenuItem {
    _id: string;
    timestamp: Date;
    name: string;
    category: string;
    icon: string;
    route: string;
    sort: Number;
    roles: any[];
}
