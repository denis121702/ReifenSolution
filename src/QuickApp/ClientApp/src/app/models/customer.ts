/* Defines the customer entity */
export interface ICustomer {
    _id: string;
    customerId: string;
    firmenname: string;
    contactId: string;
    anrede: string;
    vorname: string;
    nachname: string;
    email: string;
    status: string;
    rating: string;
    unsubscribeStatus: number;
    sendMailStatus: boolean;
    token: string;
    isMainQuestionAnswered: boolean;
}
