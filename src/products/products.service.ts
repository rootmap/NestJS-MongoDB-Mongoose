import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { title } from "process";
import { Product } from "./products.model";

@Injectable()
export class ProductsService {

    private products: Product[]=[];

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>, ){ }

    async insertProduct(title: string, desc: string, price: number){
        const prodID=Math.random().toString();
        const newProduct = new this.productModel({title, description: desc, price});
        const result = await newProduct.save();
        console.log(result);
        return result.id as string;
    }

    async getProducts(){
        const products = await this.productModel.find().exec();
        //console.log(products)
        return products.map((prod)=> ({
            id:prod.id,
            title: prod.title,
            description: prod.description,
            price: prod.price,
        }));
    }

    async getSingleProduct(productID: string){
        const product = await this.findProduct(productID);
        return {
            id:product.id,
            title: product.title,
            description: product.description,
            price: product.price,
        };
    }

    async updateProduct(productID: string, title: string, desc: string, price: number){
        const updatedProduct = await this.findProduct(productID);
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
        
        updatedProduct.save();

    }

    async deleteproduct(prodID: string){
        try {
            await this.productModel.deleteOne({_id:prodID}).exec();
        } catch (error) {
            throw new NotFoundException('Could not find your desired product');
        }
    }

    private async findProduct(id: string): Promise<Product>{
        let prod;
        try {
            prod = await this.productModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Could not find the product');
        }

        if(!prod)
        {
            throw new NotFoundException('Could not find your product');
        }
        return prod;
        

    }  

    

}