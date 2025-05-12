import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(@Inject('PRODUCTS_SERVICE') private client: ClientProxy) {}

  async create(createProductDto: any) {
    console.log(createProductDto, 'createProductDto');

    try {
      return lastValueFrom(
        this.client.send('create_products', createProductDto),
      );
    } catch (error) {}
  }

  findAll() {
    try {
      return lastValueFrom(this.client.send('list_products', {}));
    } catch (error) {}
  }

  findOne(id: any) {
    return lastValueFrom(this.client.send('list_products_id', id));
  }

  update(id: any, updateProductDto: UpdateProductDto) {
    try {
      return lastValueFrom(
        this.client.send('update_product', { id, ...updateProductDto }),
      );
    } catch (error) {}
  }

  remove(id: any) {
    return lastValueFrom(this.client.send('delete_product', id));
  }
}
