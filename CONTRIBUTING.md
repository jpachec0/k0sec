# Contribuindo com o site da K0Sec

Obrigado por querer melhorar a presença oficial da K0Sec.

## Como Rodar Localmente

Este site é estático. Basta servir a pasta do projeto:

```bash
npm run dev
```

Acesse `http://127.0.0.1:4173`.

## Validações Recomendadas

```bash
npm run validate
git diff --check
```

Quando alterar responsividade, valide visualmente pelo menos:

- 320px de largura.
- 390px de largura.
- 768px de largura.
- 1024px de largura.
- 1440px de largura.

## Padrões de Código

- HTML semântico e acessível.
- CSS responsivo, organizado e sem `!important` desnecessário.
- JavaScript simples, previsível e sem dependências desnecessárias.
- Links oficiais e dados das áreas centralizados em `site-data.js`.
- Nenhuma senha, token, `.env` ou dado sensível no repositório.

## Commits

Use Conventional Commits:

- `feat:` para funcionalidades.
- `fix:` para correções.
- `style:` para ajustes visuais.
- `docs:` para documentação.
- `chore:` para manutenção.
