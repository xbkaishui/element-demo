import Home from './components/Home.vue'
import Model from './components/model/Model.vue'
import Rule from './components/rule/Rule.vue'
import Vari from './components/vari/Vari.vue'


var routes = [
    {
        path: '/',
        component: Home,
        name: '',
        children: [
            {
                path: '/model',
                component: Model,
                name: 'MODEL',
                hidden: true
            }, {
                path: '/rule',
                component: Rule,
                name: '',
                hidden: true
            }
            , {
                path: '/vari',
                component: Vari,
                name: '',
                hidden: false
            }
        ]
    }
]


export default routes
