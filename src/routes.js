import Converter from './components/Converter.vue'
import Home from './components/Home.vue'
import About from './components/About.vue'
export default [
    {
        path: '/',
        component: Home
    },
    {
        path: '/currency/:currName',
        component: Converter,
        props: true,
    },
    {
        path: '/currency/:fName/:fValue/to/:sName/:sValue/',
        component: Converter,
        props: true,
    },
    {
        path: '/About',
        component: About
    },
]