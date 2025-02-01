const formData = { email: '', message: '' };
const STORAGE_KEY = 'feedback-form-state';

const refs = { form: document.querySelector('.feedback-form') };

refs.form.addEventListener('input', e => {
    formData.email = e.currentTarget.elements.email.value.trim();
    formData.message = e.currentTarget.elements.message.value.trim();
    saveToLS(STORAGE_KEY, formData);
});

function initPage() {
    const savedData = loadFromLS(STORAGE_KEY);
    if (savedData) {
        refs.form.elements.email.value = savedData.email || '';
        refs.form.elements.message.value = savedData.message || '';
    }
}

initPage();

refs.form.addEventListener('submit', e => {
    e.preventDefault();
    if (!formData.email || !formData.message) {
        alert('Fill please all fields');
        return;
    }

    console.log(formData);
    localStorage.removeItem(STORAGE_KEY);
    formData.email = '';
    formData.message = '';
    refs.form.reset();
});

function saveToLS(key, value) {
    const jsonData = JSON.stringify(value);
    localStorage.setItem(key, jsonData);
}

function loadFromLS(key) {
    const body = localStorage.getItem(key);
    try {
        const data = JSON.parse(body);
        return data;
    } catch {
        return body;
    }
}
