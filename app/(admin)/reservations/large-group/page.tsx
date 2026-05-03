import { todayEvents, allEvents } from "@/components/admin/large-group/config/constant";
import EventsTable from "@/components/admin/large-group/partials/EventsTable";

export default function LargeGroupPage() {
  return (
    <div className="flex flex-col gap-6 px-8 py-7">
      <EventsTable title="Today's Large Group Events" events={todayEvents} itemsPerPage={5} />
      <EventsTable title="All Large Group Events" events={allEvents} itemsPerPage={5} />
    </div>
  );
}
