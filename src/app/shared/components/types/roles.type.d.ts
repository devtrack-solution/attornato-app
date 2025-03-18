export namespace RolesNamespace {
    
    export type Roles = {
      id: string;
      name: string;
    };
  
    export type RolesList = {
      data: Roles[];
      count: number;
      limit: number;
      offset: number;
    };
  }
  