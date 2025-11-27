using System;

namespace Program
{
    public abstract class Product
    {
        protected string name;
        protected double basePrice;

        public Product(string name, double basePrice)
        {
            this.name = name;
            this.basePrice = basePrice;
        }

        public abstract string GetProductName();
        public abstract void SetProductName(string name);
        public abstract double GetBasePrice();
        public abstract void SetBasePrice(double basePrice);

        public abstract double FinalPrice();

        public override string ToString()
        {
            return $"(name={this.name}, basePrice={this.basePrice}, finalPrice={this.FinalPrice()})";
        }
    }

    public class Food : Product
    {
        public Food(string name, double basePrice) : base(name, basePrice)
        { }

        public override string GetProductName()
        {
            return this.name;
        }

        public override void SetProductName(string name)
        {
            this.name = name;
        }

        public override double GetBasePrice()
        {
            return this.basePrice;
        }

        public override void SetBasePrice(double basePrice)
        {
            this.basePrice = basePrice;
        }

        public override double FinalPrice()
        {
            return this.basePrice + this.basePrice * 0.05;
        }
    }

    public class Electronics : Product
    {
        public Electronics(string name, double basePrice) : base(name, basePrice)
        { }

        public override string GetProductName()
        {
            return this.name;
        }

        public override void SetProductName(string name)
        {
            this.name = name;
        }

        public override double GetBasePrice()
        {
            return this.basePrice;
        }

        public override void SetBasePrice(double basePrice)
        {
            this.basePrice = basePrice;
        }

        public override double FinalPrice()
        {
            return this.basePrice + this.basePrice * 0.18;
        }
    }

    public record Person(int Id, string Name, bool HasPremium);

    public class ShoppingCart
    {
        private List<Product> products;
        private Person customer;

        public ShoppingCart(List<Product> products, Person customer)
        {
            this.products = products;
            this.customer = customer;
        }

        public List<Product> GetProducts()
        {
            return products;
        }

        public void SetProducts(List<Product> products)
        {
            this.products = products;
        }

        public void AddProduct(Product product)
        {
            products.Add(product);
        }

        public void RemoveProduct(string productName)
        {
            foreach (Product product in this.products)
            {
                if (product.GetProductName() == productName)
                {
                    products.Remove(product);
                    return;
                }
            }
            Console.WriteLine("Product not found");
        }

        public void CopyToAnotherCart(ShoppingCart anotherCart)
        {
            foreach (Product product in this.products)
            {
                anotherCart.AddProduct(product);
            }
        }

        public void MoveToAnotherCart(ShoppingCart anotherCart)
        {
            foreach (Product product in this.products)
            {
                anotherCart.AddProduct(product);
            }
            products = new List<Product>();
        }

        public double SumPrices()
        {
            double total = 0;
            for (int i = 0; i < this.products.Count; i++)
            {
                total += this.products[i].FinalPrice();
            }

            if (customer.HasPremium)
            {
                total *= 0.9;
            }

            return total;
        }
    }

    public class Program
    {
        public static void Main(string[] args)
        {
            ShoppingCart shoppingCart = new ShoppingCart(new List<Product>(), new Person(1, "John", true));
            shoppingCart.AddProduct(new Food("Apple", 100));
            shoppingCart.AddProduct(new Electronics("Laptop", 200));
            Console.WriteLine(string.Join(", ", shoppingCart.GetProducts()));
            shoppingCart.RemoveProduct("Apple");
            Console.WriteLine(string.Join(", ", shoppingCart.GetProducts()));
            Console.WriteLine("\n");
            Console.WriteLine(shoppingCart.SumPrices());

            ShoppingCart anotherShoppingCart = new ShoppingCart(new List<Product>(), new Person(1, "Alexander", false));
            shoppingCart.CopyToAnotherCart(anotherShoppingCart);
            Console.WriteLine(string.Join(", ", anotherShoppingCart.GetProducts()));
            Console.WriteLine(string.Join(", ", shoppingCart.GetProducts()));
            Console.WriteLine(anotherShoppingCart.SumPrices());
        }
    }
}
