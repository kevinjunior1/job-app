new Vue({
  el: '#jobApp',
  data: {
    currentTab: 'applicant',        // 'applicant' or 'admin'
    applications: [],               // array of submitted applications
    showSuccessMsg: false,
    form: {
      firstname: '',
      surname: '',
      dob: '',
      address: '',
      phone: '',
      gender: '',      // will hold 'Male', 'Female', or 'Other'
      nationalId: ''
    }
  },
  mounted() {
    // load any previously saved data from localStorage for persistence across refresh
    const stored = localStorage.getItem('job_applications');
    if (stored) {
      try {
        this.applications = JSON.parse(stored);
      } catch(e) { 
        console.error('Failed to load stored applications', e);
      }
    }
  },
  watch: {
    // persist applications array to localStorage for persistence across refresh
    applications: {
      deep: true,
      handler(newApps) {
        localStorage.setItem('job_applications', JSON.stringify(newApps));
      }
    }
  },
  methods: {
    // clear form fields after submission
    clearForm() {
      this.form = {
        firstname: '',
        surname: '',
        dob: '',
        address: '',
        phone: '',
        gender: '',
        nationalId: ''
      };
    },
    
    // helper to format date for table (YYYY-MM-DD -> readable)
    formatDate(dateString) {
      if (!dateString) return '—';
      try {
        const parts = dateString.split('-');
        if (parts.length === 3) {
          return `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
        return dateString;
      } catch(e) {
        return dateString;
      }
    },
    
    // main submit handler
    submitApplication() {
      // validation: ensure all required fields are filled
      const { firstname, surname, dob, address, phone, gender, nationalId } = this.form;
      
      if (!firstname || !surname || !dob || !address || !phone || !gender || !nationalId) {
        alert('⚠️ Please fill in all required fields before submitting.');
        return;
      }
      
      // phone number minimal sanity (avoid empty spaces only)
      if (phone.trim() === '') {
        alert('Phone number cannot be empty.');
        return;
      }
      
      // create a clone of current form data to avoid reference mutation after clear
      const newApplication = {
        firstname: firstname.trim(),
        surname: surname.trim(),
        dob: dob,
        address: address.trim(),
        phone: phone.trim(),
        gender: gender,
        nationalId: nationalId.trim(),
        submittedAt: new Date().toISOString()
      };
      
      // add to applications array (push to show chronological order)
      this.applications.push(newApplication);
      
      // show success message
      this.showSuccessMsg = true;
      
      // clear the form inputs completely
      this.clearForm();
      
      // auto-hide success message after 3 seconds
      setTimeout(() => {
        this.showSuccessMsg = false;
      }, 3200);
    }
  }
});