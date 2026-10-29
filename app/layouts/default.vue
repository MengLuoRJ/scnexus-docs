<template>
  <div class="flex min-h-screen flex-col bg-white dark:bg-slate-950">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
