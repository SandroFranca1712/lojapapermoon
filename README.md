# Imagens da Papermoon

Estrutura pronta para receber os assets reais da cliente. Substitua os blocos `placeholder-frame` marcados com `<!-- TODO -->` no `Index.html` pelas tags `<img>` correspondentes, usando os caminhos abaixo.

## /products
- `photocards.jpg` — foto de produto, seção Produtos
- `kit-surpresa.jpg` — foto de produto, seção Produtos
- `polaroids.jpg` — foto de produto, seção Produtos
- `photocard-01.jpg`, `polaroid-01.jpg`, `kit-01.jpg`, `photocard-02.jpg` — composição do Hero (cards da "collection wall")

## /gallery
- `01.jpg` a `06.jpg` (ou nomes descritivos) — grade da Galeria
- `emocional.jpg` — seção "Não é só papelaria."
- `personalizacao.jpg` — seção "Sua ideia, sua peça."

## /brand
- logo oficial (SVG preferencialmente, para o header)
- `og-cover.jpg` (1200×630) — preview ao compartilhar o link
- favicon

Recomendações: exportar em WebP com fallback JPG, manter proporção próxima ao aspect-ratio já definido em CSS para cada slot (evita layout shift), e usar nomes de arquivo descritivos para o `alt text`.
