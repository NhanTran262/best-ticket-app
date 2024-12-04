import axios from "axios";
import {BEST_TICKET_API} from "../ultility/AppConstant.js"

export const findAllEvents = async (currentPage) => {
    let result = null;
    let token = localStorage.getItem("token");
    try {
        result = await axios.get(`${BEST_TICKET_API}events?page=${currentPage}&pageSize=20`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (e) {
        console.log("Find events API error: " + e);
    }
    return result;
}
export const findEventsByName = async (searchTerm, currentPage) => {
    let result = null;
    try {
        result = await axios.get(`${BEST_TICKET_API}events/search?text=${searchTerm}&page=${currentPage}&pageSize=20`);
    } catch (e) {
        console.log("Find events API error: " + e);
    }
    return result;
};

export const findEventsByEventTypes = async (eventTypeNames, currentPage) => {
    let result = null;
    try {
        result = await axios.get(`${BEST_TICKET_API}events/eventTypeNames?eventTypeNames=${eventTypeNames}&page=${currentPage}&pageSize=20`);
        console.log(eventTypeNames)
    } catch (e) {
        console.log("Find events API error: " + e);
    }
    return result;
};
export const findEventById = async (eventId) => {
    let result = null;
    try {
        result = await axios.get(`${BEST_TICKET_API}events/${eventId}`);
    } catch (e) {
        console.log("Find events API error: " + e);
    }
    return result;
}
export const createEvent = async (eventRequest) => {
    let result = null;
    try {
        result = await axios.post(`${BEST_TICKET_API}events`, eventRequest);
    } catch (e) {
        console.log("Create event API error: " + e);
    }
    return result;
}

export const findEventByOrganizerId = async (organizerId, page) => {
    let result = null;
    let token = localStorage.getItem("token");
    try {
        result = await axios({
            url: `${BEST_TICKET_API}events/organizer/${organizerId}?page=${page}&pageSize=10`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            method: "GET",
        })
    } catch (e) {
        console.log("Create event API error: " + e);
    }
    return result;
}

export const findEventByStatusIsPending = async (currentPage) => {
    let result = null;
    let token = localStorage.getItem("token");
    try {
        result = await axios({
            url: `${BEST_TICKET_API}events/status/pending?page=${currentPage}&pageSize=100`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            method: "GET",
        })
    } catch (e) {
        console.log("Create event API error: " + e);
    }
    return result;
}

export const setStatusActive = async (eventId) => {
    let result = null;
    let token = localStorage.getItem("token");
    try {
        result = await axios({
            url: `${BEST_TICKET_API}events/setActive/${eventId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            method: "POST",
        })
    } catch (e) {
        console.log(" Event API error: " + e);
    }
    return result;
}

export const findEventsBySearchCriteria = async (searchTerm) => {
    let result = null;

    try {
        result = await axios({
            url: `${BEST_TICKET_API}events/searchCriteria?searchTerm=${searchTerm}`,
            method: "GET",

        });
    } catch (error) {
        console.log("Find events by search criteria API error: " + error);
    }

    return result;
}


