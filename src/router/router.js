import { createRouter, createWebHistory } from "vue-router"
import ActionEquip from "@/pages/ActionEquip"
import Equip from "@/pages/Equip"
import Well from "@/pages/Well"
import Action from "@/pages/Action"
import ActionOper from "@/pages/ActionOper"
import Main from "@/pages/Main"

const routes = [
	{
		path: '/',
		component: Main
	},
	{
		path: '/actionEquip',
		component: ActionEquip
	},
	{
		path: '/equip',
		component: Equip
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