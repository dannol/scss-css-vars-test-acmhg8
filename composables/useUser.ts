import { useAuth0 } from '@auth0/auth0-vue';
import type { User, IdToken, LogoutOptions } from '@auth0/auth0-vue';
import { computed } from 'vue';
import { usePasswordless } from '../composables/usePasswordless';
import { useOrganization } from '../composables/useOrganization';

const passwordless = usePasswordless();
const organization = useOrganization();
const connectionName = computed(() => {
  return passwordless.value ? 'email' : '';
});
const organizationName = computed(() => {
  return organization.value ? 'org_tnz2Ua7YnFwZutC8' : 'org_AWih7VF9x1aYXJc4';
});

let auth0 = ref<ReturnType<typeof useAuth0> | undefined | null>();
let isLoggingIn = ref(false);

export const useUser = () => {
  if (!auth0.value) {
    auth0.value = typeof window !== 'undefined' ? useAuth0() : null;
  }

  const isLoading = computed(() => {
    if (!auth0.value) return true;
    return auth0.value.isLoading || false;
  });

  // if (auth0.value) {
  //   setTimeout(() => {
  //     isLoading.effect.fn();
  //   }, 500);
  // }

  const isAuthenticated = computed(() =>
    auth0.value ? auth0.value.isAuthenticated || false : false
  );

  const userInfo = computed(() => (auth0.value ? auth0.value.user : null));

  async function loginWithPopup(
    userNameHint: string | undefined = undefined,
    useEmail: boolean = false
  ) {
    if (!auth0.value) return;
    try {
      isLoggingIn.value = true;

      const result = await auth0.value.loginWithRedirect({
        authorizationParams: {
          login_hint: userNameHint,
          connection: 'alterra-test-social', //connectionName.value || '', //'alterra-test-social', //connectionName.value || '',
          //organization: organizationName.value,
        },
      });
      // const result = await auth0.value.loginWithPopup({
      //   authorizationParams: {
      //     login_hint: userNameHint,
      //     connection: 'alterra-test-social', //connectionName.value || '',
      //     organization: organizationName.value,
      //     // audience: 'alterra-guest-api',
      //   },
      // });
      console.log('Login result', result);
    } finally {
      isLoggingIn.value = false;
    }
  }

  async function logout(options?: LogoutOptions) {
    if (!auth0.value) return;
    return auth0.value.logout(options);
  }

  return {
    auth0,
    isLoading,
    isLoggingIn,
    isAuthenticated,
    loginWithPopup,
    logout,
    userInfo,
  };
};
