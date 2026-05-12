export interface ChoiceColumn {
  label: string;
  title: string;
  items: string[];
  tierPrice?: string;
  isNote?: boolean; // first item is a note
}

export interface DetailItem {
  label: string;
  text: string;
}

export interface PricingRow {
  pkg: string;
  perPerson: string;
  guests25: string;
  guests50: string;
  featured?: boolean;
}
