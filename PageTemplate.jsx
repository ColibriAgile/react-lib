import React, {forwardRef, useEffect, useImperativeHandle, useRef} from "react";
import {Button, Grid, IconButton, Paper, styled, useMediaQuery, useTheme} from "@mui/material";
import {DataGrid, LoadIndicator} from "devextreme-react";
import {
    ColumnChooser,
    Export,
    FilterRow,
    Scrolling,
    SearchPanel, Toolbar, Item
} from "devextreme-react/data-grid";
import {usePromiseTracker} from "react-promise-tracker";
import {useDimensions} from "../_react-lib";
import GridTitle from "./GridTitle";
import AutorenewIcon from '@mui/icons-material/Autorenew';


const DivContainer = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 0),
    margin: theme.spacing(1, 1),
    [theme.breakpoints.down("sm")]: {
        margin: theme.spacing(0, 0),
    }
}));


const PaperGrid = styled(Paper)(({theme}) => ({
    padding: theme.spacing(2, 2),
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(0, 0),
        marginTop: theme.spacing(1),
    }
}));

const PageTemplate = forwardRef(({
                                     title,
                                     dataSource,
                                     filterValue = undefined,
                                     showFilterRow = true,
                                     exportEnabled = true,
                                     columnChooserEnabled = true,
                                     children,
                                     customOnClick = undefined,
                                     customButtonText = undefined,
                                     reloadButtonOnClick = undefined

                                 }, ref) => {
    const {promiseInProgress} = usePromiseTracker();
    const {height} = useDimensions();
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("sm"));
    const altura = mobile ? height - 110 : height - 160;
    const grid = useRef();


    useEffect(() => {
        let reference = grid.current;
        promiseInProgress
            ? reference?.instance?.beginCustomLoading()
            : reference?.instance?.endCustomLoading();
        return () => reference?.instance?.endCustomLoading();
    }, [promiseInProgress, grid]);


  useImperativeHandle(ref, () => ({
    obterGrid() {
      return grid.current;
    },
  }));

    return (
        <DivContainer>
            <PaperGrid>
                <DataGrid
                    ref={grid}
                    showBorders={true}
                    showColumnHeaders={true}
                    rowAlternationEnabled={true}
                    showRowLines={false}
                    showColumnLines={true}
                    dataSource={dataSource}
                    allowColumnResizing={true}
                    filterValue={filterValue}
                    height={altura}
                >
                    <Toolbar>
                        <Item location="before">
                            <Grid container>
                             <Grid item >
                            <GridTitle titulo={title}/>
                             </Grid>
                            {customOnClick &&
                                <Grid item>
                                    <Button sx={{marginBottom: theme.spacing(1)}} variant="contained" size="small"
                                            color="primary" onClick={customOnClick}>{customButtonText}</Button>
                                </Grid>

                            }
                            </Grid>
                        </Item>
                        {reloadButtonOnClick &&
                            <Item location="after">
                                <IconButton aria-label="refresh" color="secondary" onClick={reloadButtonOnClick}>
                                    <AutorenewIcon />
                                </IconButton>
                            </Item>
                        }
                        <Item name="applyFilterButton"/>
                        <Item name="addRowButton"/>
                        <Item name="exportButton"/>
                        <Item name="columnChooserButton"/>
                        <Item name="revertButton"/>
                        <Item name="saveButton"/>
                    </Toolbar>
                    <FilterRow visible={showFilterRow}/>
                    <SearchPanel visible={false}/>
                    <Scrolling mode="infinite" rowRenderingMode="virtual"/>
                    <ColumnChooser enabled={columnChooserEnabled}/>
                    <LoadIndicator enabled={promiseInProgress}/>
                    <Export enabled={exportEnabled} fileName={title}/>
                    {children}
                </DataGrid>
            </PaperGrid>
        </DivContainer>
    );
});

export default PageTemplate;
