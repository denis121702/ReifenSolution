/* Defines the Mailer entity */
export class IMailer {
    _id: string;
    label: string;
    timestamp: Date;
    successCustomersCount: number;
    failureCustomersCount: number;
    questionsCount: number;
    votesCount: number;
    tokenExpiresDays: number;
    status: string;
    promoterCount: number;
    detractorCount: number;
    npsValue: number;
    responseRateValue: number;
}
