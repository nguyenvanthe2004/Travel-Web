import { number } from "zod";

// =======data {
//   gateway: 'MBBank',
//   transactionDate: '2026-03-19 22:54:47',
//   accountNumber: '6888803122004',
//   subAccount: 'VQRQAHSGK3184',
//   code: null,
//   content: 'Qahsgk3184  SEPAY12009 1  MBVCB.13437211714.499064.123123.CT tu 1032000758 NGUYEN VAN THE toi VQRQAHSGK3184 NGUYEN VAN THE tai MB- Ma GD ACSP/ qr499064',
//   transferType: 'in',
//   description: 'BankAPINotify Qahsgk3184  SEPAY12009 1  MBVCB.13437211714.499064.123123.CT tu 1032000758 NGUYEN VAN THE toi VQRQAHSGK3184 NGUYEN VAN THE tai MB- Ma GD ACSP/ qr499064',
//   transferAmount: 10000,
//   referenceCode: 'FT26079300297200',
//   accumulated: 0,
//   id: 45995291
// }

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