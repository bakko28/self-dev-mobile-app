const addNewHabbitBtn = document.querySelector('.add_new_habbit');
addNewHabbitBtn.addEventListener('click', addNewHabbit);

function closeForm() {
    // Код для закрытия формы
}

function addNewHabbit() {
    console.log('start');

    const formElement = document.querySelector('.add_new_habbit_form');
    if (formElement) {
        console.log('Element found:', formElement);
        formElement.style.display = 'flex';
        console.log('Display set to flex');

        // Добавляем обработчик клика только после отображения формы
        setTimeout(() => {
            document.addEventListener('click', handleClickOutside);
        }, 0); // 0 миллисекунд = следующий тик события
    } else {
        console.log('Element not found');
    }

    const habbitName = document.querySelector('.add_new_habbit_form form .habbit-name').value;
    const habbitCount = document.querySelector('.add_new_habbit_form form .habbit-count').value;

    document.querySelector('.done-habbit-btn').addEventListener('click', () => {
        addNewHabbit(habbitName, habbitCount, id);
        renderHabbit();
    });
}

function handleClickOutside(event) {
    const formElement = document.querySelector('.add_new_habbit_form');
    const displayValue = window.getComputedStyle(formElement).display;
    console.log('Display value:', displayValue);

    if (displayValue === 'flex') {
        let form = document.getElementById('habbitForm');
        let isClickInside = form.contains(event.target);

        if (!isClickInside) {
            formElement.style.display = 'none';
            console.log('Clicked outside, form hidden');

            // Удаляем обработчик клика после закрытия формы
            document.removeEventListener('click', handleClickOutside);
        }
    }
}

function renderHabbit() {
    // Код для рендеринга привычки
}
