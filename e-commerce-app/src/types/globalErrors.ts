export type globalErrors<T> = {
  [K in keyof T]?: {
    message: string | null;
  };
};
