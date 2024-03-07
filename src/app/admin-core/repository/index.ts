export interface Resource<ID> {
  id: ID;
}

export type ResourceCreate<OmitType> = Omit<OmitType, 'id' | 'updatedAt'>;

export interface Repository<T extends any, ID> {
  // listen: (
  //   callback: (resources: T[]) => void,
  //   filter?: { field: ID; value: any }
  // ) => () => void;
  getAll: (limit?: number) => Promise<T[]>;
  get: (id: ID) => Promise<T | null>;
  create: (resource: ResourceCreate<T>) => Promise<T>;
  update: (id: ID, resource: T) => Promise<T>;
  delete: (id: ID) => Promise<void>;
  getAllBy: (field: string, value: any) => Promise<T[]>;
  // getResource<R extends Resource<ID>>(resourceName: ID, id: ID): Promise<R>;
  // getResourceList<R extends Resource<ID>>(resourceName: ID): Promise<R[]>;
}
