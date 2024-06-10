<template>
  <div >
    <header>
      <nav>
        <ul class="navbar">
          <li><nuxt-link to="/">Home</nuxt-link></li>
          <li><nuxt-link to="/about">About</nuxt-link></li>

          <li v-if="!authenticated" class="loginBtn">
            <nuxt-link to="/login">Login</nuxt-link>
          </li>
          <li v-if="authenticated" class="loginBtn">
            <a @click.prevent="logout">Logout</a>
          </li>
        </ul>
      </nav>
    </header>
    <div class="mainContent">
      <slot />
    </div>
    <footer
      style="
        margin-top: auto;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
      "
    >
      <h1>Footer</h1>
    </footer>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia"; // import storeToRefs helper hook from pinia
import { useAuthStore } from "~/store/auth"; // import the auth store we just created

const router = useRouter();

const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const logout = () => {
  logUserOut();
  router.push("/login");
};
</script>
<style scoped>
header {
  padding: 20px;
  margin: auto;
}
.navbar {
  display: flex;
  gap: 25px;
  list-style: none;
  padding: 0;
  margin: 0;
  align-items: center;
}

.loginBtn {
  margin-left: auto; /* Pushes login/logout to the far right */
}

a {
  text-decoration: none;
  color: inherit;
}
a:hover{
    text-decoration: underline;
    font-weight: bold;
}
.mainContent{
    padding: 20px;
}
</style>
