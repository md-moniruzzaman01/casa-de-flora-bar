import EventForm from '@/components/admin/events/partials/EventForm';

export default function CreateEventPage() {
  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="px-8 py-6">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">Create New Promotion</h1>
          <p className="text-sm text-gray-500 mt-1">
            Design a popup or banner that will appear on your homepage during the set date window.
          </p>
        </div>
        <EventForm />
      </div>
    </div>
  );
}
