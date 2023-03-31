import { useState } from "react";
import ADbaseComponent from "../../Pages/ADeditor/ADbase";

import React from 'react'
import { Navigate } from "react-router-dom";

function Auth() {
    const [isLogin, setLogin] = useState(1);

    if (isLogin != true) {
        return <Navigate to="/"  replace />
    }else{
        return <ADbaseComponent/>;
    }
}

export default Auth;