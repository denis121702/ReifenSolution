/* Defines the ITemplate entity */
export interface ITemplate {
    _id: string;
    timestamp: Date;
    subject: string;
    text: string;
    html: string;
    // language: string;
    isActive: boolean;
}
