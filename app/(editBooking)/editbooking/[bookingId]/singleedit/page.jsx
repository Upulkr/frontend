import React from 'react'
import EditBooking from './../../../../../components/editBooking/EditBooking';

const page = ({params}) => {
  return (
    <div><EditBooking id={params.bookingId}/></div>
  )
}

export default page