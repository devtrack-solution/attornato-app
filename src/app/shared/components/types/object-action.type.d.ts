export namespace ObjectActionNamespace {
    
    export type ObjectAction = {
      id: string;
      name: string;
    };
  
    export type ObjectActionList = {
      data: ObjectAction[];
      count: number;
      limit: number;
      offset: number;
    };
  }
  