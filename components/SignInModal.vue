<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';
import { useUser } from '../composables/useUser';
import { usePasswordless } from '../composables/usePasswordless';

const passwordless = usePasswordless();

const signInMethod = computed(() =>
  passwordless.value ? 'Email' : 'Password'
);

interface Props {}

interface LoginFormModel {
  username?: string;
}

const user = useUser();

// TODO: Implement real ID
const modalId = ref('sign-in-modal');
const loginMessage = ref<string | null>(null);
const formModel = ref<LoginFormModel>({});

function show() {
  halfmoon.toggleModal(modalId.value);

  // focus on the first input
  const modal = document.querySelector('#' + modalId.value);
  if (!modal) return;
  const input = modal.querySelector('input:not([disabled])');
  if (!input || typeof input.focus != 'function') return;
  input.focus();
}

async function onFormSubmit() {
  loginMessage.value = undefined;
  try {
    await user.loginWithPopup(formModel.value.username);
    halfmoon.toggleModal(modalId.value);
  } catch (e) {
    loginMessage.value = 'Failed to login - ' + e;
  }
}

defineExpose({
  show,
});
</script>

<template>
  <div class="modal" :id="modalId" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content p-0">
        <div class="p-20">
          <a href="#" class="btn close" role="button" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </a>
          <h5 class="modal-title pt-0 mt-0">
            Sign In Using {{ signInMethod }}
          </h5>
          <form
            @submit.stop.prevent="onFormSubmit"
            v-show="!user.isLoggingIn.value"
          >
            <div class="form-group">
              <label for="email-address" class="required">Email Address</label>
              <input
                type="text"
                id="email-address"
                class="form-control"
                placeholder=""
                required="required"
                v-model="formModel.username"
              />
            </div>
            <input
              class="btn btn-primary btn-block"
              type="submit"
              value="Continue"
            />
            <div v-if="loginMessage" class="text-center mt-5">
              {{ loginMessage }}
            </div>
          </form>
          <div v-if="user.isLoggingIn.value">TODO: Loading Indicator</div>
        </div>
        <div class="bg-light-lm bg-very-dark-dm text-center px-20 pt-5 pb-20">
          <h3 class="font-size-20">New to Ski Mountain?</h3>
          <input
            class="btn btn-block"
            type="submit"
            value="Create An Account"
          />
          <div class="text-center mt-20">
            <span> Been here before? </span>
            <a href="#modal-2" class="hyperlink">Find your account</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
