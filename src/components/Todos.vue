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
import { v4 as uuidv4 } from 'uuid';

export default {
	name: 'todos',
	components: {
		TodoItem
	},
	data() {
		return {
			title: '',
			todos: [
				{
					id: 1,
					title: 'Practice Vue.js',
					completed: true
				},
				{
					id: 2,
					title: 'Establish Microsoft Sharepoint',
					completed: false
				}
			]
		};
	},
	methods: {
		deleteTodoItem(id) {
			this.todos = this.todos.filter(todo => todo.id !== id);
		},
		addTodo() {
			this.todos.push({ id: uuidv4(), title: this.title, completed: false });
			this.title = '';
		}
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
