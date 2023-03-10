import { createRouter, createWebHistory } from "vue-router"
import ActionEquip from "@/pages/ActionEquip"
import WellEquip from "@/pages/WellEquip"
import Well from "@/pages/Well"
import Action from "@/pages/Action"
import ActionOper from "@/pages/ActionOper"
import MainAdmin from "@/pages/MainAdmin"
import MainOperator from "@/pages/MainOperator"
import Auth from "@/pages/Auth"

const routes = [
	{
		path: '/',
		component: Auth
	},
	{
		path: '/mainOperator',
		component: MainOperator
	},
	{
		path: '/mainAdmin',
		component: MainAdmin
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