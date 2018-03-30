import Root from '../View/Root';
import Home from '../View/Home';
import Login from '../View/Login';
import Search from '../View/Search';
import Register from '../View/Register';
import Category from '../View/Category';
import CategoryList from '../View/CategoryList';
import Cart from '../View/Cart';
import Mine from '../View/Mine';
import SearchResult from '../View/SearchResult';

let router = {
    routes: [
        {
            path: '/index',
            component: Root,
            children: [
                {
                    path: '/index/home',
                    component: Home
                },
                {
                    path: '/index/search',
                    component: Search
                },
                {
                    path: '/index/category/:parameter',
                    component: Category
                },
                {
                    path: '/index/cart',
                    component: Cart,
                    authorization: true
                },
                {
                    path: '/index/mine',
                    component: Mine,
                    authorization: true
                },
                {
                    path: '/index/searchResult',
                    component: SearchResult
                }
            ]
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        }
    ]
}

export default router;