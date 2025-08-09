import * as XLSX from 'xlsx';
// 
export const getPensionDetails = async () => {
    const response = await fetch('/data.xls');
    const data = await response.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(sheet);
    return json;
};
// 
export const getPensionGroupedByBank = async () => {
    const pensionDetails = await getPensionDetails();
    const grouped: Record<string, { bankCode: string; bankName: string, totalAmount: number }> = {};
    pensionDetails.forEach((item: any) => {
        const bankCode = item['BANK_CODE'];
        const bankName = bankCode == "2" ? "ICICI Bank (Annamalai Nagar)" : "Indian Bank (Annamalai Nagar)";
        const amount = Number(item.NET_AMT || item['NET_AMT'] || 0);
        if (!grouped[bankCode]) {
            grouped[bankCode] = { bankCode, bankName, totalAmount: 0 };
        }
        grouped[bankCode].totalAmount += amount;
    });
    return Object.values(grouped);
};
// 
export const formatINR = (amount: number): string => {
    return amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
};
// 
export const getPensionDetailsByBankCode = async (bankCode: string) => {
    const pensionDetails = await getPensionDetails();
    return pensionDetails.filter((item: any) => item['BANK_CODE'] === bankCode);
};