import { createAuth0 } from '@auth0/auth0-vue';

const connParams: any = {
  redirect_uri: window.location.origin,
};

export default defineNuxtPlugin((nuxtApp) => {
  // domain: 'logindev.aspenware.net',
  // clientId: 'UoHCscMvs3xpHLguNW7BjI64h4Qo0UBl',
  nuxtApp.vueApp.use(
    createAuth0({
      domain: 'logindev.aspenware.net',
      clientId: 'MUqRwvRZ9aoNO4h5H9kWJCgtbDUPPTlo',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    })
  );
});
