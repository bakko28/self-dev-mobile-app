let db;
let request = indexedDB.open("myDatabase", 1);

request.onerror = function(event) {
    console.error("Ошибка при открытии базы данных:", event.target.errorCode);
};

request.onsuccess = function(event) {
    db = event.target.result;
    console.log("База данных открыта успешно");

    // addUser("bakko28", "example_pass"); Добавление
    // deleteUser("bakko28"); Удаление

    // Список всех пользователей
    getAllUsers(); 
};

request.onupgradeneeded = function(event) {
    let db = event.target.result;
    let objectStore = db.createObjectStore("users", { keyPath: "id", autoIncrement: true });
    objectStore.createIndex("username", "username", { unique: true });
    objectStore.createIndex("password", "password", { unique: false });
    console.log("Хранилище объектов создано");
};

function addUser(username, password) {
    if (!db) {
        console.error("База данных не инициализирована");
        return;
    }

    let transaction = db.transaction(["users"], "readwrite");
    let objectStore = transaction.objectStore("users");

    let request = objectStore.add({ username: username, password: password });

    request.onsuccess = function(event) {
        console.log("Пользователь добавлен");
    };

    request.onerror = function(event) {
        console.error("Ошибка при добавлении пользователя:", event.target.errorCode);
    };
}

function getAllUsers() {
    if (!db) {
        console.error("База данных не инициализирована");
        return;
    }

    let transaction = db.transaction(["users"], "readonly");
    let objectStore = transaction.objectStore("users");

    let request = objectStore.getAll();

    request.onsuccess = function(event) {
        console.log("Пользователи:", event.target.result);
    };

    request.onerror = function(event) {
        console.error("Ошибка при чтении данных:", event.target.errorCode);
    };
}

function deleteUser(username) {
    if (!db) {
        console.error("База данных не инициализирована");
        return;
    }

    let transaction = db.transaction(["users"], "readwrite");
    let objectStore = transaction.objectStore("users");

    // Ищем пользователя по имени
    let index = objectStore.index("username");
    let request = index.get(username);

    request.onsuccess = function(event) {
        let user = event.target.result;
        if (user) {
            // Удаляем пользователя по id
            let deleteRequest = objectStore.delete(user.id);

            deleteRequest.onsuccess = function(event) {
                console.log("Пользователь удалён");
            };

            deleteRequest.onerror = function(event) {
                console.error("Ошибка при удалении пользователя:", event.target.errorCode);
            };
        } else {
            console.log("Пользователь не найден");
        }
    };

    request.onerror = function(event) {
        console.error("Ошибка при поиске пользователя:", event.target.errorCode);
    };
}











let tg = window.Telegram.WebApp;
tg.ready();
tg.expand();


const user = tg.initDataUnsafe ? tg.initDataUnsafe.user : null;

if (!user) {
    console.warn('User is empty or undefined.');
    return;
} else {
    document.querySelector('.name-text').textContent = `${user.first_name}`;
}

let initData = tg.initData || '';

if (!initData) {
    console.warn('Init data is empty or undefined.');
    return;
}



document.addEventListener('DOMContentLoaded', function() {
    const addNewHabitBtn = document.querySelector('.add_new_habit');

    if (addNewHabitBtn) {
        addNewHabitBtn.addEventListener('click', addNewHabit);
    } else {
        console.warn('AddNewHabitBtn not found')
    }

    const habitBtns = document.querySelectorAll('.habit')

    if (habitBtns) {
        habitBtns.forEach(button => (
            button.addEventListener('click', openHabit)
        ))
    } else {
        console.warn('HabitsBtns not found')
    }

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

    const editBtn = document.querySelector('.edit-button');

    if(editBtn) {
        editBtn.addEventListener('click', () => {
            document.querySelector('.edit-mode').style.display = 'flex';
            document.querySelector('.habit-page-name').style.display = 'none';
            document.querySelector('.progres-bar p').style.display = 'none';

            const doneBtn = document.querySelector('.done-edit');
            if (doneBtn) {
                doneBtn.addEventListener('click', () => {
                    const doneNameValue = document.querySelector('.edit-name').value;
                    const doneCountValue = document.querySelector('.edit-count').value;
                    console.log(doneNameValue, doneCountValue); // Проверка значений
                    saveChanges(doneNameValue, doneCountValue);
                });
            } else {
                console.warn('Done Changes Btn not found');
            }
        });
    } else {
        console.warn('EditBtn not found')
    }

    function saveChanges(doneNameValue, doneCountValue) {
        document.querySelector('.edit-mode').style.display = 'none';
        document.querySelector('.habit-page-name').textContent = doneNameValue;
        document.querySelector('.progres-bar p').textContent = doneCountValue;
        document.querySelector('.habit-page-name').style.display = 'flex';
        document.querySelector('.progres-bar p').style.display = 'flex';
    }

    const deleteBtn = document.querySelector('.delete-button');


    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
            deleteHabit()
        });
    } else {
        console.warn('DeleteBtn not found')
    }

    function deleteHabit() {
        console.log('delete Habit');
        document.querySelector('.habit_page').style.display = 'none';
    }


    function renderHabit() {
        // Код для рендеринга привычки
    }


});