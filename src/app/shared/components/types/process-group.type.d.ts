export namespace ProcessGroupNamespace {
    
    export type ProcessGroup = {
      id: string;
      name: string;
    };
  
    export type ProcessGroupList = {
      data: ProcessGroup[];
      count: number;
      limit: number;
      offset: number;
    };
  }
  