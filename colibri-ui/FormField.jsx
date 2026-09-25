import React from "react";

// Campo de formulário na marcação do kit (.cm-field): rótulo sempre visível acima do controle, dica e
// erro associados. O controle vem como filho (<input className="cm-input">, <select>, DatePicker…);
// aplique fieldProps(id, error, hint) nele para ligar rótulo, erro e aria-invalid.
export function fieldProps(id, error, hint) {
    const describedBy = [error ? `${id}-erro` : null, hint ? `${id}-dica` : null].filter(Boolean).join(" ");
    return {
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy || undefined,
    };
}

export default function FormField({id, label, error, hint, required, className, children}) {
    return (
        <div className={`cm-field${error ? " is-invalid" : ""}${className ? ` ${className}` : ""}`}>
            <label className="cm-field__label" htmlFor={id}>
                {label}
                {required && <span aria-hidden="true"> *</span>}
            </label>
            {children}
            {hint && !error && <span className="cm-field__hint" id={`${id}-dica`}>{hint}</span>}
            {error && (
                <div className="cm-field__error" id={`${id}-erro`}>
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
}
