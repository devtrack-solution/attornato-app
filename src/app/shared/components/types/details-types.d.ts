export namespace DetailsNamespace {
    
    export type Details = {
      id: string;
      name: string;
    };
  
    export type DetailsList = {
      data: Details[];
      count: number;
      limit: number;
      offset: number;
    };
  }
  