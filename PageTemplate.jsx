import React, { useEffect, useRef } from "react";
import {Paper, styled, useMediaQuery, useTheme} from "@mui/material";
import { DataGrid, LoadIndicator } from "devextreme-react";
import {
  ColumnChooser,
  Export,
  FilterRow,
  Scrolling,
  SearchPanel, Toolbar, Item
} from "devextreme-react/data-grid";
import { usePromiseTracker } from "react-promise-tracker";
import { useDimensions } from "../_react-lib";
import GridTitle from "./GridTitle";


const DivContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 0),
  margin: theme.spacing(1, 1),
  [theme.breakpoints.down("sm")]: {
    margin: theme.spacing(0, 0),
  }
}));


const PaperGrid =  styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2, 2),
  marginTop: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0, 0),
    marginTop: theme.spacing(1),
  }
}));

const PageTemplate = ({
  title,
  dataSource,
  filterValue = undefined,
  showFilterRow = true,
  children,
}) => {
  const { promiseInProgress } = usePromiseTracker();
  const { height } = useDimensions();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const altura = mobile ? height - 110 : height - 160;
  const ref = useRef();

  useEffect(() => {
    let reference = ref.current;
    promiseInProgress
      ? reference?.instance?.beginCustomLoading()
      : reference?.instance?.endCustomLoading();
    return () => reference?.instance?.endCustomLoading();
  }, [promiseInProgress, ref]);

  return (
    <DivContainer>
      <PaperGrid>
        <DataGrid
          ref={ref}
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
              <GridTitle titulo={title}/>
            </Item>
            <Item name="applyFilterButton" />
            <Item name="addRowButton"/>
            <Item name="exportButton" />
            <Item name="columnChooserButton" />
            <Item name="revertButton" />
            <Item name="saveButton" />
          </Toolbar>
          <FilterRow visible={showFilterRow} />
          <SearchPanel visible={false} />
          <Scrolling mode="infinite" rowRenderingMode="virtual" />
          <ColumnChooser enabled={true} />
          <LoadIndicator enabled={promiseInProgress} />
          <Export enabled={true} fileName={title} />
          {children}
        </DataGrid>
      </PaperGrid>
    </DivContainer>
  );
};

export default PageTemplate;
