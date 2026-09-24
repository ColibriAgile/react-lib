import React, {forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState} from "react";
import {Button, ButtonGroup} from "@mui/material";
import {DataGrid} from "devextreme-react";
import {
    ColumnChooser,
    Export,
    FilterRow,
    Item,
    LoadPanel,
    Scrolling,
    SearchPanel,
    Toolbar,
} from "devextreme-react/data-grid";
import {usePromiseTracker} from "react-promise-tracker";
import {useTranslation} from "react-i18next";

// Página de listagem da linha Colibri UI sobre o DataGrid do DevExtreme (DESIGN.md, seção 9):
// barra de ferramentas acima da tabela (busca e contagem à esquerda, ações à direita) e
// uma única superfície de tabela. Mesma API de PageTemplate (que continua para quem não migrou), mais
// `actions` (grupo de botões; o principal por último), `countLabel` e repasse de props ao DataGrid.

const ROW_HEIGHT = 42;

const GridPage = forwardRef(({
                                 title,
                                 dataSource,
                                 filterValue = undefined,
                                 showFilterRow = true,
                                 exportEnabled = true,
                                 columnChooserEnabled = true,
                                 children,
                                 customOnClick = undefined,
                                 customButtonText = undefined,
                                 customButtonColor = "primary",
                                 customButtonVariant = "outlined",
                                 reloadButtonOnClick = undefined,
                                 countLabel = undefined,
                                 actions = undefined,
                                 ...gridProps
                             }, ref) => {
    const {t} = useTranslation();
    const {promiseInProgress} = usePromiseTracker();
    const grid = useRef();
    const page = useRef();
    const [count, setCount] = useState(null);
    const [fill, setFill] = useState(true);

    useEffect(() => {
        const instance = grid.current?.instance;
        promiseInProgress ? instance?.beginCustomLoading() : instance?.endCustomLoading();
        return () => instance?.endCustomLoading();
    }, [promiseInProgress]);

    useImperativeHandle(ref, () => ({
        obterGrid() {
            return grid.current;
        },
    }));

    // Com rolagem infinita, totalCount() conhece só as linhas já carregadas; a contagem vem
    // do store com o filtro combinado (linha de filtro, filtro de cabeçalho e busca).
    const recount = useCallback((component) => {
        const store = component?.getDataSource()?.store();
        if (!store) return;
        store.totalCount({filter: component.getCombinedFilter()})
            .then((total) => setCount(total >= 0 ? total : null))
            .catch(() => setCount(null));
    }, []);

    const onContentReady = (e) => recount(e.component);

    // Com array como dataSource, a troca do array nem sempre dispara contentReady de novo.
    useEffect(() => {
        if (!Array.isArray(dataSource)) return undefined;
        const timer = setTimeout(() => recount(grid.current?.instance), 0);
        return () => clearTimeout(timer);
    }, [dataSource, recount]);

    // Poucas linhas: altura automática, a superfície termina na última linha. Muitas: o grid ocupa a
    // área útil e rola por dentro. (max-height não serve: o grid calcula errado ao encolher.)
    const measure = useCallback(() => {
        const el = page.current;
        if (!el || count === null) return;
        const chrome = [".dx-datagrid-header-panel", ".dx-datagrid-headers", ".dx-datagrid-total-footer"]
            .reduce((sum, sel) => sum + (el.querySelector(sel)?.offsetHeight ?? 0), 2);
        setFill(chrome + Math.max(count, 1) * ROW_HEIGHT > el.clientHeight);
    }, [count]);

    useEffect(() => {
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(page.current);
        return () => observer.disconnect();
    }, [measure]);

    const countText = count === null
        ? ""
        : (countLabel ? countLabel(count) : t("grid.total", {count, defaultValue: "{{count}} registros"}));

    return (
        <div className="cm-grid-page" ref={page}>
            <DataGrid
                ref={grid}
                className="cm-grid"
                dataSource={dataSource}
                filterValue={filterValue}
                height={fill ? "100%" : "auto"}
                showBorders={true}
                showColumnHeaders={true}
                showColumnLines={false}
                showRowLines={true}
                rowAlternationEnabled={false}
                hoverStateEnabled={true}
                allowColumnResizing={true}
                columnHidingEnabled={true}
                onContentReady={onContentReady}
                noDataText={t("grid.vazio", "Nada para mostrar.")}
                {...gridProps}
            >
                <Toolbar>
                    <Item name="searchPanel" location="before"/>
                    <Item location="before" render={() => <span className="cm-section__count">{countText}</span>}/>
                    <Item name="applyFilterButton"/>
                    <Item name="addRowButton"/>
                    <Item name="revertButton"/>
                    <Item name="saveButton"/>
                    {reloadButtonOnClick && (
                        <Item
                            location="after"
                            widget="dxButton"
                            options={{
                                icon: "bi bi-arrow-clockwise",
                                hint: t("grid.atualizar", "Atualizar"),
                                elementAttr: {"aria-label": t("grid.atualizar", "Atualizar")},
                                onClick: reloadButtonOnClick,
                            }}
                        />
                    )}
                    <Item
                        name="exportButton"
                        location="after"
                        options={{
                            icon: "bi bi-download",
                            hint: t("grid.exportar", "Exportar"),
                            elementAttr: {"aria-label": t("grid.exportar", "Exportar")},
                        }}
                    />
                    <Item
                        name="columnChooserButton"
                        location="after"
                        options={{
                            icon: "bi bi-layout-three-columns",
                            hint: t("grid.colunas", "Escolher colunas"),
                            elementAttr: {"aria-label": t("grid.colunas", "Escolher colunas")},
                        }}
                    />
                    {actions?.length > 0 && (
                        <Item location="after" render={() => (
                            <ButtonGroup>
                                {actions.map((action) => (
                                    <Button
                                        key={action.text}
                                        variant={action.variant ?? "outlined"}
                                        color={action.color ?? "primary"}
                                        disabled={action.disabled}
                                        onClick={action.onClick}
                                    >
                                        {action.text}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        )}/>
                    )}
                    {customOnClick && (
                        <Item location="after" render={() => (
                            <Button variant={customButtonVariant} color={customButtonColor} onClick={customOnClick}>
                                {customButtonText}
                            </Button>
                        )}/>
                    )}
                </Toolbar>
                <SearchPanel visible={true} width={260} placeholder={t("grid.buscar", "Buscar")}/>
                <FilterRow visible={showFilterRow}/>
                <Scrolling mode="infinite" rowRenderingMode="virtual"/>
                <ColumnChooser enabled={columnChooserEnabled}/>
                <LoadPanel shading={false} showPane={true}/>
                <Export enabled={exportEnabled} fileName={title}/>
                {children}
            </DataGrid>
        </div>
    );
});

export default GridPage;
