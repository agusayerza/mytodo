export interface IFolder {
    id: number
    name: string
  }
  
  export const defaultValue: Readonly<IFolder> = {
    id: 0,
    name: ""
  };