import { lazy } from "react";
import Layout from "../layout/Layout"



const dynamicImport = (param) => {
    return lazy(() =>
        import(`../pages/${param}.jsx`)
        );
}

export const routes = [
    {
        id: 1,
        path: '/',
        Element: dynamicImport("Home"),
    },
    {
        id: 2,
        path: '/product/:id',
        Element: dynamicImport("GamesDetails"),
    },
    {
        id: 3,
        path: '/results',
        Element: dynamicImport("Results"),
    },
    {
        id: 4,
        path: '/admin',
        Element: dynamicImport("Administrador"),
    },
    {
        id: 5,
        path: '/login',
        Element: dynamicImport("Login"),
    },
    {
        id: 6,
        path: '/welcome',
        Element: dynamicImport("Welcome"),
    },
    {
        id: 7,
        path: '/register',
        Element: dynamicImport('Register'),
    },
    {
        id: 8,
        path: '/resultscategories/:name',
        Element: dynamicImport('ResultsCategories'),
    },
    {
        id: 9,
        path: '/rent/:id',
        Element: dynamicImport('Rent'),
    },
    {
        id: 10,
        path: '/listUser',
        Element: dynamicImport('ListUser'),
    },
    {
        id: 11,
        path: '/profile',
        Element: dynamicImport('Profile'),
    },
    {
        id: 12,
        path: '/login/:id',
        Element: dynamicImport("Login"),
    },
];

export { Layout };