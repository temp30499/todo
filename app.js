document.addEventListener('DOMContentLoaded', function () {
    const addForm = document.querySelector('.add');
    const list = document.querySelector('.todos');
    const search = document.querySelector('.search input');

    // Function to generate HTML template for todo item
    const generateTemplate = (todo, status) => {
        const html = `
            <tr class="${status}">
                <td>${todo}</td>
                <td>${status}</td>
                <td>
                    <button class="btn btn-success btn-sm complete">Complete</button>
                    <button class="btn btn-danger btn-sm delete">Delete</button>
                </td>
            </tr>
        `;
        list.innerHTML += html;
    };

    // Function to filter todos
    const filterTodos = (term) => {
        Array.from(list.children)
            .forEach((todo) => {
                const text = todo.querySelector('td').textContent;
                if (text.toLowerCase().includes(term)) {
                    todo.style.display = 'table-row';
                } else {
                    todo.style.display = 'none';
                }
            });
    };

    // Event listener to add a new todo
    addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const todo = addForm.add.value.trim();
        if (todo.length) {
            generateTemplate(todo, 'not-completed');
            addForm.reset();
        }
    });

    // Event listener to change color
    document.getElementById('changeColor').addEventListener('click', () => {
        list.classList.toggle('alternate-color');
    });

    // Event listener to delete and complete todos
    list.addEventListener('click', e => {
        if (e.target.classList.contains('delete')) {
            e.target.parentElement.parentElement.remove();
        }
        if (e.target.classList.contains('complete')) {
            const todoRow = e.target.parentElement.parentElement;
            if (todoRow.classList.contains('not-completed')) {
                todoRow.classList.remove('not-completed');
                todoRow.classList.add('completed');
                e.target.textContent = 'Uncomplete';
                todoRow.querySelector('td:nth-child(2)').textContent = 'completed';
            } else if (todoRow.classList.contains('completed')) {
                todoRow.classList.remove('completed');
                todoRow.classList.add('not-completed');
                e.target.textContent = 'Complete';
                todoRow.querySelector('td:nth-child(2)').textContent = 'not-completed';
            }
        }
    });

    // Event listener for search functionality
    search.addEventListener('keyup', () => {
        const term = search.value.trim().toLowerCase();
        filterTodos(term);
    });

});
