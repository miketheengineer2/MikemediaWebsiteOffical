document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('bookingModal');
    const bookButtons = document.querySelectorAll('.book-btn');
    const closeModal = document.querySelector('.close-modal');
    const bookingForm = document.getElementById('bookingForm');
    const packageTypeInput = document.getElementById('packageType');
    const submitButton = document.querySelector('.submit-btn');

    function openModal(packageType) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        packageTypeInput.value = packageType;
    }

    function closeModalFunction() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        bookingForm.reset();
    }

    bookButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const packageType = button.getAttribute('data-package');
            openModal(packageType);
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunction);
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunction();
        }
    });

    if (bookingForm) {
        bookingForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            const formData = new FormData(bookingForm);

            try {
                const response = await fetch('php/booking-handler.php', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.status === 'success') {
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.textContent = 'Booking request sent successfully! Check your email for confirmation.';
                    bookingForm.insertBefore(successMessage, bookingForm.firstChild);
                    
                    setTimeout(() => {
                        closeModalFunction();
                        successMessage.remove();
                    }, 3000);
                } else {
                    throw new Error('Failed to send booking request');
                }
            } catch (error) {
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = 'There was an error sending your booking request. Please try again.';
                bookingForm.insertBefore(errorMessage, bookingForm.firstChild);
                
                setTimeout(() => {
                    errorMessage.remove();
                }, 5000);
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = 'Submit Booking';
            }
        });
    }
});