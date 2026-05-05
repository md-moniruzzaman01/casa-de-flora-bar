import Form from "@/components/admin/add-reservation/partials/Form";
import Booking from "@/components/admin/add-reservation/partials/Booking";
import Header from "@/components/admin/add-reservation/partials/Header";

const ReservationPage = () => {


  return (
    <div  className="min-h-screen bg-gray-50 p-4 md:p-8 font-serif">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Section: Selection */}
        <div className="lg:col-span-2 space-y-6">
          <Header/>

          {/* Date & Time Selection */}
          <Booking/>
        </div>

        {/* Right Section: Form */}
        <Form/>
      </div>
    </div>
  );
};




export default ReservationPage;