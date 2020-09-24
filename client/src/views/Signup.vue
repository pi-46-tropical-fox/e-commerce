<template>
    <section class="section">
        <div class="container form-container">
            <div class="box">
                <form @submit.prevent="signupForm">
                    <b-field
                        label="Email"
                        :type="{
                            'is-danger':
                                hasError.emailNotUnique.status ||
                                hasError.emailNotEmpty.status,
                        }"
                        :message="[
                            {
                                'Email already registered':
                                    hasError.emailNotUnique.status,
                                'Email cannot empty':
                                    hasError.emailNotEmpty.status,
                            },
                        ]"
                    >
                        <b-input
                            type="email"
                            v-model="email"
                            maxlength="30"
                        ></b-input>
                    </b-field>

                    <b-field
                        label="Password"
                        :type="{
                            'is-danger':
                                hasError.passwordMinLength.status ||
                                hasError.passwordNotEmpty.status,
                        }"
                        :message="[
                            {
                                'Password must have at least 6 characters':
                                    hasError.passwordMinLength.status,
                                'Password cannot empty':
                                    hasError.passwordNotEmpty.status,
                            },
                        ]"
                    >
                        <b-input
                            v-model="password"
                            type="password"
                            password-reveal
                        ></b-input>
                    </b-field>

                    <b-field class="mt-5">
                        <b-button
                            native-type="submit"
                            type="is-primary"
                            expanded
                            >Sign up</b-button
                        >
                    </b-field>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'Signup',

    title: 'Signup',

    data() {
        return {
            hasError: {
                emailNotEmpty: {
                    status: false,
                    message: '',
                },
                emailNotUnique: {
                    status: false,
                    message: '',
                },
                passwordMinLength: {
                    status: false,
                    message: '',
                },
                passwordNotEmpty: {
                    status: false,
                    message: '',
                },
            },
            email: '',
            password: '',
        };
    },

    methods: {
        ...mapActions({
            signup: 'auth/signup',
            checkAuthenticated: 'auth/checkAuthenticated',
        }),

        signupForm() {
            this.signup({
                email: this.email,
                password: this.password,
            })
                .then(({ data }) => {
                    this.email = '';
                    this.password = '';
                    localStorage.setItem('access_token', data.access_token);
                    this.checkAuthenticated();
                    this.$router.push('/');
                })
                .catch(err => {
                    err.response.data.errors.forEach(error => {
                        if (error.name === 'not_unique') {
                            this.hasError.emailNotUnique.status = true;
                            this.hasError.emailNotUnique.message =
                                error.message;
                        }
                        if (
                            error.name === 'notEmpty' &&
                            error.message.includes('Email')
                        ) {
                            this.hasError.emailNotEmpty.status = true;
                            this.hasError.emailNotEmpty.message = error.message;
                        }
                        if (
                            error.name === 'notEmpty' &&
                            error.message.includes('Password')
                        ) {
                            this.hasError.passwordNotEmpty.status = true;
                            this.hasError.passwordNotEmpty.message =
                                error.message;
                        }
                        if (error.name === 'minLength') {
                            this.hasError.passwordMinLength.status = true;
                            this.hasError.passwordMinLength.message =
                                error.message;
                        }
                    });
                });
        },
    },
};
</script>

<style lang="scss">
.form-container {
    max-width: 500px;
    display: flex;
    justify-content: center;
}
</style>
