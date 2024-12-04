import axios from "axios";
import {BEST_TICKET_API} from "../ultility/AppConstant";

export const showAllTicketUpcoming = async (data) => {
    let result = null;
    try {
        result = await axios.get(
            `${BEST_TICKET_API}tickets/show-ticket/upcoming/${data.customerId}?status=${data.status}`, {
                headers: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsYW1taW5nIiwiaWF0IjoxNzA0NzY3NjE0LCJleHAiOjE3MDQ4NTQwMTR9.e5psJvm0vZi0RB9y4hliAsabokhUtdTeVFpd92kj5dFc5aTTox5MZhSh5jgDEXoYaPxV4jVlEN1TOqRnoYAk_g"
            });
    } catch (error) {
        console.log("Find tickets API error: " + error);
    }
    return result;
};


export const showAllTicketFinished = async (data) => {
    let result = null;
    try {
        result = await axios.get(
            `${BEST_TICKET_API}tickets/show-ticket/finished/${data.customerId}?status=${data.status}`, {
                headers: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsYW1taW5nIiwiaWF0IjoxNzA0ODQwOTU2LCJleHAiOjE3MDQ5MjczNTZ9.rpShZKirF5XuTOtUTYi1_607DlK189EHwTuA-ndGzfHGgrksoq2Mw87tbYuwDg8qgsDI0WiD9dQ-D2OChTUxXw"
            });
    } catch (error) {
        console.log("Find tickets API error: " + error);
    }
    return result;
};
export const showAllTicketByCustomerId = async (customerId) => {
    let result = null;
    try {
        result = await axios.get(
            `${BEST_TICKET_API}tickets/show-ticket/${customerId}`, {
                headers: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsYW1taW5nIiwiaWF0IjoxNzA0ODQwOTU2LCJleHAiOjE3MDQ5MjczNTZ9.rpShZKirF5XuTOtUTYi1_607DlK189EHwTuA-ndGzfHGgrksoq2Mw87tbYuwDg8qgsDI0WiD9dQ-D2OChTUxXw"
            });
        console.log(result)
    } catch (error) {
        console.log("Find tickets API error: " + error);
    }
    return result;
};
export const showAllTicket = async () => {
    let result = null;
    try {
        result = await axios.get(
            `${BEST_TICKET_API}tickets`, {
                headers: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsYW1taW5nIiwiaWF0IjoxNzA0ODQwOTU2LCJleHAiOjE3MDQ5MjczNTZ9.rpShZKirF5XuTOtUTYi1_607DlK189EHwTuA-ndGzfHGgrksoq2Mw87tbYuwDg8qgsDI0WiD9dQ-D2OChTUxXw"
            });
    } catch (error) {
        console.log("Find tickets API error: " + error);
    }
    return result;
};
export const showTicketById = async (id) => {
    let result = null;
    try {
        result = await axios.get(
            `${BEST_TICKET_API}tickets/${id}`, {
                headers: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsYW1taW5nIiwiaWF0IjoxNzA0ODQwOTU2LCJleHAiOjE3MDQ5MjczNTZ9.rpShZKirF5XuTOtUTYi1_607DlK189EHwTuA-ndGzfHGgrksoq2Mw87tbYuwDg8qgsDI0WiD9dQ-D2OChTUxXw"
            });
    } catch (error) {
        console.log("Find tickets API error: " + error);
    }
    return result;
};

export const showTicketByEventId = async (eventId) => {
    let result = null;
    try {
        result = await axios.get(
            `${BEST_TICKET_API}tickets/findTicketByEventId/${eventId}`, {
                headers: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsYW1taW5nIiwiaWF0IjoxNzA0ODQwOTU2LCJleHAiOjE3MDQ5MjczNTZ9.rpShZKirF5XuTOtUTYi1_607DlK189EHwTuA-ndGzfHGgrksoq2Mw87tbYuwDg8qgsDI0WiD9dQ-D2OChTUxXw"
            });
    } catch (error) {
        console.log("Find tickets API error: " + error);
    }
    return result;
};

export const showTicketByTimeId = async (timeId) => {
    let result = null;
    try {
        result = await axios.get(
            `${BEST_TICKET_API}tickets/findTicketByTimeId/${timeId}`, {
                headers: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsYW1taW5nIiwiaWF0IjoxNzA0ODQwOTU2LCJleHAiOjE3MDQ5MjczNTZ9.rpShZKirF5XuTOtUTYi1_607DlK189EHwTuA-ndGzfHGgrksoq2Mw87tbYuwDg8qgsDI0WiD9dQ-D2OChTUxXw"
            });
    } catch (error) {
        console.log("Find tickets API error: " + error);
    }
    return result;

};
// export const showTicketWebSocketByTimeId = async (timeId) => {
//     let result = null;
//     try {
//         result = await axios.get(
//             `http://localhost:8080/findTicketByTimeId/${timeId}`, {
//                 headers: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsYW1taW5nIiwiaWF0IjoxNzA0ODQwOTU2LCJleHAiOjE3MDQ5MjczNTZ9.rpShZKirF5XuTOtUTYi1_607DlK189EHwTuA-ndGzfHGgrksoq2Mw87tbYuwDg8qgsDI0WiD9dQ-D2OChTUxXw"
//             });
//         console.log(result)
//     } catch (error) {
//         console.log("Find tickets API error: " + error);
//     }
//     return result;
//
// };

export async function updateStatusSuccess(selectedSeats) {
    let response = null;
    await axios({
        url: `${BEST_TICKET_API}tickets/updateStatusSuccess`,
        headers: {
            'Content-Type': 'application/json'
        },
        method: "PUT",
        data: selectedSeats,

    }).then((res) => {
        response = res
    }).catch((e) => {
        response = e;
    })
    return response;
}

export async function updateStatusFail(selectedSeats) {
    let response = null;
    await axios({
        url: `${BEST_TICKET_API}tickets/updateStatusFail`,
        headers: {
            'Content-Type': 'application/json'
        },
        method: "PUT",
        data: selectedSeats,

    }).then((res) => {
        response = res
    }).catch((e) => {
        response = e;
    })
    return response;
}