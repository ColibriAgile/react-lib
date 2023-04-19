import React from "react";
import { createConfirmation, confirmable } from "react-confirm";
import {
  Dialog,
  DialogActions,
  DialogContent,
  useMediaQuery,
  Button, useTheme, ThemeProvider, styled,
} from "@mui/material";
import ModalTitulo from "./ModalTitulo";
import { useTranslation } from "react-i18next";
import LoadingButton from "./LoadingButton";

const DialogActionsContainer = styled(DialogActions)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    justifyContent: "flex-start",
    "& button": {
      flexGrow: 1,
    },
  }
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
  const theme = useTheme();
  const full = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        fullScreen={fullScreen || full}
        open={show}
        onClose={(event, reason) => {
          if (reason === "escapeKeyDown") {
            dismiss();
          }
        }}
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
        <DialogActionsContainer>
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
        </DialogActionsContainer>
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
