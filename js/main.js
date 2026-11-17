document.addEventListener('DOMContentLoaded', () => {
  const daysEl = document.getElementById('days');
  if (daysEl) {
    const eventDate = new Date('July 15, 2027 20:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = eventDate - now;

      if (diff <= 0) {
        clearInterval(timerInterval);
        document.getElementById('countdown').innerHTML = '<h2 style="color: #E63946;">L\'ESDEVENIMENT HA COMENÇAT!</h2>';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      daysEl.innerText = String(days).padStart(2, '0');
      document.getElementById('hours').innerText = String(hours).padStart(2, '0');
      document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
      document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
    };

    updateCountdown();
    const timerInterval = setInterval(updateCountdown, 1000);
  }

  const emailInput = document.getElementById('email');
  const emailStatus = document.getElementById('email-status');

  if (emailInput && emailStatus) {
    emailInput.addEventListener('input', () => {
      const val = emailInput.value.trim();
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (val === '') {
        emailStatus.textContent = '';
        emailInput.style.borderColor = '';
      } else if (regex.test(val)) {
        emailStatus.textContent = '✓ Correu electrònic vàlid';
        emailStatus.style.color = '#35C579';
        emailInput.style.borderColor = '#35C579';
      } else {
        emailStatus.textContent = '✗ Format de correu no vàlid';
        emailStatus.style.color = '#E63946';
        emailInput.style.borderColor = '#E63946';
      }
    });
  }

  const zoneSelect = document.getElementById('zone');
  const ticketsInput = document.getElementById('tickets');
  const ticketForm = document.getElementById('ticket-form');

  if (zoneSelect && ticketsInput && ticketForm) {
    const formatPrice = (num) => num.toFixed(2).replace('.', ',');

    const calculateTotal = () => {
      const price = parseFloat(zoneSelect.value) || 0;
      let qty = parseInt(ticketsInput.value) || 0;

      if (qty > 4) {
        qty = 4;
        ticketsInput.value = 4;
      } else if (qty < 1 && ticketsInput.value !== '') {
        qty = 1;
        ticketsInput.value = 1;
      }

      const subtotal = price * qty;
      const fees = subtotal * 0.10;
      const total = subtotal + fees;

      document.getElementById('subtotal').innerText = formatPrice(subtotal);
      document.getElementById('fees').innerText = formatPrice(fees);
      document.getElementById('total-price').innerText = formatPrice(total);
    };

    zoneSelect.addEventListener('change', calculateTotal);
    ticketsInput.addEventListener('input', calculateTotal);

    ticketForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('fullname').value.trim();
      const zoneText = zoneSelect.options[zoneSelect.selectedIndex].text.split(' (')[0];
      const qty = ticketsInput.value;
      const total = document.getElementById('total-price').innerText;
      const code = 'VEL-' + Math.floor(100000 + Math.random() * 900000);

      const summaryEl = document.getElementById('summary-text');
      summaryEl.innerHTML = `
        Gràcies, <strong>${name}</strong>!<br><br>
        Has reservat <strong>${qty} entrada/es</strong> a la zona <strong>${zoneText}</strong>.<br>
        Import total: <span style="color: #FFD166; font-weight: bold;">${total} €</span><br><br>
        Codi de reserva: <strong style="color: #E63946; font-size: 1.1rem;">${code}</strong>
      `;

      const modal = document.getElementById('confirmation-msg');
      modal.classList.remove('hidden');
    });

    const closeBtn = document.getElementById('close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        document.getElementById('confirmation-msg').classList.add('hidden');
        ticketForm.reset();
        if (emailStatus && emailInput) {
          emailStatus.textContent = '';
          emailInput.style.borderColor = '';
        }
        calculateTotal();
      });
    }
  }

  const cards = document.querySelectorAll('.combat-card, .faq-card, .time-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(15px)';
    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 80 * index);
  });
});