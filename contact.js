document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('[data-testid="test-contact-form"]');
    if (!form) return;

    const successMessage = form.querySelector('[data-testid="test-contact-success"]');

    const fields = {
        name: {
            input: form.querySelector('[data-testid="test-contact-name"]'),
            error: form.querySelector('[data-testid="test-contact-error-name"]'),
            validator: (value) => value.trim().length > 0,
            message: 'Please enter your full name.'
        },
        email: {
            input: form.querySelector('[data-testid="test-contact-email"]'),
            error: form.querySelector('[data-testid="test-contact-error-email"]'),
            validator: (value) => /^\S+@\S+\.\S+$/.test(value),
            message: 'Please enter a valid email address (e.g., name@example.com).'
        },
        subject: {
            input: form.querySelector('[data-testid="test-contact-subject"]'),
            error: form.querySelector('[data-testid="test-contact-error-subject"]'),
            validator: (value) => value.trim().length > 0,
            message: 'Please add a short subject.'
        },
        message: {
            input: form.querySelector('[data-testid="test-contact-message"]'),
            error: form.querySelector('[data-testid="test-contact-error-message"]'),
            validator: (value) => value.trim().length >= 10,
            message: 'Message must be at least 10 characters long.'
        }
    };

    const setFieldState = (fieldConfig, isValid) => {
        const { input, error, message } = fieldConfig;
        if (isValid) {
            input.setAttribute('aria-invalid', 'false');
            error.textContent = '';
            error.classList.add('is-hidden');
        } else {
            input.setAttribute('aria-invalid', 'true');
            error.textContent = message;
            error.classList.remove('is-hidden');
        }
    };

    const validateField = (fieldKey) => {
        const config = fields[fieldKey];
        if (!config) return true;
        const value = config.input.value;
        const isValid = config.validator(value);
        setFieldState(config, isValid);
        return isValid;
    };

    Object.keys(fields).forEach((fieldKey) => {
        const { input } = fields[fieldKey];
        input.addEventListener('blur', () => validateField(fieldKey));
        input.addEventListener('input', () => {
            if (input.getAttribute('aria-invalid') === 'true') {
                validateField(fieldKey);
            }
        });
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        successMessage.classList.add('is-hidden');
        successMessage.textContent = '';
        successMessage.setAttribute('aria-hidden', 'true');

        const results = Object.keys(fields).map((key) => validateField(key));
        const isFormValid = results.every(Boolean);

        if (!isFormValid) {
            return;
        }

        const formData = new FormData(form);

        try {
            const response = await fetch('https://formspree.io/f/xzzjqjjg', {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            await response.json().catch(() => null);

            form.reset();
            Object.keys(fields).forEach((key) => fields[key].input.setAttribute('aria-invalid', 'false'));
            successMessage.textContent = 'Thanks for reaching out! I’ll reply shortly.';
            successMessage.classList.remove('is-hidden');
            successMessage.setAttribute('aria-hidden', 'false');
        } catch (error) {
            successMessage.textContent = 'Something went wrong while sending your message. Please try again later.';
            successMessage.classList.remove('is-hidden');
            successMessage.setAttribute('aria-hidden', 'false');
        }
    });
});