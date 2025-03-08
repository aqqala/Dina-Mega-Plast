document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('menu-icon');
    const nav = document.querySelector('.navbar');

    burger.addEventListener('click', () => {
        if (nav.style.display === 'flex') {
            nav.style.display = 'none';
            console.log('Nav set to none');
        } else {
            nav.style.display = 'flex';
            nav.style.position = 'absolute';
            nav.style.top = '60px';
            nav.style.left = '0';
            nav.style.right = '0';
            nav.style.height = 'auto';
            nav.style.flexDirection = 'column';
            nav.style.alignItems = 'center';
            
            nav.style.backgroundColor = 'white';
            nav.style.zIndex = '9999';

            nav.style.border = '2px solid #62965A';
            console.log('Nav set to flex with explicit styles');

            const links = nav.querySelectorAll('a.navbar-element');
            links.forEach(link => {
                link.style.margin = '1.5vh 0';
                link.style.fontSize = '3vw';
                link.style.color = 'black';
                link.style.textDecoration = 'none';
            });
        }
    });

    const notification = document.getElementById('notification');
    const form = document.getElementById('contact-form');   


    function showNotification(message, isError = false) {
        notification.textContent = message; 

        if (isError) {
            (notification.style.backgroundColor = "#ff4444") && (notification.textContent = "Ошибка при отправке сообщения. Пожалуйста, повторите попытку позже");
        } else {
            (notification.style.backgroundColor = "#62965A") && (notification.textContent = "Сообщение успешно отправлено!");;
        }
        notification.classList.add('show');
        notification.classList.remove('hidden')


        setTimeout(() => {
            notification.classList.add('hide');
            setTimeout(() => {
                notification.classList.remove('show', 'hide');
            }, 500);
        }, 3500);
    }


    const contactForm = document.querySelector('.form-container form');
  
    if (!contactForm) {
      console.error("Форма не найдена");
      return;
    }
  
    contactForm.addEventListener('submit', async function (event) {
      event.preventDefault();
  
      const name = document.getElementById('user-name').value.trim();
      const phone = document.getElementById('user-phone').value.trim();
  
      const botToken = "8037037940:AAFVbyCkYSVfBaT9O-9FRApc0pYBUvjoh4k";
      const chatId = '1431176995';
      
      const text = `📩 Новое сообщение с сайта:\n\n
                    👤 Name: ${name}\n
                    📞 Phone: ${phone || "No phone"}`;

      const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text: text })
        });
  
        if (response.ok) {
          showNotification('Сообщение успешно отправлено!');
          contactForm.reset();
        } else {
          showNotification('Ошибка при отправке сообщения. Пожалуйста, повторите попытку позже.', true);
        }
      } catch (error) {
        showNotification('Ошибка подключения. Пожалуйста, проверьте подключение к Интернету.', true);
      }
    });

});




