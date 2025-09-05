// Kick utility type - Omit with better type inference
export type Kick<T, K extends keyof T> = Omit<T, K>;