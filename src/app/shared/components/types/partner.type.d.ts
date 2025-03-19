export namespace PartnerNamespace {
    
    export type Partner = {
      id: string;
      name: string;
    };
  
    export type PartnerList = {
      data: Partner[];
      count: number;
      limit: number;
      offset: number;
    };
  }
  