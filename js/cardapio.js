/* =====================================================================
   CARDÁPIO — GRÃO DE CAFÉ
   Para mudar um preço, nome ou item, edite só este arquivo.
   - preco: escreva com vírgula, sem "R$"  →  "13,90"
   - detalhe: opcional (uma linha explicando o item).
   - opcoes: para o mesmo item com tamanhos ou sabores de preços diferentes:
       { nome: "Croissant", opcoes: [ { nome: "Queijo", preco: "10,00" }, { nome: "Nutella", preco: "13,00" } ] }
   - O item do "destaque" (foto) não precisa se repetir na lista abaixo dele.
   - destaque: a foto grande no topo da categoria. Use null para não ter.
     As fotos ficam na pasta img/ (ex.: "mocha" = img/mocha.webp)
   - Cuidado para manter as aspas, vírgulas e chaves { } [ ].
   ===================================================================== */

window.CARDAPIO = [
  {
    id: "cafes", titulo: "Cafés",
    destaque: { foto: "mocha", nome: "Mocha", texto: "Chocolate ou caramelo", preco: "14,90" },
    itens: [
      { nome: "Café espresso", preco: "9,90" },
      { nome: "Cappuccino italiano", preco: "13,90" },
      { nome: "Café com leite", preco: "11,90" },
      { nome: "Café coado", preco: "9,90" },
      { nome: "Doppio", preco: "12,90" },
      { nome: "Macchiato", preco: "8,90" },
      { nome: "Cappuccino Nutella", opcoes: [ { nome: "50 ml", preco: "10,90" }, { nome: "140 ml", preco: "13,90" } ] },
      { nome: "Cappuccino fit", preco: "16,90" },
      { nome: "Cappuccino paçoca", preco: "13,90" }
    ]
  },
  {
    id: "gelados", titulo: "Gelados",
    destaque: { foto: "affogato", nome: "Affogato de Nutella", texto: "Sorvete, espresso e Nutella", preco: "19,90" },
    itens: [
      { nome: "Frappuccino paçoca", preco: "19,90" },
      { nome: "Frappuccino sensação", preco: "19,90" }
    ]
  },
  {
    id: "soft-drinks", titulo: "Soft drinks",
    destaque: null,
    itens: [
      { nome: "Tropical café", preco: "16,90" },
      { nome: "Espresso tônica", preco: "17,90" },
      { nome: "Soda italiana", preco: "12,90" }
    ]
  },
  {
    id: "chocolates", titulo: "Chocolates",
    destaque: { foto: "chocolate-europeu", nome: "Chocolate estilo europeu", texto: "Cremoso, servido em 130 ml", preco: "14,90" },
    itens: [
      { nome: "Submaltine", detalhe: "240 ml", preco: "16,90" }
    ]
  },
  {
    id: "bebidas", titulo: "Bebidas",
    destaque: null,
    itens: [
      { nome: "Água", preco: "4,00" },
      { nome: "Água com gás", preco: "5,00" },
      { nome: "Coca-Cola Zero", preco: "7,00" },
      { nome: "Schweppes", preco: "8,00" },
      { nome: "Refrigerante", preco: "6,00" },
      { nome: "Suco de laranja", opcoes: [ { nome: "300 ml", preco: "9,90" }, { nome: "500 ml", preco: "14,90" } ] },
      { nome: "Chá", preco: "6,00" }
    ]
  },
  {
    id: "salgados", titulo: "Salgados",
    destaque: { foto: "empada", nome: "Empada de frango", texto: "Com requeijão cremoso", preco: "10,00" },
    itens: [
      { nome: "Empada de carne seca", detalhe: "Com requeijão cremoso ou banana-da-terra", preco: "10,00" },
      { nome: "Empada de camarão", detalhe: "Cremoso", preco: "13,00" },
      { nome: "Coxinha", detalhe: "Frango com catupiry", preco: "8,00" },
      { nome: "Kibe", preco: "8,00" },
      { nome: "Croissant", opcoes: [ { nome: "Queijo", preco: "10,00" }, { nome: "Nutella", preco: "13,00" } ] },
      { nome: "Pão de queijo mineiro", detalhe: "Porção com 3 unidades", preco: "13,90" },
      { nome: "Pão delícia", preco: "4,00" }
    ]
  },
  {
    id: "tortas", titulo: "Tortas salgadas",
    destaque: { foto: "torta-banana", nome: "Carne seca com banana-da-terra", texto: "Torta salgada da casa", preco: "19,00" },
    itens: [
      { nome: "Camarão cremoso", preco: "22,00" },
      { nome: "Frango com requeijão cremoso", preco: "19,00" }
    ]
  },
  {
    id: "doces", titulo: "Doces",
    destaque: { foto: "torta-chocolate", nome: "Torta de chocolate", texto: "A queridinha da vitrine", preco: "19,00" },
    itens: [
      { nome: "Torta crocante", preco: "19,00" },
      { nome: "Cheesecake de limão", preco: "17,00" },
      { nome: "Brigadeiro", preco: "4,00" },
      { nome: "Brownie", preco: "12,00" },
      { nome: "Brownie com sorvete", preco: "16,00" }
    ]
  }
];

/* Fotos da faixa "Da nossa vitrine" (foto = nome do arquivo em img/) */
window.VITRINE = [
  { foto: "cappuccino", nome: "Cappuccino italiano" },
  { foto: "torta-ninho", nome: "Torta de Ninho" },
  { foto: "coxinha", nome: "Coxinha" },
  { foto: "brigadeiro", nome: "Brigadeiro de café" },
  { foto: "mocha", nome: "Mocha" },
  { foto: "torta-chocolate", nome: "Torta de chocolate" }
];
