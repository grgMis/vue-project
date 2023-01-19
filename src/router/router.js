import { createRouter, createWebHistory } from "vue-router"
import ActionEquip from "@/pages/ActionEquip"
import Main from "@/pages/Main"

const routes = [
	{
		path: '/',
		component: Main
	},

	{
		path: '/actionEquip',
		component: ActionEquip
	}
]

const router = createRouter({
	routes,
	history: createWebHistory(process.env.BASE_URL)
})

export default router;