/* Defines the customer entity */
export interface ICustomer {
    id: string;
    Name: string;
    Email: string;
    PhoneNumber: string;
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
