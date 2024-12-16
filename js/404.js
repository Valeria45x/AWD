document.addEventListener('DOMContentLoaded', () => {
    const errorTitle = document.querySelector('.error-title');
    const errorText = document.querySelector('.error-text');

    function makeInteractive(element) {
        const text = element.textContent;
        element.innerHTML = '';
        text.split('').forEach(char => {
            const span = document.createElement('span');
            span.textContent = char;
            span.classList.add('error-letter');
            element.appendChild(span);
        });

        element.addEventListener('mousemove', (e) => {
            const letters = element.querySelectorAll('.error-letter');
            letters.forEach(letter => {
                const rect = letter.getBoundingClientRect();
                const dx = e.clientX - (rect.left + rect.width / 2);
                const dy = e.clientY - (rect.top + rect.height / 2);
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    const scale = Math.max(0.5, 1 - distance / 200);
                    letter.style.transform = `scale(${scale}) translate(${dx * 0.1}px, ${dy * 0.1}px)`;
                    letter.style.color = 'var(--primary-color)';
                    letter.style.textShadow = '2px 2px 8px var(--secondary-color)';
                } else {
                    letter.style.transform = 'scale(1) translate(0, 0)';
                    letter.style.color = 'var(--text-color)';
                    letter.style.textShadow = 'none';
                }
                letter.style.transition = 'transform 0.2s ease, color 0.2s ease, text-shadow 0.2s ease';
            });
        });

        element.addEventListener('mouseleave', () => {
            const letters = element.querySelectorAll('.error-letter');
            letters.forEach(letter => {
                letter.style.transform = 'scale(1) translate(0, 0)';
                letter.style.color = 'var(--text-color)';
                letter.style.textShadow = 'none';
                letter.style.transition = 'transform 0.2s ease, color 0.2s ease, text-shadow 0.2s ease';
            });
        });
    }

    makeInteractive(errorTitle);
    makeInteractive(errorText);
});
