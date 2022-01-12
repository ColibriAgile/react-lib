import React from "react";
import { useTranslation } from "react-i18next";

const Fallback = ({ error, errorInfo }) => {
    const { t } = useTranslation();
    return (
        <div>
            <h1>{t("header.erro")}</h1>
            <details style={{ whiteSpace: "pre-wrap" }}>
                {error && error.toString()}
                <br />
                {errorInfo.componentStack}
            </details>
        </div>
    );
};

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
    }

    render() {
        return this.state.errorInfo ? (
            <Fallback error={this.state.error} errorInfo={this.state.errorInfo} />
        ) : (
            this.props.children
        );
    }
}
