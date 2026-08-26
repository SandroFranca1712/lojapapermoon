/**
 * Central config — company data + WhatsApp CTA messages.
 * Reused across markup via data-wa-context on any element with [data-wa].
 */
window.PAPERMOON = {
  company: {
    name: "Loja Papermoon",
    whatsapp: "5515991686052",
    whatsappDisplay: "+55 15 99168-6052",
  },
  waMessages: {
    geral: "Olá, vim pelo site da Papermoon e gostaria de um orçamento!",
    photocards: "Olá, vim pelo site da Papermoon e gostaria de solicitar um orçamento para Photocards personalizados.",
    kit: "Olá, vim pelo site da Papermoon e gostaria de saber mais sobre o Kit Surpresa.",
    polaroids: "Olá, vim pelo site da Papermoon e gostaria de solicitar um orçamento para Polaroids.",
    personalizacao: "Olá, vim pelo site da Papermoon e gostaria de criar um produto personalizado.",
  },
};

window.PAPERMOON.waLink = function (contextKey) {
  var msg = window.PAPERMOON.waMessages[contextKey] || window.PAPERMOON.waMessages.geral;
  return "https://wa.me/" + window.PAPERMOON.company.whatsapp + "?text=" + encodeURIComponent(msg);
};
