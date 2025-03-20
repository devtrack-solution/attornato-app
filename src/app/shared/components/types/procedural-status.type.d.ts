export namespace ProceduralStatusNamespace {
    
    export type ProceduralStatus = {
      id: string;
      name: string;
    };
  
    export type ProceduralStatusList = {
      data: ProceduralStatus[];
      count: number;
      limit: number;
      offset: number;
    };
  }
  