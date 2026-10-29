export default defineAppConfig({
  ui: {
    colors: {
      primary: 'brand',
      secondary: 'emerald',
      success: 'emerald',
      info: 'brand',
      warning: 'amber',
      error: 'red',
      neutral: 'slate',
    },
    button: {
      defaultVariants: {
        size: 'md',
      },
    },
    card: {
      variants: {
        variant: {
          outline: {
            root: 'bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800',
          },
        },
      },
    },
  },
})
