export interface SepayDataWebhook {
    gateway: string;
    transactionDate: Date;
    accountNumber: number;
    subAccount: string;
    code: string | number;
    content: string;
    transferType: string;
    description: string;
    transferAmount: number;
    referenceCode: string;
    accumulated: number;
    id: number;
}