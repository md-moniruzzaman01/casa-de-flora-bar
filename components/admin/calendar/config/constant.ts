import { Reservation } from "./types";

export const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

export const DAY_NAMES_SHORT = ["Su","Mo","Tu","We","Th","Fr","Sa"];

export const DAY_NAMES_LONG = [
  "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",
];

export const EVENT_DAYS = [5, 7, 12, 15, 19, 22, 26, 28];

export const RESERVATIONS: Reservation[] = [
  { id: 1, name: "Russel Petter",  initials: "RP", avatarBg: "#C8E6C9", avatarText: "#1B5E20", time: "10:00 – 11:30 AM", bookingFor: "Bouquet",     guests: 6,  status: "Pending" },
  { id: 2, name: "Amara Osei",     initials: "AO", avatarBg: "#BBDEFB", avatarText: "#0D47A1", time: "11:00 – 12:00 PM", bookingFor: "Wedding",     guests: 12, status: "Confirm" },
  { id: 3, name: "Ling Wei",       initials: "LW", avatarBg: "#F8BBD0", avatarText: "#880E4F", time: "1:00 – 2:00 PM",  bookingFor: "Bouquet",     guests: 2,  status: "Confirm" },
  { id: 4, name: "James Park",     initials: "JP", avatarBg: "#FFF9C4", avatarText: "#F57F17", time: "2:30 – 3:30 PM",  bookingFor: "Arrangement", guests: 4,  status: "Pending" },
  { id: 5, name: "Sofia Reyes",    initials: "SR", avatarBg: "#E1BEE7", avatarText: "#4A148C", time: "3:00 – 4:00 PM",  bookingFor: "Bouquet",     guests: 8,  status: "Confirm" },
  { id: 6, name: "Tomás Vidal",    initials: "TV", avatarBg: "#B2EBF2", avatarText: "#006064", time: "4:00 – 5:00 PM",  bookingFor: "Wedding",     guests: 30, status: "Confirm" },
  { id: 7, name: "Priya Nair",     initials: "PN", avatarBg: "#FFE0B2", avatarText: "#E65100", time: "5:30 – 6:30 PM",  bookingFor: "Bouquet",     guests: 3,  status: "Pending" },
  { id: 8, name: "Cleo Martin",    initials: "CM", avatarBg: "#DCEDC8", avatarText: "#33691E", time: "7:00 – 8:00 PM",  bookingFor: "Arrangement", guests: 10, status: "Confirm" },
];