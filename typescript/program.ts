abstract class Product {
    protected name: string;
    protected basePrice: number;

    constructor(name: string, basePrice: number) {
        this.name = name;
        this.basePrice = basePrice;
    }

    abstract getProductName(): string;
    abstract getBasePrice(): number;

    abstract finalPrice(): number;

    toString(): string {
        return `(name=${this.name}, basePrice=${this.basePrice}, finalPrice=${this.finalPrice()})`;
    }
}

class Food extends Product {
    constructor(name: string, basePrice: number) {
        super(name, basePrice);
    }

    getProductName(): string {
        return this.name;
    }

    getBasePrice(): number {
        return this.basePrice;
    }

    finalPrice(): number {
        return this.basePrice + this.basePrice * 0.05;
    }
}

class Electronic extends Product {
    constructor(name: string, basePrice: number) {
        super(name, basePrice);
    }

    getProductName(): string {
        return this.name;
    }

    getBasePrice(): number {
        return this.basePrice;
    }

    finalPrice(): number {
        return this.basePrice + this.basePrice * 0.18;
    }
}

class ShoppingCart {
    private products: Product[];

    constructor(products?: Product[]) {
        this.products = products ?? [];
    }

    getProducts(): Product[] {
        return this.products;
    }

    setProducts(products: Product[]) {
        this.products = products;
    }

    addProduct(product: Product) {
        this.products.push(product);
    }

    removeProduct(productName: string) {
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].getProductName() === productName) {
                this.products.splice(i, 1);
                return;
            }
        }
    }

    copyToAnotherCart(anotherCart: ShoppingCart) {
        for (let i = 0; i < this.products.length; i++) {
            anotherCart.addProduct(this.products[i]);
        }
    }

    moveToAnotherCart(anotherCart: ShoppingCart) {
        for (let i = 0; i < this.products.length; i++) {
            anotherCart.addProduct(this.products[i]);
        }
        this.products = [];
    }

    sumPrices(): number {
        let total = 0;
        for (let i = 0; i < this.products.length; i++) {
            total += this.products[i].finalPrice();
        }

        return total;
    }
}
const sc = new ShoppingCart();
sc.addProduct(new Food("Apple", 100));
sc.addProduct(new Electronic("Laptop", 200));
console.log(sc.getProducts());
sc.removeProduct("Apple");
console.log(sc.getProducts());
console.log("\n");

const anotherCart = new ShoppingCart();
sc.moveToAnotherCart(anotherCart);
console.log(anotherCart.getProducts());
console.log(sc.getProducts());