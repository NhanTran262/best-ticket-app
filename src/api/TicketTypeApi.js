import axios from "axios";
import {BEST_TICKET_API} from "../ultility/AppConstant";

export const showAllTicketType = async () => {
  let result = null;
  try {
    result = await axios.get(
      `${BEST_TICKET_API}ticket-types`, {
        headers: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsYW1taW5nIiwiaWF0IjoxNzA0ODQwOTU2LCJleHAiOjE3MDQ5MjczNTZ9.rpShZKirF5XuTOtUTYi1_607DlK189EHwTuA-ndGzfHGgrksoq2Mw87tbYuwDg8qgsDI0WiD9dQ-D2OChTUxXw"
      });
  } catch (error) {
    console.log("Find tickets API error: " + error);
  }
  return result;
};
