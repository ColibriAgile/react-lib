import React, {useEffect, useRef, useState} from "react";
import * as io from 'socket.io-client';
import {RequestContext} from "../../context/RequestContext";


export const useSocketAPI = () => {
    const socket = useRef();
    const [listener, addlistener] = useState({});
    const [message, sendMessage] = useState(null);
    const {reqDispatcher} = React.useContext(RequestContext);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        socket.current = io.io(window.location.origin);
        return () => {
            if (socket.current) {
                socket.current.disconnect();
            }
        }
    }, [])

    //send message
    useEffect(() => {
        if (message != null) {
            setLoading(true);
            socket.current.emit(message.target, message.data);
        }

    }, [message])


    //add listener
    useEffect(() => {
        const addListeners = () => {
            for (let event in listener) {
                socket.current.on(event, (payload) => {
                    listener[event](JSON.parse(payload));
                    setLoading(false);
                });
            }
        }
        if (socket.current) {
            addListeners();
        }
    }, [listener])

    //loading
    useEffect(() => {
        if (loading != null) {
            if (loading) {
                reqDispatcher({type: 'startRequest'});
            } else {
                console.log('finish loading')
                reqDispatcher({type: 'finishRequest'});
            }
        }
    }, [loading, reqDispatcher])

    return [sendMessage, addlistener]

}