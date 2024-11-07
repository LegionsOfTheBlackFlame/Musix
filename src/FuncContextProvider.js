import React from "react";
import userContext from "./FuncContext";

export default function funcContaxtProvider({props}) {

const [user, setUser] = React.useState({
    isGuest: true,
    userId: null,
    userProfileImg: null,
});

return (
    <userContext.Provider value={{user, setUser}}>
        {props.children}
    </userContext.Provider>
)

}