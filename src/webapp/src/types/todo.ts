export interface ITodo {
  id: number
  description?: string
  marked: boolean
}

export const defaultValue: Readonly<ITodo> = {
  id: 0,
  marked: false
};