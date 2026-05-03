export type EventStatus = "Pending" | "Confirm";
 
export interface GroupEvent {
  id: number;
  host: string;
  avatar: string;
  date: string;
  time: string;
  guests: number;
  package: string;
  note: string;
  status: EventStatus;
}