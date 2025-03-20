export namespace PracticeAreaNamespace {
    
    export type PracticeArea = {
      id: string;
      name: string;
    };
  
    export type PracticeAreaList = {
      data: PracticeArea[];
      count: number;
      limit: number;
      offset: number;
    };
  }
  