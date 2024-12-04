import {BEST_TICKET_API} from "../ultility/AppConstant.js";
import axios from "axios";

export async function findAllFiles() {
    let response = null;
    await axios({
        url: `${BEST_TICKET_API}files`,
        headers: {
            "Content-Type": "application/json",
        },
        method: "GET"
    }).then((res) => {
        response = res;
    }).catch((e) => {
        response = e;
    })
    return response;
}

export async function addFile(file) {
    let response = null;
    await axios({
        url: `${BEST_TICKET_API}files/upload`,
        headers: {
            "Content-Type": "multipart/form-data",
        },
        method: "POST",
        data: file
    }).then((res) => {
        response = res;
    }).catch((e) => {
        response = e;
    })
    return response;
}
