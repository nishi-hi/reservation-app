const Product = require('./model/product')

class SampleDb {
  constructor(){
    this.products = [
      {
        coverImage: './assets/img/placeholder.svg',
        name: 'Phone 100',
        price: 100,
        description: 'A large phone with one of the best screens',
        heading1: 'サンプルテキスト1',
        heading2: 'サンプルテキスト2',
        heading3: 'サンプルテキスト3',
        heading1Text: 'サンプルテキスト1',
        heading2Text: 'サンプルテキスト2',
        heading3Text: 'サンプルテキスト3'
      },
      {
        coverImage: './assets/img/placeholder.svg',
        name: 'Phone 200',
        price: 200,
        description: 'A great phone with one of the best cameras',
        heading1: 'サンプルテキスト1',
        heading2: 'サンプルテキスト2',
        heading3: 'サンプルテキスト3',
        heading1Text: 'サンプルテキスト1',
        heading2Text: 'サンプルテキスト2',
        heading3Text: 'サンプルテキスト3'
      },
      {
        coverImage: './assets/img/placeholder.svg',
        name: 'Phone 300',
        price: 300,
        description: '',
        heading1: 'サンプルテキスト1',
        heading2: 'サンプルテキスト2',
        heading3: 'サンプルテキスト3',
        heading1Text: 'サンプルテキスト1',
        heading2Text: 'サンプルテキスト2',
        heading3Text: 'サンプルテキスト3'
      },
      {
        coverImage: './assets/img/placeholder.svg',
        name: 'Phone 400',
        price: 400,
        description: '',
        heading1: 'サンプルテキスト1',
        heading2: 'サンプルテキスト2',
        heading3: 'サンプルテキスト3',
        heading1Text: 'サンプルテキスト1',
        heading2Text: 'サンプルテキスト2',
        heading3Text: 'サンプルテキスト3'
      }
    ]
  }

  async initDb() {
    await this.cleanDb()
    this.pushProductsToDb()
  }

  async cleanDb() {
    await Product.deleteMany({})
  }

  pushProductsToDb(){
    this.products.forEach((product) => {
      const newProduct = new Product(product)
      newProduct.save()
    })
  }

}

module.exports = SampleDb