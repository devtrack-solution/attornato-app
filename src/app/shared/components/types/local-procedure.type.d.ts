export namespace LocalProcedureNamespace {
    
    export type LocalProcedure = {
      id: string;
      name: string;
    };
  
    export type LocalProcedureList = {
      data: LocalProcedure[];
      count: number;
      limit: number;
      offset: number;
    };
  }
  