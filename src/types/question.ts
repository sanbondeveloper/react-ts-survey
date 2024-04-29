export interface QuestionType {
  id: number;
  title: string;
  type: 'SHORT' | 'LONG' | 'RADIO' | 'CHECKBOX' | 'DROPDOWN';
  options: { id: number; value: string }[];
  required: boolean;
  hasEtc: boolean;
}
