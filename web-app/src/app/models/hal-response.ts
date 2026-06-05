export interface HalResponse<T> {
  _embedded: {
    [key: string]: T[];
  };
}