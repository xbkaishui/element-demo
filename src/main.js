import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './routes'
import VueResource from 'vue-resource';



Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueResource);

Vue.http.options.emulateHTTP = true;

const router = new VueRouter({
    routes
})

var vue = new Vue({
    router: router,
    el: '#app',
    template: `<App/>`,
    components: {App}
});

console.log(vue);
