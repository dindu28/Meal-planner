const mealForm = document.getElementById('meal-form');
const weekDiv = document.getElementById('week');

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let meals = [];
let editIndex = null;

//Initialize week grid
function initWeek() {
    weekDiv.innerHTML = '';
    days.forEach(day => {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.id = day;
        dayDiv.innerHTML = `<h3>${day}</h3>`;
        weekDiv.appendChild(dayDiv);
    });
}

// Load meals from LocalStorage
function loadMeals() {
    const savedMeals = localStorage.getItem('meals');
    if(savedMeals) meals = JSON.parse(savedMeals);
    renderMeals();
}

// Render meals into the calendar
function renderMeals() {
    initWeek();
    meals.forEach((meal, index) => {
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('meal-item');

        // Meal text
        const mealText = document.createElement('span');
        mealDiv.textContent = `${meal.type}: ${meal.name}`;
        mealDiv.appendChild(mealText);

        // Edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => startEditMeal(index));
        mealDiv.appendChild(editBtn);

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteMeal(index));
        mealDiv.appendChild(deleteBtn);

        document.getElementById(meal.day).appendChild(mealDiv);
    });
}

// Add or update meal
mealForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('meal-name').value;
    const type = document.getElementById('meal-type').value;
    const day = document.getElementById('meal-day').value;

    if (editIndex !== null) {
        meals[editIndex] = {name, type, day};
        editIndex = null;
    } else {
        meals.push({name, type, day});
    }

    localStorage.setItem('meals', JSON.stringify(meals));
    renderMeals();
    mealForm.reset();
});

// Editing a meal
function startEditMeal(index) {
    const meal = meals[index];
    document.getElementById('meal-name').value = meal.name;
    document.getElementById('meal-type').value = meal.type;
    document.getElementById('meal-day').value = meal.day;
    editIndex = index;
}

// Delete a meal
function deleteMeal(index) {
    meals.splice(index, 1);
    localStorage.setItem('meals', JSON.stringify(meals));
    renderMeals();
}

// Initialize
initWeek();
loadMeals();

const toggleBtn = document.getElementById('themeToggle');

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    toggleBtn.textContent = '☀️';
}

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');

    const isDark = document.body.classList.contains('dark');
    toggleBtn.textContent = isDark ? '☀️' : '🌙';

    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
