# Charte visuelle

Charte **de fait** : elle formalise les conventions déjà présentes dans le code (relevé du 2026-11-07) pour que les nouvelles pages restent cohérentes. Elle est à ajuster par le propriétaire du site ; toute évolution se fait ici d'abord, puis dans le code.

## Colors

- **Accent unique : le token HeroUI `--accent`**, fuchsia qui suit le thème (`#c026d3` en clair = `siteConfig.color`, fuchsia-500 en sombre). Classes `text-accent`, `bg-accent`, `border-accent`, `fill-accent`, `stroke-accent`… ; jamais de `fuchsia-*` Tailwind. Petit texte (liens, lien actif de la nav) : classe **`text-brand`** (fuchsia-700 en clair, l'accent en sombre) pour atteindre le contraste WCAG 4,5:1 ; `text-accent` seulement pour le grand texte (≥ 24 px) et les icônes. Réservé à ce qui doit attirer l'œil : mots clés de l'accroche, lien actif de la nav, liens, bordures et anneaux de focus, animations de marque. Jamais en aplat de fond.
- **Neutres : l'échelle `primary-*`** du site, définie dans `src/styles/globals.css` (avec les tokens HeroUI `--background`, `--foreground`, `--accent` = fuchsia, `--focus`). Elle est **inversée entre thèmes** (`primary-50` est clair en sombre, foncé en clair) : utiliser ces classes plutôt que des gris Tailwind ou des hex, pour que les deux thèmes fonctionnent sans code.
- Fonds : `bg-background`. Texte courant : hérité (`*:text-primary` sur `body`).
- Thème **sombre par défaut**. Toute variation selon le thème passe par la variante CSS `dark:`, jamais par `useTheme()` au rendu (sinon décalage d'hydratation).

## Typography

Police : Hanken Grotesk (instance unique `siteFont`, `site/siteFont.ts`), graisse 600 pour les titres d'accroche.

| Rôle | Classes |
|---|---|
| Accroche (hero) | `text-3xl md:text-4xl lg:text-5xl` |
| Titre de section (`h2`) | `text-4xl md:text-5xl tracking-tight` |
| Corps large | `text-xl md:text-2xl leading-relaxed` |
| Corps / cartes | `text-lg` |
| Secondaire, puces | `text-sm` |

Titres : `text-balance` ; paragraphes : `text-pretty`, mesure `max-w-prose` (65 caractères) pour le texte courant. Pas de petit libellé en majuscules au-dessus d'un titre : le titre se suffit, et une information utile (nom de phase) s'écrit en tête du titre, en `text-brand`. Hiérarchie sémantique respectée : un `h1` par page, `h2` pour les sections, `h3` dedans.

## Layout

- Colonne de contenu : `w-[84vw]`, centrée.
- Écran d'ouverture et pages : `min-h-[calc(100vh-60px)]` (hauteur moins le header).
- Espacements : `gap-4` (éléments liés), `gap-8` (blocs), `gap-16` (sections d'une page), `gap-28` (sections de l'accueil).
- Accueil : récit concret (accroche, références, méthode en 5 phases avec preuves, projets phares, parcours, contact). Page Projets : une scène plein écran par projet (voir « Fiche projet »).
- Points de rupture : ceux de Tailwind ; le header passe en mode mobile sous 640 px.

## Components

- **Bouton principal** : HeroUI `Button`, `rounded-full bg-primary-50 text-primary-900` ; en lien, un `Link` de Next avec `cn(buttonVariants(), …)` et les mêmes classes. Secondaire : `variant='secondary'` + `rounded-full bg-primary-600 text-primary-100 dark:bg-primary-800` (neutre ; la variante seule prendrait l'accent fuchsia ; `primary-800` seul se confondrait avec le fond en clair).
- **Carte / panneau** : `rounded-large`, `p-6` (ou `p-5` pour les cartes de grille), fond `bg-background` ou `bg-primary-900`, bordure `border-1 border-primary-700`. Règle par défaut partout, sauf les fiches projet.
- **Fiche projet / scène** (`ProjectCard`, `ProjectScene`) : `rounded-3xl`, fond en verre `bg-primary-900/80 backdrop-blur-xl`, bordure `border-1 border-primary-800`, ombre portée profonde (`shadow-2xl`). Derrière l'illustration, un halo fuchsia flou est permis (lumière, jamais un aplat). Frise des 5 phases : point plein fuchsia = phase couverte, point creux = non couverte, doublée d'un texte `sr-only`.
- **Rayons** : `rounded-small`, `rounded-medium`, `rounded-large` = 2 / 4 / 6 px (définis dans `globals.css`) ; échelle Tailwind standard pour le reste. `rounded-full` pour les boutons et les puces.
- Champs de formulaire : voir `ContactForm` (`TextField` HeroUI, `rounded-xl`, fond `primary-900`, anneau de focus fuchsia, hauteur `h-8`).

## Motion

- Les animations sont **décoratives** : `aria-hidden`, montées seulement près de l'écran (`OnScreen`), sans décalage de mise en page (conteneur de même taille).
- Respecter `prefers-reduced-motion`.
- Apparitions (`FadeInWhenVisible`) : zoom avec léger rebond `cubic-bezier(0.34, 1.56, 0.64, 1)`, signature du site (choix du propriétaire, 2026-11-22) ; joué en CSS au chargement, sans attendre le JavaScript, et contenu visible sans JS. Ailleurs : ralenti progressif (`ease-out`). Élément non cliquable : pas de soulèvement ni de bordure colorée au survol (ce sont des signaux de lien) ; une lumière qui s'intensifie est permise (halo des cartes « autres réalisations », qui montent aussi en cascade au défilement, `projects/projects.css`).
- Entrées de contenu : `FadeInOnAppear` / `FadeInWhenVisible` (CSS pur), pas d'animation maison ni de bibliothèque JS d'animation.
- Profondeur au défilement : attributs `data-scene` (la scène) et `data-parallax` / `data-parallax-fade` (ses plans), distance réglée par `[--parallax:…]` (positive = le plan traîne, négative = il devance). CSS pur (`animation-timeline: view()`), statique sans support ou en mouvement réduit.

## Images

- Image décorative : `alt=""`. Image au-dessus de la ligne de flottaison (LCP) : `preload` + `fetchPriority='high'`.
- Photos en import statique (aperçu flou, cache long) ; source à 3840 px de large maximum (Next n'en sert jamais plus). AVIF est servi automatiquement.
- Visuels de projets : pas de captures (projets clients confidentiels) ; illustrations SVG abstraites (`ProjectIllustration`), une par type de projet.
