const { createApp, ref } = Vue;

createApp({
    setup() {
        const currentTab = ref('form');
        const applications = ref([]);
        const showSuccess = ref(false);
        
        const form = ref({
            firstName: '',
            lastName: '',
            dob: '',
            address: '',
            phone: '',
            gender: '',
            nationalId: ''
        });
        
        const clearForm = () => {
            form.value = {
                firstName: '',
                lastName: '',
                dob: '',
                address: '',
                phone: '',
                gender: '',
                nationalId: ''
            };
        };
        
        const submitForm = () => {
            if (!form.value.firstName || !form.value.lastName || !form.value.dob ||
                !form.value.address || !form.value.phone || !form.value.gender ||
                !form.value.nationalId) {
                alert('Please fill all fields');
                return;
            }
            
            applications.value.push({ ...form.value });
            clearForm();
            
            showSuccess.value = true;
            setTimeout(() => {
                showSuccess.value = false;
            }, 3000);
        };
        
        return {
            currentTab,
            applications,
            showSuccess,
            form,
            submitForm
        };
    }
}).mount('#app');
