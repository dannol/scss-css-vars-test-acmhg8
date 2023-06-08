<template>
  <div class="app-root">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup>
import './assets/index.scss';

const darkMode = useDarkMode();

const bodyAttrs = computed(() => {
  const atts = {};

  if (darkMode.value) atts['class'] = 'dark-mode';

  return atts;
});

const headOptions = computed(() => {
  return {
    bodyAttrs: bodyAttrs.value,
  };
});

useHead(headOptions);

watch(
  darkMode,
  (val) => {
    if (typeof window == 'undefined') return;
    const darkClass = 'dark-mode';
    if (val) {
      document.body.classList.add(darkClass);
    } else {
      document.body.classList.remove(darkClass);
    }
  },
  { immediate: true }
);
</script>
