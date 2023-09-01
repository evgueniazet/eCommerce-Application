export interface IBaseQueryParams {
  limit?: number;
  offset?: number;
  ['text.en']?: string;
  fuzzy?: boolean;
  fuzzyLevel?: 0 | 1 | 2
}
