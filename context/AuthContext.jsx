import * as React from "react";

const AuthContext = React.createContext({});

const initialState = {
    isAuthenticated: false,
    user: null
}

const reducer = (state, action) => {
    switch (action.type) {
        case "login":
            return {
                ...state,
                isAuthenticated: true,
                user: action.user
            };
        case "logout":
            return {
                ...state,
                isAuthenticated: false,
                user: null
            };
        default:
            return state;
    }
}

function AuthProvider(props) {
    const [auth, authDispatcher] = React.useReducer(reducer, initialState);
    return (
        <AuthContext.Provider value={{auth, authDispatcher}} {...props}/>
    )
}

export {AuthProvider, AuthContext}