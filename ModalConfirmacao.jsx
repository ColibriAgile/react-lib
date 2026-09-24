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

// createConfirmation monta o diálogo fora da árvore da aplicação, sem o ThemeProvider dela.
// A aplicação pode registrar o próprio tema aqui (ex.: tema Colibri UI).
let confirmacaoTheme = null;
export function setConfirmacaoTheme(theme) {
  confirmacaoTheme = theme;
}

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
  options = {},
}) => {
  // options.destructive: ação irreversível — botão vermelho e o foco (Enter) fica em Cancelar.
  const destructive = !!options.destructive;
  const { t } = useTranslation();
  const defaultTheme = useTheme();
  const theme = confirmacaoTheme ?? defaultTheme;
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
          <Button variant="outlined" onClick={cancel} color="primary" autoFocus={destructive}>
            {cancelLabel ?? t("acao.cancelar")}
          </Button>
          <LoadingButton
            variant="contained"
            onClick={async () => {
              if (onConfirm) {
                await onConfirm();
              }
              proceed();
            }}
            color={destructive ? "error" : "primary"}
            autoFocus={autoFocus && !destructive}
          >
            {okLabel ?? t("acao.ok")}
          </LoadingButton>
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
