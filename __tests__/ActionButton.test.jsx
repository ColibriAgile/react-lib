import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import ActionButton from "../ActionButton";
import {ThemeProvider} from "@mui/material";
import theme from "../../@nui/mui-theme";

test('renders action button', () => {
  render(
      <ThemeProvider theme={theme}>
        <ActionButton label="action" />
      </ThemeProvider>);
  const linkElement = screen.getByText(/action/i);
  expect(linkElement).toBeInTheDocument();
});
