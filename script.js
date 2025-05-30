document.addEventListener('DOMContentLoaded', function() {
    // Инициализация меню
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navbar.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Инициализация данных
    renderTopics();
    renderRankings();

// Обработчики модальных окон
const authButtons = {
    login: document.querySelector('.login-btn'),
    register: document.querySelector('.register-btn')
};

const modals = {
    login: document.getElementById('loginModal'),
    register: document.getElementById('registerModal')
};

const overlay = document.getElementById('modalOverlay');

// Открытие модалок
authButtons.login.addEventListener('click', (e) => {
    e.preventDefault();
    modals.login.classList.add('active');
    overlay.style.display = 'block';
});

authButtons.register.addEventListener('click', (e) => {
    e.preventDefault();
    modals.register.classList.add('active');
    overlay.style.display = 'block';
});

// Закрытие модалок
function closeModals() {
    modals.login.classList.remove('active');
    modals.register.classList.remove('active');
    overlay.style.display = 'none';
}

document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', closeModals);
});

overlay.addEventListener('click', closeModals);

// Закрытие по ESC
document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') closeModals();
});

// Обработчики отправки форм
document.querySelector('#loginModal .auth-form').addEventListener('submit', function(e) {
    e.preventDefault();
    if(this.checkValidity()) {
        // Здесь код для реальной авторизации
        this.reset();
        closeModals();
        // Покажем уведомление об успешном входе
        showNotification('Вы успешно вошли в систему!');
    }
});

document.querySelector('#registerModal .auth-form').addEventListener('submit', function(e) {
    e.preventDefault();
    if(this.checkValidity()) {
        // Здесь код для реальной регистрации
        this.reset();
        closeModals();
        // Покажем уведомление об успешной регистрации
        showNotification('Регистрация прошла успешно!');
    }
});

// Функция для показа уведомлений
function showNotification(text) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = text;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 50);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

    // Плавный скролл для всех якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Закрываем меню на мобильных
                if (navbar.classList.contains('active')) {
                    navbar.classList.remove('active');
                    menuToggle.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }

                // Плавный скролл
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Обновляем URL без перезагрузки
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });

    // Закрытие меню при клике вне области
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target) && !menuToggle.contains(e.target)) {
            navbar.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });

    // Полифил для smooth scroll в Safari
    if (!('scrollBehavior' in document.documentElement.style)) {
        const smoothScroll = function(element) {
            const targetPosition = element.getBoundingClientRect().top;
            const startPosition = window.pageYOffset;
            const distance = targetPosition;
            const duration = 500;
            let startTime = null;

            const animation = function(currentTime) {
                if (!startTime) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            };

            const ease = function(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            };

            requestAnimationFrame(animation);
        };

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetElement = document.querySelector(this.hash);
                if (targetElement) smoothScroll(targetElement);
            });
        });
    }
});
// Закрытие меню при клике вне его области
document.addEventListener('click', (e) => {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (!navbar.contains(e.target) && !menuToggle.contains(e.target)) {
        navbar.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
});

// Данные для последних тем js
const topics = [
    {
        title: "Квалификация. Wimbledon 2025",
        author: "Андрей Сергеев",
        date: "21.05.2025",
        comments: 28,
    },
    {
        title: "Вопрос по правилам. Если мяч попал в птицу во время розыгрыша, очко будет переиграно или засчитается проигрыш?",
        author: "Мария Иванова",
        date: "14.05.2025",
        comments: 15,
    },
    {
        title: "Трёхмесячная дисквалификация Янника Синнера",
        author: "Максим Юрьев",
        date: "05.05.2025",
        comments: 25,
    }
];

// Рейтинг ATP (мужчины)
const atpRankings = [
    {position: 1, player: "Янник Синнер", points: 10380},
    {position: 2, player: "Карлос Алькарас", points: 8850},
    {position: 3, player: "Александр Зверев", points: 7285},
    {position: 4, player: "Тэйлор Фриц", points: 4625},
    {position: 5, player: "Джек Дрейпер", points: 4610},
    {position: 6, player: "Новак Джокович", points: 4080},
    {position: 7, player: "Каспер Рууд", points: 3905},
    {position: 8, player: "Лоренцо Музетти", points: 3860},
    {position: 9, player: "Алекс Де Минаур", points: 3635},
    {position: 10, player: "Хольгер Руне", points: 3440}
];

// Рейтинг WTA (женщины)
const wtaRankings = [
    {position: 1, player: "Арина Соболенко", points: 10683},
    {position: 2, player: "Коко Гауфф", points: 6863},
    {position: 3, player: "Джессика Пегула", points: 6243},
    {position: 4, player: "Ясмин Паолини", points: 5865},
    {position: 5, player: "Ига Швентек", points: 5838},
    {position: 6, player: "Мирра Андреева", points: 4986},
    {position: 7, player: "Мэдисон Киз", points: 4674},
    {position: 8, player: "Циньвэнь Чжэн", points: 4368},
    {position: 9, player: "Эмма Наварро", points: 3831},
    {position: 10, player: "Паула Бадоса", points: 3641}
];

// Рендеринг списка тем
function renderTopics() {
    const container = document.getElementById('topicList');
    let html = '';
    
    topics.forEach(topic => {
        html += `
            <div class="topic-card">
                <h3>${topic.title}</h3>
                <div class="topic-meta">
                    <span>Автор: ${topic.author}</span> | <span>${topic.date}</span>
                </div>
                <div class="topic-stats">
                    <span>💬 ${topic.comments}</span>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Рендеринг рейтингов
function renderRankings() {
    renderSingleRanking(atpRankings, 'atpRanking');
    renderSingleRanking(wtaRankings, 'wtaRanking');
}

function renderSingleRanking(data, elementId) {
    const tbody = document.getElementById(elementId);
    let html = '';
    
    data.forEach(player => {
        html += `
            <tr>
                <td>${player.position}</td>
                <td>${player.player}</td>
                <td>${player.points.toLocaleString()}</td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
}

// Обработчик формы создания темы
document.getElementById('topicForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = this.querySelector('input').value;
    const description = this.querySelector('textarea').value;
    
    if(title && description) {
        // Добавляем новую тему
        const newTopic = {
            title: title,
            author: "Новый пользователь",
            date: new Date().toLocaleDateString(),
            comments: 0,
            likes: 0
        };
        
        topics.unshift(newTopic);
        renderTopics();
        this.reset();
        
        // Прокрутка к новой теме
        setTimeout(() => {
            const newTopicElement = document.querySelector('.topic-card:first-child');
            if(newTopicElement) {
                newTopicElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 0);
    }
});

// Обновление времени в подвале
document.getElementById('lastUpdated').textContent = 
    `Последнее обновление: ${new Date().toLocaleString()}`;

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            target.scrollIntoView({behavior: 'smooth'});
        }
    });
});

// Инициализация при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
    renderTopics();
    renderRankings();
    
    // Добавляем обработчики для кнопок лайков
    document.addEventListener('click', function(e) {
        if(e.target.classList.contains('like-btn')) {
            const btn = e.target;
            const currentLikes = parseInt(btn.textContent.match(/\d+/)[0]);
            btn.textContent = `👍 ${currentLikes + 1}`;
            btn.classList.add('liked');
            setTimeout(() => btn.classList.remove('liked'), 200);
        }
    });
});

