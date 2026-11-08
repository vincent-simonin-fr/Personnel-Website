# Charte visuelle

Charte **de fait** : elle formalise les conventions déjà présentes dans le code (relevé du 2026-11-07) pour que les nouvelles pages restent cohérentes. Elle est à ajuster par le propriétaire du site ; toute évolution se fait ici d'abord, puis dans le code.

## Couleurs

- **Accent unique : fuchsia `#c026d3`** (`siteConfig.color`, classe `text-fuchsia-600`). Réservé à ce qui doit attirer l'œil : mots clés de l'accroche, lien actif de la nav, liens, bordures et anneaux de focus, animations de marque. Jamais en aplat de fond.
- **Neutres : l'échelle `primary-*`** du site, définie dans `src/styles/globals.css` (avec les tokens HeroUI `--background`, `--foreground`, `--accent` = fuchsia, `--focus`). Elle est **inversée entre thèmes** (`primary-50` est clair en sombre, foncé en clair) : utiliser ces classes plutôt que des gris Tailwind ou des hex, pour que les deux thèmes fonctionnent sans code.
- Fonds : `bg-background`. Texte courant : hérité (`*:text-primary` sur `body`).
- Thème **sombre par défaut**. Toute variation selon le thème passe par la variante CSS `dark:`, jamais par `useTheme()` au rendu (sinon décalage d'hydratation).

## Typographie

Police : Hanken Grotesk (`next/font`), graisse 600 pour les titres d'accroche.

| Rôle | Classes |
|---|---|
| Accroche (hero) | `text-3xl md:text-4xl lg:text-5xl` |
| Titre de section (`h2`) | `text-4xl md:text-5xl tracking-tight` |
| Corps large | `text-xl md:text-2xl leading-relaxed` |
| Corps / cartes | `text-lg` |
| Secondaire, puces | `text-sm` |

Titres et paragraphes longs : `text-pretty` (ou `text-balance` pour les titres centrés). Hiérarchie sémantique respectée : un `h1` par page, `h2` pour les sections, `h3` dedans.

## Mise en page et rythme

- Colonne de contenu : `w-[84vw]`, centrée.
- Écran d'ouverture et pages : `min-h-[calc(100vh-60px)]` (hauteur moins le header).
- Espacements : `gap-4` (éléments liés), `gap-8` (blocs), `gap-16` (sections d'une page), `gap-28` (sections de l'accueil).
- Sections de présentation : composant `PresentationSection` (visuel 1/3, texte 2/3, alterné avec `reverse`, empilé sous `md`). L'alignement à droite ne s'applique qu'à partir de `md`.
- Points de rupture : ceux de Tailwind ; le header passe en mode mobile sous 640 px.

## Composants

- **Bouton principal** : HeroUI `Button`, `rounded-full bg-primary-50 text-primary-900` ; en lien, un `next/link` avec `cn(buttonVariants(), …)` et les mêmes classes. Secondaire : `variant='secondary'` + `rounded-full bg-primary-800 text-primary-100` (neutre ; la variante seule prendrait l'accent fuchsia).
- **Carte / panneau** : `rounded-large`, `p-6` (ou `p-5` pour les cartes de grille), fond `bg-background` ou `bg-primary-900`, bordure `border-1 border-primary-700`.
- **Rayons** : `rounded-small/medium/large` = 2 / 4 / 6 px (définis dans `globals.css`) ; échelle Tailwind standard pour le reste. `rounded-full` pour les boutons et les puces.
- Champs de formulaire : voir `ContactForm` (`TextField` HeroUI, `rounded-xl`, fond `primary-900`, anneau de focus fuchsia, hauteur `h-8`).

## Mouvement

- Les animations sont **décoratives** : `aria-hidden`, montées seulement près de l'écran (`OnScreen`, `RivePlayer`), sans décalage de mise en page (conteneur de même taille).
- Respecter `prefers-reduced-motion`.
- Entrées de contenu : `FadeInOnAppear` / `FadeInWhenVisible` (CSS pur), pas d'animation maison ni de bibliothèque JS d'animation.

## Images

- Image décorative : `alt=""`. Image au-dessus de la ligne de flottaison (LCP) : `preload` + `fetchPriority='high'`.
- Photos importées statiquement depuis `src/assets/` (aperçu flou, cache long) ; source à 3840 px de large maximum (Next n'en sert jamais plus). AVIF est servi automatiquement.
- Visuels de projets : 16:9, dans `public/images/projects/` (chemins déclarés dans les dictionnaires JSON, qui ne peuvent pas faire d'import statique).
