export interface Post {
  title: string,
  content: string
}

export interface Todo {
  userId: number,
  id: number,
  title: string,
  completed: boolean
}

export interface Profile {
  name: string,
  descriptions: string
}
