import axios from "axios";
import {BEST_TICKET_API} from "../ultility/AppConstant.js";

export async function findAllBookings(currentPage) {
  let response = null;
  await axios({
    url: `${BEST_TICKET_API}bookings?page=${currentPage}`,
    headers: {
      'Content-Type': 'application/json',
    },
    method: "GET",
  }).then((res) => {
    response = res;
  }).catch((e) => {
    response = e;
  })
  return response;
}

export async function findAllBookingsByEventId(eventId, currentPage) {
  let response = null;
  await axios({
    url: `${BEST_TICKET_API}bookings/event/${eventId}?page=${currentPage}`,
    headers: {
      'Content-Type': 'application/json',
    },
    method: "GET",
  }).then((res) => {
    response = res;
  }).catch((e) => {
    response = e;
  })
  return response;
}

export async function findAllBookingsByEventIdNoPaged(eventId) {
  let response = null;
  await axios({
    url: `${BEST_TICKET_API}bookings/event/${eventId}/list`,
    headers: {
      'Content-Type': 'application/json',
    },
    method: "GET",
  }).then((res) => {
    response = res;
  }).catch((e) => {
    response = e;
  })
  return response;
}

export async function searchBookingByKeyword(eventId, keyword, currentPage) {
  let response = null;
  await axios({
    url: `${BEST_TICKET_API}bookings/event/${eventId}/search?keyword=${keyword}&page=${currentPage}`,
    headers: {
      'Content-Type': 'application/json',
    },
    method: "GET",
  }).then((res) => {
    response = res;
  }).catch((e) => {
    response = e;
  })
  return response;
}

export const findBookingsByTimeId = async (timeId) => {
  let result = null;
  try {
    result = await axios.get(`${BEST_TICKET_API}bookings/event/time/${timeId}`);
  } catch (e) {
    console.log("Find bookings API error: " + e);
  }
  return result;
};

export async function createBooking(bookings) {
  let response = null;
  let token = localStorage.getItem("token");
  await axios({
    url: `${BEST_TICKET_API}bookings/create`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    method: "POST",
    data: bookings,

  }).then((res) => {
    response = res
  }).catch((e) => {
    response = e;
  })
  return response;
}

