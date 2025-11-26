from abc import ABC, abstractmethod
from dataclasses import dataclass

class Product(ABC):
    def __init__(self, name, base_price):
        self.name = name
        self.base_price = base_price

    @abstractmethod
    def final_price(self):
        pass

    def __repr__(self):
        return f"(name={self.name}, base_price={self.base_price}, final_price={self.final_price()})"

class Food(Product):
    def __init__(self, name, base_price):
        super().__init__(name, base_price)

    def final_price(self):
        return self.base_price + self.base_price * 0.05

class Electronics(Product):
    def __init__(self, name, base_price):
        super().__init__(name, base_price)

    def final_price(self):
        return self.base_price + self.base_price * 0.18

class ShoppingCart:
    def __init__(self, products=None, customer=None):
        self.__products = products if products is not None else []
        self.__customer = customer if customer is not None else ""

    def get_products(self):
        return self.__products

    def set_products(self, products):
        self.__products = products

    def get_customer(self):
        return self.__customer

    def set_customer(self, customer):
        self.__customer = customer

    def add_product(self, product):
        self.__products.append(product)

    def remove_product(self, product_name):
        for product in self.__products:
            if product.name == product_name:
                self.__products.remove(product)
                return
        print("Product not found")

    def copy_to_another_cart(self, another_cart):
        for product in self.__products:
            another_cart.add_product(product)

    def move_to_another_cart(self, another_cart):
        for product in self.__products:
            another_cart.add_product(product)
        self.__products = []

    def sum_prices(self):
        total = 0
        for product in self.__products:
            total += product.final_price()
        if self.__customer is not None and self.__customer.has_premium:
            total = total * 0.9
        return total
    

sc = ShoppingCart()
print(sc.get_products())
sc.add_product(Food("Apple", 100))
sc.add_product(Electronics("Laptop", 200))
print(sc.get_products())
sc.remove_product("Apple")
print(sc.get_products())
print("\n")

@dataclass
class Person:
    id: int
    name: str
    has_premium: bool

another_sc = ShoppingCart(customer=Person(1, "John", True))
sc.move_to_another_cart(another_sc)
print(another_sc.get_products())
print(sc.get_products())

another_sc.add_product(Food("Apple", 100))
print(another_sc.sum_prices())
print(another_sc.get_customer())