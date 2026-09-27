import {confirmWrapper} from "../ModalConfirmacao";
import {escapeHtml} from "./html";

// Edição e exclusão no DataGrid do DevExtreme na linha Colibri UI (DESIGN.md, "Camadas").
// `t` é o useTranslation() da página; os textos têm reserva para quem não tem as chaves.

// Rodapé do popup de edição (Editing mode="popup" → <Popup toolbarItems={...}/>): Cancelar à esquerda
// e Salvar, o principal, na extremidade direita. `obterGrid` devolve o componente DataGrid
// (ex.: () => ref.current.obterGrid() com GridPage). Os botões ficam unidos pelo devextreme.css.
export const rodapeEdicao = (t, obterGrid) => [
    {
        toolbar: "bottom",
        location: "after",
        widget: "dxButton",
        options: {
            text: t("acao.cancelar", "Cancelar"),
            onClick: () => obterGrid()?.instance.cancelEditData(),
        },
    },
    {
        toolbar: "bottom",
        location: "after",
        widget: "dxButton",
        options: {
            text: t("acao.salvar", "Salvar"),
            type: "default",
            onClick: () => obterGrid()?.instance.saveEditData(),
        },
    },
];

// <Form onEditorEnterKey={salvarComEnter(obterGrid, ["descricao"])}>: Enter em qualquer campo aciona
// Salvar; nos campos de texto longo listados, o Enter quebra a linha.
export const salvarComEnter = (obterGrid, camposMultilinha = []) => (e) => {
    if (!camposMultilinha.includes(e.dataField)) {
        obterGrid()?.instance.saveEditData();
    }
};

// Exclusão pela ação de linha (<Button name="delete" onClick={...}/> com Editing confirmDelete={false}):
// o diálogo nomeia o alvo em negrito e o botão padrão (Enter) é o principal, Excluir; Esc cancela.
// Não usa options.destructive, que põe o foco em Cancelar. `detalhe` diz o que mais será apagado.
export async function confirmarExclusao(t, e, {titulo, nome, detalhe}) {
    try {
        await confirmWrapper(
            `${t("exclusao.confirmar", {
                nome: escapeHtml(nome),
                defaultValue: "Excluir <strong>{{nome}}</strong>?",
                interpolation: {escapeValue: false},
            })}${detalhe ? `<br/>${detalhe}` : ""}`,
            titulo,
            t("acao.excluir", "Excluir")
        );
        e.component.deleteRow(e.row.rowIndex);
    } catch (err) {
        // cancelado
    }
}
