class Todo {
  constructor(id, title, completed = false) {
    this.id = id;
    this.title = title;
    this.completed = completed;
  }
}

class TodoList {
  constructor() {
    this.todos = [];
  }

  addTodo(title) {
    const newTodo = new Todo(Date.now(), title);
    this.todos.push(newTodo);
    return newTodo;
  }

  toggleTodo(id) {
    const todo = this.todos.find((t) => t.id === Number(id));
    if (todo) todo.completed = !todo.completed;
  }

  deleteTodo(id) {
    this.todos = this.todos.filter((t) => t.id !== Number(id));
  }
}

class TodoValidator {
  static validate(title) {
    const sanitized = title.trim();
    if (sanitized.length === 0) {
      return {
        isValid: false,
        message: 'Input tidak boleh kosong atau hanya spasi!',
      };
    }
    if (sanitized.length < 3) {
      return {
        isValid: false,
        message: 'Task minimal harus terdiri dari 3 karakter.',
      };
    }
    return { isValid: true, sanitized };
  }
}

class TodoAPI {
  static async fetchInitialTodos() {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/todos?_limit=3'
    );

    if (!response.ok) {
      throw new Error(
        `Gagal mengambil data dari server (Status: ${response.status})`
      );
    }

    const data = await response.json();

    return data.map((item) => new Todo(item.id, item.title, item.completed));
  }
}

class TodoUI {
  constructor(todoListInstance) {
    this.model = todoListInstance;

    // DOM Elements
    this.form = document.getElementById('todo-form');
    this.input = document.getElementById('todo-input');
    this.submitBtn = document.getElementById('submit-btn');
    this.errorMsg = document.getElementById('error-message');
    this.listContainer = document.getElementById('todo-list');
    this.notification = document.getElementById('status-notification');

    this.init();
  }

  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    this.listContainer.addEventListener('click', (e) =>
      this.handleListClick(e)
    );

    document.addEventListener('DOMContentLoaded', () => this.loadInitialData());
  }

  setLoadingState(isLoading) {
    if (isLoading) {
      this.submitBtn.disabled = true;
      this.listContainer.innerHTML = `<li class="loading-state">Sedang memuat data dari API...</li>`;
    } else {
      this.submitBtn.disabled = false;
    }
  }

  async loadInitialData() {
    this.setLoadingState(true);
    try {
      const apiTodos = await TodoAPI.fetchInitialTodos();
      this.model.todos = apiTodos;
      this.renderFullList();
    } catch (error) {
      this.showNotification(
        `Koneksi API Gagal: ${error.message}. Mode lokal diaktifkan.`,
        'error'
      );
      this.renderFullList();
    } finally {
      this.setLoadingState(false);
    }
  }

  showNotification(message, type = 'error') {
    this.notification.textContent = message;
    this.notification.className = `notification-box ${type}`;

    setTimeout(() => (this.notification.className = 'hidden'), 5000);
  }

  renderFullList() {
    this.listContainer.innerHTML = '';

    if (this.model.todos.length === 0) {
      this.listContainer.innerHTML = `<li class="empty-state">Belum ada tugas hari ini. Santai sejenak!</li>`;
      return;
    }

    this.model.todos.forEach((todo) => {
      this.appendTodoElement(todo);
    });
  }

  appendTodoElement(todo) {
    const emptyState = this.listContainer.querySelector('.empty-state');
    if (emptyState) this.listContainer.innerHTML = '';

    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    li.setAttribute('data-id', todo.id);

    li.innerHTML = `
            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                <input type="checkbox" class="toggle-checkbox" ${todo.completed ? 'checked' : ''}>
                <span>${this.escapeHTML(todo.title)}</span>
            </label>
            <button class="delete-btn">Hapus</button>
        `;

    this.listContainer.appendChild(li);
  }

  handleSubmit(e) {
    e.preventDefault();

    const validation = TodoValidator.validate(this.input.value);

    if (!validation.isValid) {
      this.errorMsg.textContent = validation.message;
      this.errorMsg.classList.remove('hidden');
      this.input.style.borderColor = 'var(--danger)';
      return;
    }

    this.errorMsg.classList.add('hidden');
    this.input.style.borderColor = '#d1d5db';

    const newTodo = this.model.addTodo(validation.sanitized);
    this.appendTodoElement(newTodo);

    this.form.reset();
  }

  handleListClick(e) {
    const target = e.target;
    const todoItem = target.closest('.todo-item');
    if (!todoItem) return;

    const todoId = todoItem.getAttribute('data-id');

    if (target.classList.contains('toggle-checkbox')) {
      this.model.toggleTodo(todoId);
      todoItem.classList.toggle('completed');
    }

    if (target.classList.contains('delete-btn')) {
      this.model.deleteTodo(todoId);
      todoItem.remove();

      if (this.model.todos.length === 0) {
        this.renderFullList();
      }
    }
  }

  escapeHTML(str) {
    return str.replace(
      /[&<>'"]/g,
      (tag) =>
        ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          "'": '&#39;',
          '"': '&quot;',
        })[tag] || tag
    );
  }
}

const myTodoList = new TodoList();
const app = new TodoUI(myTodoList);
