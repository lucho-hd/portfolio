<script setup>
import { ref } from 'vue';

const { fields, errors, feedback, isValidEmail, handleSubmit } = useContact();

function useContact() {
    const fields = ref({
        email: '',
        name: '',
        subject: '',
        message: '',
    });

    const feedback = ref({
        type: 'success',
        message: '',
    });

    const errors = ref([]);

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

     async function handleSubmit() {
        feedback.value.message = '';
        errors.value = [];

        if (!fields.value.name) {
            errors.value.name = 'El nombre no puede quedar vacío';
        }

        if (!fields.value.email) {
                errors.value.email = 'El correo electrónico no puede quedar vacío';
            } else if (!isValidEmail(fields.value.email)) {
                errors.value.email = 'Por favor, ingresa un correo electrónico válido';
        }

        if (!fields.value.subject) {
            errors.value.subject = 'El asunto no puede quedar vacío';
        }

        if (!fields.value.message) {
            errors.value.message = 'El mensaje no puede quedar vacío';
        }

        if (Object.keys(errors.value).length > 0) {
            return false;
        }

        try {
            const response = await fetch('netlify/functions/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fields.value),
            });

            if (response.ok) {
                // Éxito en el envío
                feedback.value.message = 'Formulario enviado con éxito';
            } else {
                // Error en el envío
                feedback.value.type = 'error';
                feedback.value.message = 'Error al enviar el formulario';
            }
        } catch (error) {
            console.error('Error:', error);
            feedback.value.message = 'Hubo un error al enviar el formulario';
        }
    }

    return {
        fields,
        errors,
        feedback,
        handleSubmit,
    }
}
</script>

<template>
    <form action="/.netlify/functions/contact" method="post" @submit.prevent="handleSubmit" name="Contacto" data-netlify="true" data-netlify-honeypot="bot-field">
        <div class="hidden">
            <label>
               Don't fill this out if you're human: <input name="bot-field" />
            </label>
        </div>
        <div class="relative z-0 w-full mb-5 mt-5 group">
            <input 
                type="email" 
                name="email" 
                id="email"
                class="block py-2.5 px-0 w-full text-sm bg-transparent text-white border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" " 
                v-model="fields.email" />
            <label 
                for="email"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Email
            </label>
            <div class="mt-2 text-red-700">
                {{ errors.email }}
            </div>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-5 mt-5 group">
                <input 
                    type="text" 
                    name="name" 
                    id="name"
                    class="block py-2.5 px-0 w-full text-sm bg-transparent text-white border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" " 
                    v-model="fields.name" 
                />
                <label 
                    for="name"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Nombre
                </label>
                <div class="mt-2 text-red-700">
                    {{ errors.name }}
                </div>
            </div>
            <div class="relative z-0 w-full mb-5 mt-5 group">
                <input 
                    type="text" 
                    name="subject" id="subject"
                    class="block py-2.5 px-0 w-full text-sm bg-transparent text-white border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" " 
                    v-model="fields.subject" 
                />
                <label 
                    for="subject"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Asunto
                </label>
                <div class="mt-2 text-red-700">
                    {{ errors.subject }}
                </div>
            </div>
        </div>
        <div class="relative z-0 w-full mb-5 mt-5 group">
            <textarea 
                id="message" 
                rows="7"
                class="block py-2.5 px-0 w-full text-sm bg-transparent text-white border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" " v-model="fields.message"></textarea>
            <label 
                for="message"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Mensaje
            </label>
            <div class="mt-2 text-red-700">
                {{ errors.message }}
            </div>
        </div>
        <div class="grid mt-6">
            <button 
                type="submit"
                class="text-white bg-white/5 hover:bg-white/10 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Enviar
            </button>
        </div>
    </form>
</template>
