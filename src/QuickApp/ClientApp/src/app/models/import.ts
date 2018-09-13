/* Defines the Import entity */
export interface IImport {
    _id: string;
    timestamp: Date;
    fileLastModified: Date;
    filePath: string;
    totalCountRecords: number;
    successCountRecords: number;
    errorCountRecords: number;
}
