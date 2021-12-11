import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService){}

    @Post()
    addProduct(
            @Body('title') prodTitle: string, 
            @Body('description') prodDesc: string, 
            @Body('price') prodPrice: number,
        ): any{
        
        const generatedID = this.productService.insertProduct(prodTitle, prodDesc, prodPrice);
        return { id: generatedID };
    }

    @Get()
    getAllProducts(){
        return this.productService.getProducts();
    }

    @Get(':id')
    getProduct(@Param('id') prodID: string){
        return this.productService.getSingleProduct(prodID);
    }

    @Patch(':id')
    updateProduct(@Param('id') prodID: string, @Body('title') prodTitle: string, @Body('description') prodDesc: string, @Body('price') prodPrice: number){
        this.productService.updateProduct(prodID, prodTitle, prodDesc, prodPrice);
        return null;
    }

    @Delete(':id')
    removeProduct(@Param('id') prodID: string){
        this.productService.deleteproduct(prodID);
        return null;
    }

}
