import type { EventType, EventTemplate, EventFormData, SpecialEvent, EventStatus } from './types';

export const TYPE_OPTIONS: { value: EventType; label: string; color: string; bg: string }[] = [
  { value: 'sale',         label: 'Sale',         color: '#059669', bg: '#D1FAE5' },
  { value: 'holiday',      label: 'Holiday',      color: '#D97706', bg: '#FEF3C7' },
  { value: 'event',        label: 'Event',        color: '#7C3AED', bg: '#EDE9FE' },
  { value: 'announcement', label: 'Announcement', color: '#2563EB', bg: '#DBEAFE' },
];

export const TEMPLATE_OPTIONS: { value: EventTemplate; label: string; desc: string }[] = [
  { value: 'popup',  label: 'Popup Modal', desc: 'Center overlay with backdrop' },
  { value: 'banner', label: 'Top Banner',  desc: 'Slim bar above the page content' },
];

export const LINK_OPTIONS = [
  { label: 'Home (/)',     value: '/' },
  { label: 'Bouquet Bar', value: '/bouquet' },
  { label: 'Menu',        value: '/menu' },
  { label: 'Celebrate',   value: '/celebrate' },
  { label: 'About Us',    value: '/about' },
];

export const COLOR_PRESETS = [
  { name: 'Flora Pink', bg: '#FDE8E9', accent: '#ED80A8', text: '#1a1a1a' },
  { name: 'Dark',       bg: '#1a1a1a', accent: '#ED80A8', text: '#ffffff' },
  { name: 'Peach',      bg: '#FFF5F0', accent: '#F97316', text: '#1a1a1a' },
  { name: 'Green',      bg: '#F0FDF4', accent: '#16a34a', text: '#1a1a1a' },
  { name: 'Lavender',   bg: '#EEF2FF', accent: '#6366F1', text: '#1a1a1a' },
  { name: 'Gold',       bg: '#FFFBEB', accent: '#D97706', text: '#1a1a1a' },
];

type PresetData = Omit<EventFormData, 'startDate' | 'endDate'>;

export const PRESETS: { name: string; data: PresetData }[] = [
  {
    name: "Valentine's",
    data: {
      type: 'holiday', template: 'popup',
      bgColor: '#FDE8E9', accentColor: '#ED80A8', textColor: '#1a1a1a',
      title: "Valentine's Day Special 💐",
      subtitle: 'Love is in the air',
      description: "Celebrate love with our beautiful Valentine's Day bouquets and café treats. Book your table and make it a day to remember.",
      discount: '15% OFF',
      ctaText: 'Reserve Your Table', ctaLink: '/celebrate',
      isActive: true,
    },
  },
  {
    name: "Mother's Day",
    data: {
      type: 'holiday', template: 'popup',
      bgColor: '#FDF2F8', accentColor: '#D946A8', textColor: '#1a1a1a',
      title: "Mother's Day 🌹",
      subtitle: 'Celebrate the women who inspire you',
      description: "Treat mom to a beautiful bouquet and brunch experience she'll never forget.",
      discount: '20% OFF',
      ctaText: 'Book Now', ctaLink: '/bouquet',
      isActive: true,
    },
  },
  {
    name: 'Summer Sale',
    data: {
      type: 'sale', template: 'banner',
      bgColor: '#1a1a1a', accentColor: '#ED80A8', textColor: '#ffffff',
      title: '🌸 Summer Bloom Sale',
      subtitle: 'Fresh flowers, fresh prices',
      description: 'Our biggest bouquet sale of the year. Limited time only!',
      discount: '25% OFF',
      ctaText: 'Shop Now', ctaLink: '/bouquet',
      isActive: true,
    },
  },
  {
    name: 'Announcement',
    data: {
      type: 'announcement', template: 'popup',
      bgColor: '#ffffff', accentColor: '#ED80A8', textColor: '#1a1a1a',
      title: 'Special Announcement',
      subtitle: 'Casa de Flora Bar',
      description: 'We have exciting news to share with our community. Stay tuned for something amazing coming soon!',
      discount: '',
      ctaText: 'Learn More', ctaLink: '/',
      isActive: true,
    },
  },
];

const today = new Date().toISOString().split('T')[0];
const nextWeek = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];

export const DEFAULT_FORM_VALUES: EventFormData = {
  title:       '',
  subtitle:    '',
  description: '',
  discount:    '',
  ctaText:     'Learn More',
  ctaLink:     '/',
  type:        'event',
  template:    'popup',
  bgColor:     '#FDE8E9',
  accentColor: '#ED80A8',
  textColor:   '#1a1a1a',
  startDate:   today,
  endDate:     nextWeek,
  isActive:    true,
};

export function getEventStatus(event: SpecialEvent): EventStatus {
  const now   = new Date();
  const start = new Date(event.startDate);
  const end   = new Date(event.endDate + 'T23:59:59');
  if (!event.isActive)  return 'draft';
  if (now < start)      return 'scheduled';
  if (now > end)        return 'expired';
  return 'active';
}
