
export interface IAuditableEntity {
  id: string;
  createdBy: string;
  updatedBy: string;
  updatedDate: Date;
  createdDate: Date;
}
