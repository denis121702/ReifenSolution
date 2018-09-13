/* Defines the IQuestion entity */
export interface IQuestion {
    _id: string;
    timestamp: Date;
    lastChange: Date;
    title: string;
    description: string;
    status: string;
    rating: number;
    sort: number;
    isActive: boolean;
}
