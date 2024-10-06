
document.addEventListener('DOMContentLoaded', function() {
    const addNewHabitBtn = document.querySelector('.add_new_habit');
    addNewHabitBtn.addEventListener('click', addNewHabit);

    const habitBtns = document.querySelectorAll('.habit')
    habitBtns.forEach(button => (
        button.addEventListener('click', openHabit)
    ))
});

function addNewHabit() {
    console.log('start');

    const formElement = document.querySelector('.add_new_habit_form');
    if (formElement) {
        console.log('Element found:', formElement);
        formElement.style.display = 'flex';
        console.log('Display set to flex');

        setTimeout(() => {
            document.addEventListener('click', handleClickOutsideForm);
        }, 0);
    } else {
        console.log('Element not found');
    }

    const habitName = document.querySelector('.add_new_habit_form form .habit-name').value;
    const habitCount = document.querySelector('.add_new_habit_form form .habit-count').value;

    document.querySelector('.add_new_habit_form form').addEventListener('submit', function(event) {
        event.preventDefault();

        let id = 467218;
        addHabitOnDB(habitName, habitCount, id);
        // renderHabit();

        console.log('Форма отправлена без перехода на новую страницу');
    });
}

function handleClickOutsideForm(event) {
    const formElement = document.querySelector('.add_new_habit_form');
    const displayValue = window.getComputedStyle(formElement).display;
    console.log('Display value:', displayValue);

    if (displayValue === 'flex') {
        let form = document.getElementById('habitForm');
        let isClickInside = form.contains(event.target);

        if (!isClickInside) {
            formElement.style.display = 'none';
            console.log('Clicked outside, form hidden');

            // Удаляем обработчик клика после закрытия формы
            document.removeEventListener('click', handleClickOutsideForm);
        }
    }
}

function handleClickOutsidePage(event) {
    const habitPage = document.querySelector('.habit_page');
    const displayValue = window.getComputedStyle(habitPage).display;
    console.log('Display value:', displayValue);

    if (displayValue === 'flex') {
        let page = document.getElementById('habitPage');
        let isClickInside = page.contains(event.target);

        if (!isClickInside) {
            habitPage.style.display = 'none';
            console.log('Clicked outside, page hidden');
            document.removeEventListener('click', handleClickOutsidePage);
        }
    }
}

function openHabit() {
    const habitPage = document.querySelector('.habit_page')
    if (habitPage) {
        console.log('Element found:', habitPage);
        habitPage.style.display = 'flex';
        console.log('Display set to flex');

        setTimeout(() => {
            document.addEventListener('click', handleClickOutsidePage);
        }, 0);
    } else {
        console.log('Element not found');
    }
}

function addHabitOnDB(habitName, habitCount, id) {
    console.log('Name:', habitName, 'Habit Count:', habitCount, 'ID:', id);
}

function renderHabit() {
    // Код для рендеринга привычки
}
