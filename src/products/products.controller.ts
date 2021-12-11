import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService){}

    @Post()
    async addProduct(
            @Body('title') prodTitle: string, 
            @Body('description') prodDesc: string, 
            @Body('price') prodPrice: number,
        ){
        
        const generatedID =await this.productService.insertProduct(prodTitle, prodDesc, prodPrice);
        return { id: generatedID };
    }

    @Get()
    async getAllProducts(){
        const products = await this.productService.getProducts();
        return products;
    }

    @Get(':id')
    getProduct(@Param('id') prodID: string){
        return this.productService.getSingleProduct(prodID);
    }

    @Patch(':id')
    async updateProduct(@Param('id') prodID: string, @Body('title') prodTitle: string, @Body('description') prodDesc: string, @Body('price') prodPrice: number){
        await this.productService.updateProduct(prodID, prodTitle, prodDesc, prodPrice);
        return null;
    }

    @Delete(':id')
    async removeProduct(@Param('id') prodID: string){
        await this.productService.deleteproduct(prodID);
        return null;
    }

}
