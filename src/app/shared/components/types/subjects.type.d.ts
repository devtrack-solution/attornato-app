export namespace SubjectsNamespace {
    
    export type Subjects = {
      id: string;
      name: string;
    };
  
    export type SubjectsList = {
      data: Subjects[];
      count: number;
      limit: number;
      offset: number;
    };
  }
  