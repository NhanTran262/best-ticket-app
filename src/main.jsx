import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {GoogleOAuthProvider} from "@react-oauth/google";
import {clientId} from "./ultility/AppConstant.js";

ReactDOM.createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId={clientId}>
        <App/>
    </GoogleOAuthProvider>
)
