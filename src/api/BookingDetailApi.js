import axios from "axios";
import {BEST_TICKET_API} from "../ultility/AppConstant.js";

export const findAllBookingDetailsByBookingId = async (bookingId) => {
  let result = null;
  try {
    result = await axios.get(`${BEST_TICKET_API}bookings/${bookingId}/booking-details`);
    console.log(result)
  } catch (e) {
    console.log("Find bookings API error: " + e);
  }
  return result;
};
