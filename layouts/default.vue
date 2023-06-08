<template>
  <div class="user-info" v-if="posCustomerId">
    <div class="user-info__id">POS Customer ID: {{ posCustomerId }}</div>
  </div>
  <div class="pb-20">
    <div class="row" v-for="row in 3">
      <!-- w-400 = width: 40rem (400px), mw-full = max-width: 100% -->
      <div class="card p-0 col mt-20 mb-0" v-for="i in 3">
        <!-- p-0 = padding: 0 -->
        <img
          src="https://store.arapahoebasin.com/images/thumbs/000/0002976_2023-24-full-season-pass_1700.png"
          class="img-fluid rounded-top"
          alt="..."
        />
        <!-- rounded-top = rounded corners on the top -->
        <!-- Nested content container inside card -->
        <div class="content">
          <h2 class="content-title">2023-24 Season Pass</h2>
          <p class="text-muted">
            Subtitle that hooks the reader and prompts them to click on the
            button.
          </p>
          <div style="display: grid">
            <!-- text-right = text-align: right -->
            <a href="#" class="btn btn-primary" style="margin: 0 -15px"
              >Shop Now</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useUser } from '../composables/useUser';
import { useDarkMode } from '../composables/useDarkMode';
import { usePasswordless } from '../composables/usePasswordless';
import { useOrganization } from '../composables/useOrganization';
const sidebarOpen = ref(false);
const user = useUser();
const organization = useOrganization();
const darkMode = useDarkMode();
const passwordless = usePasswordless();
const signInModal = ref();
const pageAttributes = computed(() => {
  const props = {};

  if (!sidebarOpen.value) props['data-sidebar-hidden'] = 'hidden';

  return props;
});

function showSignInModal() {
  if (!signInModal.value) return;
  signInModal.value.show();
}

function signOutClicked() {
  window.location =
    // 'https://login.qa.alterramtnco.com/logout?client_id=7zJ1JqPzEVui0fkNN5BTie6zXhxmU5IO&returnTo=https://logindev.aspenware.net/v2/logout?client_id=UoHCscMvs3xpHLguNW7BjI64h4Qo0UBl';

  return user.logout({
    client_id: 'UoHCscMvs3xpHLguNW7BjI64h4Qo0UBl',
    logoutParams: {
      returnTo: new URL('/', location).toString(),
      federated: true,
    },
  });
}

function toggleDarkmode() {
  darkMode.value = !darkMode.value;
}

function togglePasswordless() {
  passwordless.value = !passwordless.value;
}

function toggleOrganization() {
  organization.value = !organization.value;
}

onMounted(() => {
  // Getting the required elements
  var pageWrapper = document.getElementById('page-wrapper');
  var filterDocsElem = document.getElementById('search');

  halfmoon.toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value;
  };
  // Handle keydown events (overridden)
  halfmoon.keydownHandler = function (event) {
    // Shortcuts are triggered only if no input, textarea, or select has focus,
    // And if the control key or command key is not pressed down
    if (
      !(
        document.querySelector('input:focus') ||
        document.querySelector('textarea:focus') ||
        document.querySelector('select:focus')
      )
    ) {
      event = event || window.event;
      if (!(event.ctrlKey || event.metaKey)) {
        // Focus on the filter docs element when [shift] + [F] keys are  pressed, but only if sidebar is not hidden (since the filter box is in the sidebar)
        if (event.shiftKey && event.which == 70) {
          if (!pageWrapper.getAttribute('data-sidebar-hidden')) {
            filterDocsElem.focus();
            event.preventDefault();
          }
        }
      }
    }
  };
});
</script>

<style>
.page-header-buttons .dropdown {
  cursor: pointer;
}
.page-header-buttons > button {
  color: unset;
}
.page-header-buttons > button:not([disabled]) {
  cursor: pointer;
}
.page-header-buttons .dropdown,
.page-header-buttons > button {
  background: none;
  border: none;
  height: 100%;
  border-left: 1px solid white;
}
.page-header-buttons .dropdown.toggle-on-hover {
  cursor: default;
}
.page-header-buttons .dropdown:hover,
.page-header-buttons > button:not([disabled]):hover,
.page-header-buttons .dropdown:focus-visible,
.page-header-buttons button:not([disabled]):focus-visible {
  background-color: #0001;
}
</style>
