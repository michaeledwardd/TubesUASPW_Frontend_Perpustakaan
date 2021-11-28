import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
function importComponent(path) {
    return () => import(`./components/${path}.vue`)
}
Vue.use(VueRouter);


const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: importComponent('DashboardLayout'),
            children: [
                //Dashboard
                {
                    path: '/',
                    name: 'Dashboard',
                    meta: {title : 'Dashboard'},
                    component: importComponent('Dashboard'),
                },
                //buku
                {
                    path: '/buku',
                    name: 'Buku',
                    meta: {title : 'Bukus'},
                    component: importComponent('DataMaster/Buku'),
                },
                //buku
                {
                    path: '/denda',
                    name: 'Denda',
                    meta: {title : 'Dendas'},
                    component: importComponent('DataMaster/Denda'),
                },
                //buku
                {
                    path: '/peminjaman',
                    name: 'Peminjaman',
                    meta: {title : 'Peminjamans'},
                    component: importComponent('DataMaster/Peminjaman'),
                },
                //buku
                {
                    path: '/pengembalian',
                    name: 'Pengembalian',
                    meta: {title : 'Pengembalians'},
                    component: importComponent('DataMaster/Pengembalian'),
                },
                //buku
                {
                    path: '/profile',
                    name: 'Profile',
                    meta: {title : 'Profiles'},
                    component: importComponent('DataMaster/Profile'),
                },
                //buku
                {
                    path: '/user',
                    name: 'User',
                    meta: {title : 'Profiles'},
                    component: importComponent('DataMaster/User'),
                },
            ],
        },

        //register
        {
            path: '/register',
            name: 'Register',
            meta: { title: 'Register' },
            component: importComponent('Register'),
        },
        //login
        {
            path: '/login',
            name: 'Login',
            meta: { title: 'Login' },
            component: importComponent('Login'),
        },
        {
            path: '*',
            redirect: '/'
        },
    ]
});

//Set Judul
router.beforeEach((to, from, next) => {
    if(to.name != "Login" && localStorage.getItem("token") == null && to.name!="Register"){
        next('login')
        document.to.meta.title = "Login"
        
    }
    document.title = to.meta.title;
    next();
});

export default router;
