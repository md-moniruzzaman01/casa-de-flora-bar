
export type FormValues = {
  name: string;
  email: string;
  phone: string;
  services: string[]; // For the pink chips
  selected_space: string;
  event_date: string;
  time_slot: string; // Updated to match the range selection in UI
  guests: string;
  event_type: string;
  message: string;
};