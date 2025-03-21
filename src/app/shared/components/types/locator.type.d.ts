export namespace LocatorNamespace {
    
    export type Locator = {
      id: string;
      name: string;
    };
  
    export type LocatorList = {
      data: Locator[];
      count: number;
      limit: number;
      offset: number;
    };
  }
  