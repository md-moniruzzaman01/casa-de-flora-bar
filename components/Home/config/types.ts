export interface GroupReservationContent {
  title: string;
  description: string[];
  details: {
    label: string;
    value: string;
  }[];
  footerNote: string;
  importantNote: string;
  images: string[];
}