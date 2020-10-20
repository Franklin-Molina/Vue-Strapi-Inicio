import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Tags from '../views/Tags/Tag.vue';
import CreateTag from '../views/Tags/CreateTag.vue';
import EditTag from '../views/Tags/EditTag.vue';
import Index from '../views/Index.vue';


const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            auth: true
        }

    },
    {
        path: '/login',
        name: 'Login',
        component: Login


    },
    {
        path: '/tag',
        name: 'Tags',
        component: Tags,
        meta: {
            auth: true
        }



    },
    {
        path: '/tag/create',
        name: 'CreateTag',
        component: CreateTag,
        meta: {
            auth: true
        }






    },
    {
        //: los puintos son por que varian los id
        path: '/tags/:id/edit',
        name: 'EditTag',
        component: EditTag,
        meta: {
            auth: true
        }
    },
    {
        path: '/index',
        name: 'Index',
        component: Index


    },
]
const router = createRouter({
        history: createWebHistory(process.env.BASE_URL),
        routes
    })
    // Para 
router.beforeEach((to, from, next) => {
    //si en la ruta que estamos navengando tiene Auth
    if (to.matched.some((record) => record.meta.auth)) {
        console.log('Cambiando ruta')
            //Requiere Auth
        const token = localStorage.getItem('token')
        if (!token) {
            next('/login')
        }
    }
    next()
})

export default router