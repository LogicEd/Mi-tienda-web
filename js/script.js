// Array para almacenar productos (se carga desde localStorage)
let products = JSON.parse(localStorage.getItem('products')) || [];

// Elementos del DOM
const form = document.getElementById('productForm');
const productTableBody = document.querySelector('#productTable tbody');
const idInput = document.getElementById('id');
const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const descriptionInput = document.getElementById('description');
const cancelEditButton = document.getElementById('cancelEdit');

// Variable para rastrear si estamos editando
let editingId = null;

// Función para renderizar la tabla
function renderTable() {
    productTableBody.innerHTML = '';
    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.description}</td>
            <td>
                <button class="btn btn-warning btn-sm edit" data-index="${index}">Editar</button>
                <button class="btn btn-danger btn-sm delete" data-index="${index}">Eliminar</button>
            </td>
        `;
        productTableBody.appendChild(row);
    });

    // Agregar event listeners a los botones
    document.querySelectorAll('.edit').forEach(button => {
        button.addEventListener('click', editProduct);
    });
    document.querySelectorAll('.delete').forEach(button => {
        button.addEventListener('click', deleteProduct);
    });
}

// Función para agregar o actualizar un producto
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = nameInput.value;
    const price = priceInput.value;
    const description = descriptionInput.value;
    
    if (editingId !== null) {
        // Actualizar producto existente
        products[editingId].name = name;
        products[editingId].price = price;
        products[editingId].description = description;
        editingId = null;
    } else {
        // Agregar nuevo producto
        const newProduct = {
            id: Date.now(),  // ID único basado en tiempo
            name,
            price,
            description
        };
        products.push(newProduct);
    }
    
    localStorage.setItem('products', JSON.stringify(products));  // Guardar en localStorage
    renderTable();  // Actualizar tabla
    form.reset();  // Limpiar formulario
});

// Función para editar un producto
function editProduct(e) {
    const index = e.target.dataset.index;
    const product = products[index];
    idInput.value = product.id;
    nameInput.value = product.name;
    priceInput.value = product.price;
    descriptionInput.value = product.description;
    editingId = index;  // Marcar como edición
}

// Función para eliminar un producto
function deleteProduct(e) {
    const index = e.target.dataset.index;
    products.splice(index, 1);  // Eliminar del array
    localStorage.setItem('products', JSON.stringify(products));  // Actualizar localStorage
    renderTable();  // Actualizar tabla
}

// Función para cancelar edición
cancelEditButton.addEventListener('click', () => {
    form.reset();
    editingId = null;
});

// Inicializar la tabla al cargar la página
renderTable();