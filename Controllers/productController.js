import products from "../Models/productSchema.js";

//create / post method

export const createProduct = async (req, res) => {
  try {
    const newProduct = new products(req.body); // req.body and assigning in a single line
    await newProduct.save(); //saving the deatils in mongodb
    res
      .status(200)
      .json({ message: "Product added Successfully", data: newProduct });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// get all method

export const getAllProducts = async (req, res) => {
  try {
    const getProduct = await products.find();
    res
      .status(200)
      .json({ message: "Products retrieved successfully", data: getProduct });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//get by id method
export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await products.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res
      .status(200)
      .json({ message: "Product retrieved successfully", data: product });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// update method

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, price } = req.body;
    const result = await products.findByIdAndUpdate(
      { _id: productId },
      { name, price },
      {new:true},
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res.status(200).json({ message: "Product Updated", data: result });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//delete method

export const deleteProduct = async(req,res)=>{

    try {
        const productId = req.params.id;
        const result = await products.findByIdAndDelete({_id:productId}) 
        if(!result){
            return res.status(404).json({ message: "Product Not Found" });
        } 
        const product = await products.find();
        res.status(200).json({message:"Product deleted", data:product})
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
          });
    }
}

