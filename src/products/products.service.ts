import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./products.model";

@Injectable()
export class ProductsService {

    private products: Product[]=[];
    insertProduct(title: string, desc: string, price: number){
        const prodID=Math.random().toString();
        const newProduct = new Product(prodID, title, desc, price);
        this.products.push(newProduct);
        return prodID;
    }

    getProducts(){
        return [...this.products];
    }

    getSingleProduct(productID: string){
        const product = this.findProduct(productID)[0];
        return {...product};
    }

    updateProduct(productID: string, title: string, desc: string, price: number){
        const [product,index] = this.findProduct(productID);
        const updatedProduct = {...product};
        if(title)
        {
            updatedProduct.title = title;
        }

        if(desc)
        {
            updatedProduct.description = desc;
        }

        if(price)
        {
            updatedProduct.price = price;
        }
        this.products[index] = updatedProduct;

    }

    deleteproduct(prodID: string){
        const index = this.findProduct(prodID)[1];
        this.products.splice(index, 1);

    }

    private findProduct(productID: string): [Product, number]{
        const productIndex = this.products.findIndex((prod) => prod.id == productID);
        const product = this.products[productIndex];
        if(!product)
        {
            throw new NotFoundException('Could not find your product');
        }

        return [product, productIndex];
    }  

    

}