<template>
  <div
    id="page-wrapper"
    class="page-wrapper with-navbar with-sidebar with-transitions"
    data-sidebar-type="overlayed-sm-and-down"
    v-bind="pageAttributes"
  >
    <!-- Sticky alerts -->
    <div class="sticky-alerts"></div>

    <!-- Navbar start -->
    <nav class="navbar">
      <div class="navbar-content">
        <button
          id="toggle-sidebar-btn"
          class="btn btn-action"
          type="button"
          @click="sidebarOpen = !sidebarOpen"
        >
          <i class="fa fa-bars" aria-hidden="true"></i>
        </button>
      </div>
      <a href="#" class="navbar-brand ml-10 ml-sm-20">
        <img
          src="https://www.gethalfmoon.com/static/site/img/fake-logo.svg"
          alt="fake-logo"
        />
        <span class="d-none d-sm-flex">Ski Mountain</span>
      </a>
      <div class="navbar-content ml-auto">
        <button
          class="btn btn-action mr-5"
          type="button"
          @click="toggleOrganization"
        >
          <img
            v-if="organization"
            src="//www.aspensnowmass.com/public/AspenSnowmass/images/favicon.png"
            height="21"
            style="margin-top: 5px"
          />
          <img
            v-else
            src="//www.jacksonhole.com/icons/favicon-32x32.png"
            height="21"
            style="margin-top: 5px"
          />
          <span class="sr-only">Toggle Resort</span>
        </button>
        <button
          class="btn btn-action mr-5"
          type="button"
          @click="togglePasswordless"
        >
          <i
            class="fa"
            aria-hidden="true"
            :class="{ 'fa-lock': !passwordless, 'fa-envelope': passwordless }"
          ></i>
          <span class="sr-only">Toggle passwordless</span>
        </button>
        <button
          class="btn btn-action mr-5"
          type="button"
          @click="toggleDarkmode"
        >
          <i
            class="fa"
            aria-hidden="true"
            :class="{ 'fa-sun-o': !darkMode, 'fa-moon-o': darkMode }"
          ></i>
          <span class="sr-only">Toggle dark mode</span>
        </button>
        <a
          href="#"
          class="btn btn-primary"
          role="button"
          :disabled="user.isLoading.value"
          v-if="user.isLoading.value"
        >
          <span class="d-inline-block i-spin i-mdi-loading" />
        </a>
        <a
          href="#"
          class="btn btn-primary"
          role="button"
          @click="signOutClicked"
          v-else-if="user.isAuthenticated.value"
          >Sign Out</a
        >
        <a
          href="#"
          class="btn btn-primary"
          role="button"
          @click="showSignInModal"
          v-else
          >Sign in</a
        >
      </div>
    </nav>
    <!-- Navbar end -->

    <!-- Sidebar overlay -->
    <div class="sidebar-overlay" onclick="halfmoon.toggleSidebar()"></div>

    <!-- Sidebar start -->
    <div class="sidebar">
      <div class="sidebar-menu">
        <div class="sidebar-content">
          <input
            type="text"
            class="form-control"
            placeholder="Search"
            id="search"
          />
          <div class="mt-10 font-size-12">
            Press <kbd>shift</kbd> + <kbd>F</kbd> to focus
          </div>
        </div>
        <h5 class="sidebar-title">Getting started</h5>
        <div class="sidebar-divider"></div>
        <a href="#" class="sidebar-link sidebar-link-with-icon active">
          <span class="sidebar-icon">
            <i class="fa fa-code" aria-hidden="true"></i>
          </span>
          Installation
        </a>
        <a href="#" class="sidebar-link sidebar-link-with-icon">
          <span class="sidebar-icon">
            <i class="fa fa-terminal" aria-hidden="true"></i>
          </span>
          CLI commands
        </a>
        <br />
        <h5 class="sidebar-title">Components</h5>
        <div class="sidebar-divider"></div>
        <a href="#" class="sidebar-link sidebar-link-with-icon">
          <span class="sidebar-icon">
            <i class="fa fa-folder-open-o" aria-hidden="true"></i>
          </span>
          File explorer
        </a>
        <a href="#" class="sidebar-link sidebar-link-with-icon">
          <span class="sidebar-icon">
            <i class="fa fa-table" aria-hidden="true"></i>
          </span>
          Spreadsheet
        </a>
        <a href="#" class="sidebar-link sidebar-link-with-icon">
          <span class="sidebar-icon">
            <i class="fa fa-map-o" aria-hidden="true"></i>
          </span>
          Map
        </a>
        <a href="#" class="sidebar-link sidebar-link-with-icon">
          <span class="sidebar-icon">
            <i class="fa fa-commenting-o" aria-hidden="true"></i>
          </span>
          Messenger
        </a>
      </div>
    </div>
    <!-- Sidebar end -->

    <!-- Content wrapper start -->
    <div class="content-wrapper">
      <div
        class="w-full hidden-xs-and-down"
        style="
          background-image: url('https://www.bigwhite.com/sites/default/files/inline-images/BigWhite-Winter-2122_1920x700px.jpg');
          min-height: 300px;
          margin-bottom: -50px;
          z-index: -1;
          position: relative;
          background-position-y: 60%;
          background-size: cover;
        "
      ></div>
      <div class="container bg-light-lm bg-very-dark-dm shadow-lg">
        <div
          class="bg-primary pl-20 d-flex align-middle text-white"
          style="line-height: 50px"
        >
          <span class="text-truncate hidden-sm-and-down"
            >Fast track your shopping by creating an account and
            <a
              href="#"
              class="hyperlink-underline text-white"
              @click="showSignInModal"
              >signing in</a
            >.
          </span>
          <div class="ml-auto page-header-buttons">
            <div class="dropdown toggle-on-hover">
              <div
                class="px-10"
                data-toggle="dropdown"
                id="..."
                aria-haspopup="true"
                aria-expanded="false"
              >
                I'm looking for
                <i class="fa fa-angle-down ml-5" aria-hidden="true"></i>
                <!-- ml-5 = margin-left: 0.5rem (5px) -->
              </div>
              <div
                class="dropdown-menu dropdown-menu-right"
                aria-labelledby="..."
                style="line-height: 30px"
              >
                <a href="#" class="dropdown-item">Lift Tickets</a>
                <a href="#" class="dropdown-item">Winter Rentals</a>
                <a href="#" class="dropdown-item">Season Passes</a>
                <a href="#" class="dropdown-item">Lessons</a>
              </div>
            </div>
            <button
              class="px-10"
              :class="{ disabled: user.isLoading.value }"
              v-if="!user.isAuthenticated.value"
              @click="showSignInModal"
              :disabled="user.isLoading.value"
            >
              <template v-if="user.isLoading.value">
                <span class="d-inline-block i-spin i-mdi-loading" />
              </template>
              <template v-else>Sign In</template>
            </button>
            <div class="dropdown toggle-on-hover" v-else>
              <div
                class="px-10"
                data-toggle="dropdown"
                id="..."
                aria-haspopup="true"
                aria-expanded="false"
                @click="signOutClicked"
              >
                Sign Out
              </div>
              <!-- <div
                class="dropdown-menu dropdown-menu-right"
                aria-labelledby="..."
                style="line-height: 30px"
              >
                <a href="#" @click="showSignInModal" class="dropdown-item"
                  >Sign in</a
                >
              </div> -->
            </div>
            <div class="dropdown">
              <div
                class="w-50 px-10 text-center position-relative"
                data-toggle="dropdown"
                id="..."
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i
                  class="fa fa-shopping-cart font-size-20"
                  aria-hidden="true"
                ></i>
                <div
                  class="
                    position-absolute
                    bg-danger
                    font-weight-bold
                    align-middle
                  "
                  style="
                    line-height: 1;
                    top: 5px;
                    right: 5px;
                    aspect-ratio: 1/1;
                    display: grid;
                    min-width: 16px;
                    border-radius: 20px;
                    place-items: center;
                  "
                >
                  3
                </div>
              </div>
              <div
                class="dropdown-menu dropdown-menu-right"
                aria-labelledby="..."
                style="line-height: 30px"
              >
                <a href="#" class="dropdown-item">TODO: Cart</a>
              </div>
            </div>
          </div>
        </div>
        <slot />
      </div>

      <!-- Navbar fixed bottom start -->
      <nav class="navbar navbar-fixed-bottom">
        <div class="container-fluid">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="fa fa-question-circle-o mr-5" aria-hidden="true"></i>
                Help
              </a>
            </li>
          </ul>
          <span class="navbar-text"> © Copyright 2023, Brand </span>
        </div>
      </nav>
      <!-- Navbar fixed bottom end -->
    </div>
    <!-- Content wrapper end -->

    <SignInModal ref="signInModal" />
  </div>
</template>
<script setup>
import { useUser } from '../composables/useUser';

const user = useUser();

const posCustomerId = computed(() =>
  user.userInfo?.value ? user.userInfo.value.pos_customer : ''
);

// Toasts a default alert
function toastAlert() {
  var alertContent =
    "This is a default alert with <a href='#' class='alert-link'>a link</a> being toasted.";
  // Built-in function
  halfmoon.initStickyAlert({
    content: alertContent,
    title: 'Toast!',
  });
}
</script>
