import axios from "axios";
import {BEST_TICKET_API} from "../ultility/AppConstant.js";

export async function fetchExistsUsers() {
    let response = null;
    let token=localStorage.getItem("token")
    await axios({
        url: `${BEST_TICKET_API}users/exists`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        method: "GET",
    }).then((res) => {
        response = res;
    }).catch((e) => {
        response = e.response;
    })

    return response;

}
