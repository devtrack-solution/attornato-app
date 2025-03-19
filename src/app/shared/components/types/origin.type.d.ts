export namespace OriginNamespace {
    
    export type Origin = {
      id: string;
      name: string;
    };
  
    export type OriginList = {
      data: Origin[];
      count: number;
      limit: number;
      offset: number;
    };
  }
  