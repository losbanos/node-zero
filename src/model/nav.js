class Menu {
    menus = [];
    baseMenu = [
        {name: 'Shop1', href:'/', id: 'shop'},
        {name: 'Product List', href:'/product-list', id:'product-list'},
        {name: 'Login', id: 'login', href:'/login'}
    ]
    adminMenu = [
        {name: 'Add Product', href:'/admin/add-product', id:'add-product'},
        {name: 'Edit Product', href: '/admin/edit-product', id: 'edit-product'},
        {name: 'Product List(Admin)', href: '/admin/products', id: 'products'}
    ]
    userMenu = [
        {name: 'Cart', href:'/cart', id: 'cart'},
        {name: 'Checkout', href: '/checkout', id: 'checkout'}
    ]
    constructor(loginData) {
        const {userName, isLogined} = loginData;
        this.menus = this.baseMenu.concat([]);
        if (!isLogined) {
            return this.menus;
        }
        if (isLogined) {
            this.menus.concat(this.userMenu);
            if (userName === 'admin') {
                this.menus.splice(1, 0, {name: 'Admin-Menu', href: '/admin', id: 'admin'})
            }
        }
    }

    static getMenus() {
        console.log('this menus = [', this.menus);
        return this.menus;
    }

    addMenu(menuItem, index = 0) {
        if (index) {
            this.menus.splice(index, 0, menuItem);
        } else {
            this.menus.push(menuItem);
        }
    }
}
module.exports = Menu;