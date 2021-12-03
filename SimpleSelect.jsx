import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

const SimpleSelect = forwardRef(
    (
        {
            options,
            getOptionDisabled,
            register,
            error,
            helperText,
            name,
            label,
            value,
            optionValue,
            optionLabel,
            onChange,
            novoItem = null,
            size,
            startAdornment = null,
            autoFocus = false,
            disabled = false,
            clearOnEscape = true,
            disableClearable = false,
            selecionarPrimeiro = false,
            freeSolo = false,
        },
        ref
    ) => {
        const [selected, setSelected] = useState("");
        const itemVazio = useMemo(
            function montarItemVazio() {
                const temp = {};
                temp[optionValue] = -1;
                temp[optionLabel] = novoItem;
                return temp;
            },
            [optionValue, optionLabel, novoItem]
        );

        const [optionsSel, setOptionsSel] = useState([]);
        const elem = useRef();

        const handleChange = useCallback(
            (e, newValue) => {
                setSelected(newValue ? newValue : "");
                onChange(e, newValue ? newValue[optionValue] : "");
            },
            [onChange, setSelected, optionValue]
        );

        const addField = (e) => {
            elem.current = e;
            if (register) {
                register(e);
            }
        };

        useEffect(
            function carregarOption() {
                if (novoItem) {
                    setOptionsSel([itemVazio, ...options]);
                } else {
                    setOptionsSel(options);
                }
            },
            [options, setOptionsSel, novoItem, itemVazio]
        );

        useEffect(
            function carregouOptionSel() {
                if (selecionarPrimeiro && optionsSel && optionsSel.length > 0 && !selected) {
                    handleChange({ target: { name: name } }, optionsSel[0]);
                }
            },
            [optionsSel, selected, selecionarPrimeiro, name, handleChange]
        );

        useEffect(
            function selecionou() {
                if (options) {
                    const sel = options.find((o) => o[optionValue] === value);
                    setSelected(sel ? sel : "");
                }
            },
            [value, optionValue, options]
        );

        useImperativeHandle(ref, () => ({
            setSelected(item) {
                if (optionsSel) {
                    const sel = optionsSel.find((o) => o[optionValue] === item);
                    setSelected(sel);
                }
            },
            addAndSelect(item) {
                const newOptions = [item, ...optionsSel.slice(1)].sort((a, b) =>
                    a[optionLabel] > b[optionLabel] ? 1 : -1
                );
                setSelected(item);
                setOptionsSel([itemVazio, ...newOptions]);
                elem.current.focus();
            },
            focus() {
                if (elem?.current) {
                    elem.current.focus();
                }
            },
        }));

        return (
            <Autocomplete
                value={selected}
                onChange={(e, newValue) => {
                    if (!e?.target?.name) {
                        e.target.name = name;
                    }
                    handleChange(e, newValue);
                }}
                fullWidth={true}
                getOptionLabel={(option) => {
                    const prefix = option && option[optionValue] > 0 && startAdornment ? startAdornment + " " : "";
                    return option[optionLabel] ? prefix + option[optionLabel] : "";
                }}
                isOptionEqualToValue={(option, value) => {
                    if (value) {
                        return option[optionValue] === value[optionValue];
                    } else {
                        return null;
                    }
                }}
                getOptionDisabled={getOptionDisabled}
                options={optionsSel ? optionsSel : []}
                autoHighlight={true}
                openOnFocus={true}
                clearOnEscape={clearOnEscape}
                disableClearable={disableClearable}
                name={name}
                disabled={disabled}
                freeSolo={freeSolo}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={label}
                        name={name}
                        variant="outlined"
                        inputRef={(e) => addField(e)}
                        error={error}
                        size={size}
                        helperText={helperText}
                    />
                )}
            />
        );
    }
);

export default React.memo(SimpleSelect);
