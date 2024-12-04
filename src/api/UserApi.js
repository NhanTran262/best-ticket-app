import axios from "axios";
import {BEST_TICKET_API} from "../ultility/AppConstant.js"


export async function sendValidationCode(data) {
    let response = null;
    await axios({
        url: `${BEST_TICKET_API}auth/send-validation-code`,
        headers: {
            'Content-Type': 'application/json',
        },
        method: "POST",
        data: data
    }).then((res) => {
        response = res;
    }).catch((e) => {
        response = e.response;
    })
    return response;
}

export async function forgotPassword(data) {
    let response = null;
    await axios({
        url: `${BEST_TICKET_API}auth/forgot-password`,
        headers: {
            'Content-Type': 'application/json',
        },
        method: "POST",
        data: data
    }).then((res) => {
        response = res;
    }).catch((e) => {
        response = e.response;
    })
    return response;
}

export async function lock(user) {
    let response = null;
    let token = localStorage.getItem('token');
    await axios({
        url: `${BEST_TICKET_API}users/lock`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        method: "DELETE",
        data: user
    }).then((res) => {
        response = res;
    }).catch((e) => {
        response = e.response;
    })
    return response;
}

export async function unlock(data) {
    let response = null;
    await axios({
        url: `${BEST_TICKET_API}users/unlock`,
        headers: {
            'Content-Type': 'application/json',
        },
        method: "POST",
        data: data
    }).then((res) => {
        response = res;
    }).catch((e) => {
        response = e.response;
    })
    return response;
}

export async function remove(data) {
    let response = null;
    let token = localStorage.getItem('token');
    await axios({
        url: `${BEST_TICKET_API}users/remove`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        method: "DELETE",
        data: data
    }).then((res) => {
        response = res;
    }).catch((e) => {
        response = e.response;
    })
    return response;
}



