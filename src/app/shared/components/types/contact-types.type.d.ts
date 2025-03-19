export namespace ContactTypesNamespace {
    
    export type ContactTypes = {
      id: string;
      name: string;
    };
  
    export type ContactTypesList = {
      data: ContactTypes[];
      count: number;
      limit: number;
      offset: number;
    };
  }
  