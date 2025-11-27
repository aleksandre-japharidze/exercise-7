var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Product = /** @class */ (function () {
    function Product(name, basePrice) {
        this.name = name;
        this.basePrice = basePrice;
    }
    Product.prototype.toString = function () {
        return "(name=".concat(this.name, ", basePrice=").concat(this.basePrice, ", finalPrice=").concat(this.finalPrice(), ")");
    };
    return Product;
}());
var Food = /** @class */ (function (_super) {
    __extends(Food, _super);
    function Food(name, basePrice) {
        return _super.call(this, name, basePrice) || this;
    }
    Food.prototype.getProductName = function () {
        return this.name;
    };
    Food.prototype.getBasePrice = function () {
        return this.basePrice;
    };
    Food.prototype.finalPrice = function () {
        return this.basePrice + this.basePrice * 0.05;
    };
    return Food;
}(Product));
var Electronic = /** @class */ (function (_super) {
    __extends(Electronic, _super);
    function Electronic(name, basePrice) {
        return _super.call(this, name, basePrice) || this;
    }
    Electronic.prototype.getProductName = function () {
        return this.name;
    };
    Electronic.prototype.getBasePrice = function () {
        return this.basePrice;
    };
    Electronic.prototype.finalPrice = function () {
        return this.basePrice + this.basePrice * 0.18;
    };
    return Electronic;
}(Product));
var ShoppingCart = /** @class */ (function () {
    function ShoppingCart(products) {
        this.products = products !== null && products !== void 0 ? products : [];
    }
    ShoppingCart.prototype.getProducts = function () {
        return this.products;
    };
    ShoppingCart.prototype.setProducts = function (products) {
        this.products = products;
    };
    ShoppingCart.prototype.addProduct = function (product) {
        this.products.push(product);
    };
    ShoppingCart.prototype.removeProduct = function (productName) {
        for (var i = 0; i < this.products.length; i++) {
            if (this.products[i].getProductName() === productName) {
                this.products.splice(i, 1);
                return;
            }
        }
    };
    ShoppingCart.prototype.copyToAnotherCart = function (anotherCart) {
        for (var i = 0; i < this.products.length; i++) {
            anotherCart.addProduct(this.products[i]);
        }
    };
    ShoppingCart.prototype.moveToAnotherCart = function (anotherCart) {
        for (var i = 0; i < this.products.length; i++) {
            anotherCart.addProduct(this.products[i]);
        }
        this.products = [];
    };
    ShoppingCart.prototype.sumPrices = function () {
        var total = 0;
        for (var i = 0; i < this.products.length; i++) {
            total += this.products[i].finalPrice();
        }
        return total;
    };
    return ShoppingCart;
}());
var sc = new ShoppingCart();
sc.addProduct(new Food("Apple", 100));
sc.addProduct(new Electronic("Laptop", 200));
console.log(sc.getProducts());
sc.removeProduct("Apple");
console.log(sc.getProducts());
console.log("\n");
var anotherCart = new ShoppingCart();
sc.moveToAnotherCart(anotherCart);
console.log(anotherCart.getProducts());
console.log(sc.getProducts());
