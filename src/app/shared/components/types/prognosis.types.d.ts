export namespace PrognosisNamespace {
    
    export type Prognosis = {
      id: string;
      name: string;
    };
  
    export type PrognosisList = {
      data: Prognosis[];
      count: number;
      limit: number;
      offset: number;
    };
  }
  