export namespace CustomersGroupNamespace {
    
    export type CustomersGroup = {
      id: string;
      name: string;
    };
  
    export type CustomersGroupList = {
      data: CustomersGroup[];
      count: number;
      limit: number;
      offset: number;
    };
  }
  