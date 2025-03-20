export namespace PhaseNamespace {
    
    export type Phase = {
      id: string;
      name: string;
    };
  
    export type PhaseList = {
      data: Phase[];
      count: number;
      limit: number;
      offset: number;
    };
  }
  