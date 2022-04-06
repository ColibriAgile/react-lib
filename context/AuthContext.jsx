import * as React from "react";

const AuthContext = React.createContext({});

const initialState = {
    isAuthenticated: false,
    user: null,
    callback: null
}

const reducer = (state, action) => {
    switch (action.type) {
        case "login":
             if (state.callback) {
                state.callback();
            }
            return {
                ...state,
                isAuthenticated: true,
                user: action.user,
                showLogin: false,
                callback: null
            };
        case "logout":
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                showLogin: false,
                callback: null
            };
        case "showLogin":
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                showLogin: true,
                callback: action.callback
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