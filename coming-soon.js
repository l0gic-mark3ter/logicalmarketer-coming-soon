const form = document.querySelector('#contact-form');
const button = form.querySelector('button');
const status = document.querySelector('#contact-status');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (button.disabled) return;
  button.disabled = true;
  status.hidden = false;
  status.textContent = 'Sending…';
  try {
    const response = await fetch(form.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)),
    });
    const result = await response.json();
    status.textContent = result.message;
    if (response.ok) form.reset();
  } catch {
    status.textContent = 'We couldn’t send your message. Please try again.';
  } finally {
    button.disabled = false;
  }
});

