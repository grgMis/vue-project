import { createRouter, createWebHistory } from "vue-router"
import ActionEquip from "@/pages/ActionEquip"
import WellEquip from "@/pages/WellEquip"
import Well from "@/pages/Well"
import Action from "@/pages/Action"
import ActionOper from "@/pages/ActionOper"
import Main from "@/pages/Main"
import Auth from "@/pages/Auth"

const routes = [
	{
		path: '/',
		component: Auth
	},
	{
		path: '/main',
		component: Main
	},
	{
		path: '/actionEquip',
		component: ActionEquip
	},
	{
		path: '/wellEquip',
		component: WellEquip
	},
	{
		path: '/well',
		component: Well
	},
	{
		path: '/action',
		component: Action
	},
	{
		path: '/actionOper',
		component: ActionOper
	}
]

const router = createRouter({
	routes,
	history: createWebHistory(process.env.BASE_URL)
})

export default router;