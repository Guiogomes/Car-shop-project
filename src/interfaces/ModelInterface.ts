export interface Model<GenericModel> {
  create(data: GenericModel): Promise<GenericModel>;
  read(): Promise<GenericModel[]>;
  readOne(id: string): Promise<GenericModel | null>;
  update(id: string, data: GenericModel): Promise<GenericModel | null>;
  delete(id: string): Promise<GenericModel | null>;
}
