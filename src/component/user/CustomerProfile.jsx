import {useSelector} from "react-redux";

import {selectLockUser, selectRemoveUser} from "../../features/user/UserSlice.js";
import {useState} from "react";
import EditCustomerProfile from "./edit/EditCustomerProfile.jsx";
import RegisterCustomerProfile from "./add/RegisterCustomerProfile.jsx";
import {
    selectCustomerIdCards,
    selectCustomerPhoneNumbers,
    selectCustomerReceiptEmails
} from "../../features/user/ExistsSlice.js";
import {selectUserLogin, selectUserLogout} from "../../features/user/AuthSlice.js";


export default function CustomerProfile() {
    const user = useSelector(selectUserLogin);
    const phoneNumbers = useSelector(selectCustomerPhoneNumbers);
    const idCards = useSelector(selectCustomerIdCards);
    const receiptEmails = useSelector(selectCustomerReceiptEmails);
    const [showLock, setShowLock] = useState(false);
    const [showRemove, setShowRemove] = useState(false);
    const userLogout = useSelector(selectUserLogout);
    const userLock = useSelector(selectLockUser);
    const userRemove = useSelector(selectRemoveUser);
    const phoneRegex = /^0\d{9}$/;

    return (
        <>
            {
                user?.customer ? (
                    <EditCustomerProfile
                        customer={user?.customer}
                        user={user}
                        phoneNumbers={phoneNumbers}
                        idCards={idCards}
                        receiptEmails={receiptEmails}
                        showLock={showLock}
                        setShowLock={setShowLock}
                        showRemove={showRemove}
                        setShowRemove={setShowRemove}
                        userLogout={userLogout}
                        userLock={userLock}
                        userRemove={userRemove}
                        phoneRegex={phoneRegex}
                    />
                ) : (
                    <RegisterCustomerProfile
                        user={user}
                        phoneNumbers={phoneNumbers}
                        idCards={idCards}
                        receiptEmails={receiptEmails}
                        showLock={showLock}
                        setShowLock={setShowLock}
                        showRemove={showRemove}
                        setShowRemove={setShowRemove}
                        userLogout={userLogout}
                        userLock={userLock}
                        userRemove={userRemove}
                        phoneRegex={phoneRegex}
                    />
                )
            }
        </>
    );
}