<template>
    <v-parallax :src="Image">
        <v-card class="mx-auto my-12 pa-3" max-width="50%" elevation="8" prepend-icon="mdi-account-plus" shaped>

            <template v-slot:title>
                Register
            </template>

            <v-divider class="mx-4"></v-divider>
            <div class="d-flex justify-center mt-6">


                <v-sheet class="w-50">
                    <div v-if="error" class="alert alert-danger">{{error}}</div>
                    <form action="#" @submit.prevent="Register">

                        <v-text-field label="Name" id="name" :rules="usernameRules" type="text" name="name" required
                            v-model="name" class="mt-3"></v-text-field>

                        <v-divider class="mx-4"></v-divider>

                        <v-text-field label="Email" id="email" :rules="emailRules" type="email" name="email" required
                            v-model="email" class="mt-3"></v-text-field>

                        <v-divider class="mx-4"></v-divider>

                        <v-text-field prepend-icon="" :rules="passwordRules" label="Password" id="password"
                            type="password" name="password" required v-model="password" class="mt-3"></v-text-field>

                        <v-divider class="mx-4"></v-divider>

                        <v-text-field prepend-icon="" :rules="confirmPassRules" label="Confirm Password"
                            id="confirmPass" type="password" name="confirmPass" required v-model="confirmPass"
                            class="mt-3"></v-text-field>

                        <v-divider class="mx-4"></v-divider>
                        <v-text-field type="file" label="Profile Picture" required @change="onFileChanged($event)" accept="image/*">
                        </v-text-field>

                        <v-divider class="mx-4"></v-divider>
                        <v-card max-width="250" id="rounded-card">
                            <v-img :src="imgUrl"></v-img>
                        </v-card>


                        <v-divider class="mx-4"></v-divider>
                        <div class="d-flex justify-center w-100">
                            <v-btn type="submit" color="blue-grey">Register</v-btn>
                        </div>

                    </form>
                </v-sheet>

            </div>

        </v-card>
    </v-parallax>
</template>
  
  
<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import ImageSrc from '../assets/images/quiz.jpg'

export default {
    data: () => ({
        emailRules: [
            value => !!value || 'Required.',
            value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'Invalid e-mail.'
            },
        ],
        usernameRules: [
            value => !!value || 'Required.',
            value => (value || '').length <= 8 || 'Max 8 characters',
        ],
        passwordRules: [
            value => !!value || 'Required.',
            value => (value || '').length >= 6 || 'Min 6 characters',
        ],
        confirmPassRules: [
            (value) => !!value || 'type confirm password',
            (value) =>
                value === password.value || 'The password confirmation does not match.',
        ],
    }),
    methods: {

    },
    name: "RegisterComponent",
    setup() {
        const Image = ImageSrc;

        const name = ref('')
        const email = ref('')
        const password = ref('')
        const confirmPass = ref('')
        const error = ref(null)
        const store = useStore()
        const router = useRouter()
        const file = ref(File)
        const imgUrl = ref('https://images.getpng.net/uploads/preview/instagram-social-network-app-interface-icons-smartphone-frame-screen-template27-1151637511568djfdvfkdob.webp')

        function onFileChanged($event) {
            const target = $event.target
            if (target && target.files) {
                file.value = target.files[0];
                imgUrl.value = URL.createObjectURL(file.value)
            } else {
                imgUrl.value = 'https://images.getpng.net/uploads/preview/instagram-social-network-app-interface-icons-smartphone-frame-screen-template27-1151637511568djfdvfkdob.webp'
            }
        }

        const Register = async () => {
            try {
                if (password.value == confirmPass.value) {
                    await store.dispatch('register', {
                        email: email.value,
                        password: password.value,
                        name: name.value,
                        imageData: file.value,
                    })
                    router.push('/')
                } else {
                    error.value = "Your password does not match"
                }
            }
            catch (err) {
                error.value = err
            }
        }

        return { Image, Register, name, email, password, confirmPass, error, onFileChanged, imgUrl }
    }
};
</script>

<style>
#rounded-card {
    border-radius: 50%;
    min-height: 300px;
    min-width: 300px;
}
</style>