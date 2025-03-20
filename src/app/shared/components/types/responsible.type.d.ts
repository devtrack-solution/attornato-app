export namespace ResponsibleNamespace {
    
    export type Responsible = {
      id: string;
      name: string;
    };
  
    export type ResponsibleList = {
      data: Responsible[];
      count: number;
      limit: number;
      offset: number;
    };
  }
  