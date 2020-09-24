<template>
  <div id="auth">
      <h2>Oh, hi there!</h2>
      <AuthForm />
  </div>
</template>

<script>
import AuthForm from '@/components/auth/AuthForm.vue'

export default {
    name: 'Auth',
    components: {
        AuthForm
    }
}
</script>

<style>
#auth {
    @apply w-full;
    @apply h-screen;
}

#auth {
    @apply flex;
    @apply flex-col;
    @apply justify-center;
    @apply items-center;
    @apply align-middle;
}

#auth h2 {
    @apply mb-4;
    @apply text-2xl;
}

#auth .card {
    @apply grid;
    @apply gap-4;
    @apply rounded-t-lg;
    @apply p-8;

    @apply shadow-lg;
    @apply rounded-lg;

    width: 400px;
    background-color: white;
    min-width: min-content;
}

#auth .content, #auth .footer {
    @apply py-2;
}

.form-group{
    @apply my-2;
}

input {
    @apply my-2;
}

input:not([type=checkbox]):not([type=submit]):not([type=radio]) {
    @apply h-12;
    @apply border-b-2;
}

.btn{
    @apply px-4;
    @apply py-2;
    @apply rounded-md;
    @apply transition-all;
    @apply duration-100;
}

.btn:hover{
    @apply bg-opacity-75;
}

.btn:active{
    @apply bg-opacity-50;
    @apply opacity-75;
}

.tab-wrapper {
    @apply flex;
    @apply justify-center;
}

.tab-wrapper .tab {
    @apply border-b-2;
    @apply px-8 py-2;
    @apply mx-4;
}

.tab-wrapper .tab.active {
    @apply bg-gray-200;
}
</style>