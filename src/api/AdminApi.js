import axios from "axios";
import {BEST_TICKET_API} from "../ultility/AppConstant.js";

export async function showBookings(currentPage) {
  let response = null;
  await axios({
    url: `${BEST_TICKET_API}admin/bookings?page=${currentPage}`,
    headers: {
      'Content-Type': 'application/json',
    },
    method: "GET",
  }).then((res) => {
    console.log(res)
    response = res;
  }).catch((e) => {
    response = e;
  })
  return response;
}

export async function showBookingDetail(id) {
  let response = null;
  const token = localStorage.getItem("token");
  await axios({
    url: `${BEST_TICKET_API}admin/bookings/${id}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    method: "GET",
  }).then((res) => {
    response = res;
  }).catch((e) => {
    response = e;
  })
  return response;
}

export async function showTickets(currentPage) {
  let response = null;
  await axios({
    url: `${BEST_TICKET_API}admin/tickets?page=${currentPage}`,
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

export async function showUsers(currentPage) {
  let response = null;
  await axios({
    url: `${BEST_TICKET_API}admin/users?page=${currentPage}`,
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

export async function showEvents(currentPage) {
  let response = null;
  await axios({
    url: `${BEST_TICKET_API}admin/events?page=${currentPage}`,
    headers: {
      'Content-Type': 'application/json',
    },
    method: "GET",
  }).then((res) => {
    response = res;
  }).catch((e) => {
    response = e;
  })
  console.log(response)
  return response;
}
