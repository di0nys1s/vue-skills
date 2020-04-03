import Vue from 'vue';
import Router from 'vue-router';
import Skills from './components/Skills.vue';
import About from './components/About.vue';
import Todos from './components/Todos.vue';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'skills',
			component: Skills
		},
		{
			// path: '/about/:name',
			path: '/about',
			name: 'about',
			component: About
		},
		{
			path: '/todos',
			name: 'todo',
			component: Todos
		}
	]
});
