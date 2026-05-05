export type EventType     = 'sale' | 'holiday' | 'event' | 'announcement';
export type EventTemplate = 'popup' | 'banner';
export type EventStatus   = 'active' | 'scheduled' | 'expired' | 'draft';

export interface SpecialEvent {
  id:          string;
  title:       string;
  subtitle:    string;
  description: string;
  discount:    string;
  ctaText:     string;
  ctaLink:     string;
  type:        EventType;
  template:    EventTemplate;
  bgColor:     string;
  accentColor: string;
  textColor:   string;
  startDate:   string;   // YYYY-MM-DD
  endDate:     string;   // YYYY-MM-DD
  isActive:    boolean;
  createdAt:   string;
  updatedAt:   string;
}

export type EventFormData = Omit<SpecialEvent, 'id' | 'createdAt' | 'updatedAt'>;
