export namespace CountyNamespace {
    
    export type County = {
      id: string;
      name: string;
    };
  
    export type CountyList = {
      data: County[];
      count: number;
      limit: number;
      offset: number;
    };
  }
  