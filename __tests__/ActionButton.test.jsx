import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import ActionButton from "../ActionButton";
import {ThemeProvider} from "@mui/material";
import theme from "../../@nui/mui-theme";

test('Deve renderizar action button', () => {
  render(
      <ThemeProvider theme={theme}>
        <ActionButton label="action" />
      </ThemeProvider>);
  const linkElement = screen.getByText(/action/i);
  expect(linkElement).toBeInTheDocument();
});


test('Deve renderizar SpeedDialIcon se o label não for informado', () => {
  render(
      <ThemeProvider theme={theme}>
        <ActionButton data-testid="action"/>
      </ThemeProvider>);
  const button = screen.getByRole("button");
  const icon = screen.getByTestId('AddIcon')
  expect(button).toContainElement(icon);
});
