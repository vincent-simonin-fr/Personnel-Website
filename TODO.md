# TODO

- [ ] Follow recommended Next.js best practices for optimizing performance (Package bundling, code splitting, lazy loading, etc.)
- [ ] Install Core web vitals https://nextjs.org/docs/app/building-your-application/optimizing/analytics
- [ ] Look for up the local params in providers file
- [ ] use all of these routing patterns :
  - [x] layout: Shared UI for a segment and its children
  - [x] page: Unique UI of a route and make routes publicly accessible
  - [ ] loading: Loading UI for a segment and its children
  - [x] not-found: Not found UI for a segment and its children
  - [ ] error: Error UI for a segment and its children
  - [ ] global-error: Global Error UI
  - [ ] route: Server-side API endpoint
  - [ ] template: Specialized re-rendered Layout UI
  - [ ] default: Fallback UI for Parallel Routes
- [ ] Refactor global layout & locale layout
- [ ] Replace standard hooks copies by use usehooks-ts
- [ ] Remotion demo
- [ ] Echarts demo
- [ ] MapBox demo
- [ ] cookie yes
- [ ] AI demo
- [ ]

// npm install -D postcss-flexbugs-fixes postcss-preset-env. @fullhuman/postcss-purgecss postcss

    // 'postcss-flexbugs-fixes': {},
    // 'postcss-preset-env': {
    //   autoprefixer: {
    //     flexbox: 'no-2009',
    //   },
    //   stage: 3,
    //   features: {
    //     'custom-properties': false,
    //   },
    // },
    // '@fullhuman/postcss-purgecss':
    //   process.env.NODE_ENV === 'production'
    //     ? {
    //         content: ['./src/**/*.{js,jsx,ts,tsx}'],
    //         defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    //         safelist: ['html', 'body'],
    //       }
    //     : false,
