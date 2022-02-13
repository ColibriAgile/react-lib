import React from "react";
import { createConfirmation, confirmable } from "react-confirm";
import { makeStyles, ThemeProvider, useTheme } from "@mui/styles";
import {
  Dialog,
  DialogActions,
  DialogContent,
  useMediaQuery,
  Button,
} from "@mui/material";
import ModalTitulo from "./ModalTitulo";
import { useTranslation } from "react-i18next";
import LoadingButton from "./LoadingButton";

const useStyles = makeStyles(theme => ({
  action: {
    [theme.breakpoints.down("sm")]: {
      justifyContent: "flex-start",
      "& button": {
        flexGrow: 1,
      },
    },
  },
}));

const ModalConfirmacao = ({
  title,
  message,
  okLabel,
  cancelLabel,
  show,
  proceed,
  dismiss,
  cancel,
  onConfirm = null,
  autoFocus = true,
  fullScreen = false,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const full = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        fullScreen={fullScreen || full}
        open={show}
        onEscapeKeyDown={dismiss}
        fullWidth={full}
        scroll="body"
      >
        <ModalTitulo titulo={title} onClose={dismiss} />
        <DialogContent dividers>
          <p
            dangerouslySetInnerHTML={{
              __html: message,
            }}
          />
        </DialogContent>
        <DialogActions className={classes.action}>
          <LoadingButton
            variant="contained"
            onClick={async () => {
              if (onConfirm) {
                await onConfirm();
              }
              proceed();
            }}
            color="primary"
            autoFocus={autoFocus}
          >
            {okLabel ?? t("acao.ok")}
          </LoadingButton>
          <Button variant="outlined" onClick={cancel} color="primary">
            {cancelLabel ?? t("acao.cancelar")}
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

const confirm = createConfirmation(confirmable(ModalConfirmacao));

export function confirmWrapper(
  message,
  title,
  okLabel = "Ok",
  onConfirm = null,
  options = {}
) {
  return confirm({ message, title, okLabel, onConfirm, options });
}

export default confirm;
