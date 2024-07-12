"use client";

import CreateBooking from "./../../../../../components/createBooking/CreateBooking";

const BookingForm = ({ params }) => {


  return (
    <div>
      <CreateBooking id={params.userId} />
    </div>
  );
};

export default BookingForm;
