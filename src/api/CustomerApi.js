import axios from "axios";
import {BEST_TICKET_API} from "../ultility/AppConstant.js";

export async function createCustomer(customer) {
    let response = null;
    let token=localStorage.getItem("token");
    await axios({
        url: `${BEST_TICKET_API}users/customer/add`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`,
        },
        method: "POST",
        data: customer
    }).then((res) => {
        response = res;
    }).catch((e) => {
        response = e.response;
    })
    return response;
}
export async function updateCustomer(editCustomer) {
    let response = null;
    let token = localStorage.getItem("token");
    await axios({
        url: `${BEST_TICKET_API}users/customer/edit`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        method: "PUT",
        data: editCustomer
    }).then((res) => {
        response = res;
    }).catch((e) => {
        response = e.response;
    })
    return response;
}

