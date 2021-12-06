import React from "react";

const NotificacaoContext = React.createContext({});

class Alerta {
    constructor(severidade, msg, details) {
        this.severidade = severidade;
        this.msg = msg;
        this.details = details;
    }

    static success(msg) {
        return new Alerta("success", msg);
    }

    static info(msg) {
        return new Alerta("info", msg);
    }

    static warn(msg, details) {
        return new Alerta("warning", msg, details);
    }

    static error(msg, details) {
        return new Alerta("error", msg, details);
    }
}

const reducer = (state, alerta) => {
    return {
        ...state,
        ...alerta,
    };
};

function NotificacaoProvider(props) {
    const [alerta, notificar] = React.useReducer(reducer, {});
    return <NotificacaoContext.Provider value={{ alerta, notificar }} {...props} />;
}

function useNotificacao() {
    const { notificar } = React.useContext(NotificacaoContext);
    return notificar;
}

export { NotificacaoProvider, NotificacaoContext, Alerta, useNotificacao };
