<template>
	<div>
		<form @submit.prevent="addTodo">
			<input
				type="text"
				v-model="title"
				name="title"
				placeholder="Add Todo..."
			/>
			<input class="btn" type="submit" value="Add" />
		</form>

		<div v-bind:key="todo.id" v-for="todo in todos">
			<TodoItem
				class="todo-item"
				v-bind:todo="todo"
				v-on:del-todo="deleteTodoItem"
			/>
		</div>
	</div>
</template>

<script>
import TodoItem from './TodoItem.vue';
// import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export default {
	name: 'todos',
	components: {
		TodoItem
	},
	data() {
		return {
            title: '',
            completed: false,
			todos: []
		};
	},
	methods: {
		deleteTodoItem(id) {
            // this.todos = this.todos.filter(todo => todo.id !== id);
            axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .then(() => this.todos = this.todos.filter(todo => todo.id !== id))
            .catch(error => console.log('Error', error));
		},
		addTodo() {
			axios
				.post('https://jsonplaceholder.typicode.com/todos', {
                    title: this.title,
					completed: this.completed
				})
				.then(
					res =>
						(this.todos = [...this.todos, res.data])
				)
				.catch(error => console.log('Error', error));

			// this.todos.push({ title: this.title, completed: false });
			this.title = '';
		}
	},
	created() {
		// const url = 'https://jsonplaceholder.typicode.com/todos';
		// let response = await axios.get(url);
		// let data = await response.data;
		// this.todos = data.filter(x => x.id > 195);
		axios
			.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
			.then(res => (this.todos = res.data))
			.catch(err => console.log('Error: ', err));
	}
};
</script>

<style scoped>
form {
	display: flex;
	margin: 1rem 0;
}
input[type='text'] {
	flex: 10;
	padding: 20px;
	border: 0;
	font-size: 1.3em;
	background-color: #323333;
	color: #e0edf4;
	font-size: 1rem;
}
input[type='submit'] {
	flex: 2;
	transition-duration: 0.4s;
	font-weight: 600;
	background-color: #323333;
	color: #e0edf4;
}
input[type='submit']:hover {
	background-color: #3eb3f6;
	cursor: pointer;
}

.todo-item {
	font-size: 1.3em;
	background-color: #e0edf4;
	border-left: 5px solid #3eb3f6;
	margin-bottom: 2px;
	color: #3e5252;
}
</style>
