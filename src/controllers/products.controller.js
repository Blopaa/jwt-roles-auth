import Product from '../models/Product'

export const createProduct = async(req, res) => {
    const {name, category, price, imgUrl} = req.body
    console.log(req.body)
    const product = new Product({name, category, price, imgUrl})
    const productSaved = await product.save()
    res.status(201).json(productSaved)
}
export const getProducts = async(req, res) => {
    const products = await Product.find()
    res.json(products)
}
export const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.productId)
    res.json(product)
}
export const updateProductById = async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.productId, req.body, {
        new: true
    })

    res.json(product)
}
export const deleteProductById = async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.productId)
    res.json("deleted succesfully")
}