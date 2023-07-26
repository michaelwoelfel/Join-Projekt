const CATEGORY_TOKEN = 'AJC71697BN5LXRUJOR4Z45CDA2LKLEYJQ7ZWLVNX';
const CATEGORY_URL = 'https://remote-storage.developerakademie.org/item';

let currentCategory;
let currentColorOfCategory;
let allCategories = [];
                            
loadNewCategory();



// Checkes if the field "new category is selected"
function handleCategoryChange(liElement) {
    if (liElement.textContent === 'New category') {
        addNewCategory();
    }
}


//  opens a popup to give a name to a new category and fills in the new category
function addNewCategory() {
    const newCategoryDiv = document.createElement('div');
    newCategoryDiv.className = 'new-category-popup';
    newCategoryDiv.innerHTML = '<input class="task_input_field_styling_popup" type="text" max-length="15" id="new-category-input" placeholder="Enter new category"><button class="btn create-btnpopup" onclick="submitNewCategory()">Submit</button><img class="closeimgpopup2" onclick="closeCategoryPopup()" src="./assets/img/close.png">';
    document.body.appendChild(newCategoryDiv);
}


// Creates a new category and closes popup by click on the submit btn
function submitNewCategory() {
    const newCategory = document.getElementById('new-category-input').value;
    const newLi = document.getElementById('add_task_category_select');
    currentCategory = newCategory;
    setColorForNewCategory(newLi);
    newLi.innerHTML += /*html*/`
        <li class="liElement" onclick="closeDropdown(this)">${newCategory}<div style="background-color: ${currentColorOfCategory}" class="color_dot"></div></li>`;
    const popup = document.querySelector('.new-category-popup');
    document.body.removeChild(popup);
    saveNewCategory(newCategory, currentColorOfCategory);
}


function setColorForNewCategory() {
    let newColor = getRandomColorDot();
    currentColorOfCategory = newColor;
}


// Choses a random color for the new category
function getRandomColorDot() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


async function saveNewCategory(newCategory, currentColorOfCategory) {
    let categoriesAndColors = {
        'createdCategories': newCategory,
        'createdColors': currentColorOfCategory
    };

    allCategories.push(categoriesAndColors);
    await setItemCategory('createdCategories', newCategory);
    await setItemCategory('createdColors', currentColorOfCategory);
}

async function loadNewCategory(newCategory, currentColorOfCategory) {

    const createdCategoriesResponse = await getItemCategory('createdCategories');
    const createdColorsResponse = await getItemCategory('createdColors');
    if (createdCategoriesResponse && createdColorsResponse) {
        newCategory = createdCategoriesResponse.value;
        currentColorOfCategory = createdColorsResponse.value;
    }
}

function showCategories() {
    let categoryselection = document.getElementById('add_task_category_select');
    categoryselection.innerHTML = `<li onclick="handleCategoryChange(this)">New category</li>`;
    
    for (let i = 0; i < allCategories.length; i++) {
        const category = allCategories[i];
        const colorDot = allColors[i];
        categoryselection.innerHTML += /*html*/`
            <li class="liElement">${category} 
                <div style="background-color: ${colorDot}" class="color_dot"></div>
            </li>  
        `;
    }
}



async function setItemCategory(key, value) {
    const payload = { key, value, token: CATEGORY_TOKEN };
    return fetch(CATEGORY_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
}

async function getItemCategory(key) {
    const url = `${CATEGORY_URL}?key=${key}&token=${CATEGORY_TOKEN}`;
    return fetch(url).then(res => res.json());
}



function openDropdownMenu() {
    let dropdownMenu = document.getElementById('add_task_category_select');
    dropdownMenu.classList.toggle('d-block');

    let dropdown = document.getElementById('dropdown');
    dropdown.classList.toggle('border-radius');
}


function closeDropdown(liElement) {
    let dropdownMenu = document.getElementById('add_task_category_select');
    dropdownMenu.classList.remove('d-block');
    let dropdown = document.getElementById('dropdown');
    dropdown.classList.remove('border-radius');
    readNameOfCategoryInBoard(liElement);
    renderSelectedCategoryInCategoryfield(liElement);
}


function readNameOfCategoryInBoard(liElement) {
    if (liElement.textContent === 'New category') {
        addNewCategory();
    } else {
        let selectedCategory = liElement.textContent;
        currentCategory = selectedCategory;
    }
}


function renderSelectedCategoryInCategoryfield(liElement) {
    let selectedCategory = document.getElementById('dropdown');
    let selectedColor = liElement.querySelector('.color_dot').style.backgroundColor;
    selectedCategory.innerHTML = /*html*/`
        <li class="liElement">${currentCategory} 
            <div style="background-color: ${selectedColor}" class="color_dot"></div>
        </li> 
    `;
    currentColorOfCategory = selectedColor;
}

function closeCategoryPopup() {
    const popup = document.querySelector('.new-category-popup');
    document.body.removeChild(popup);
}