const Cart = require("../Models/Cart.model");

const AddtoCart = async (req, res) => {
  try {
    const body = req.body;

    const cartItem = new Cart(body);
    const newCartItem = await cartItem.save();
    res.status(201).json(newCartItem);
  } catch (error) {
    console.log("Error adding item to cart", error?.message);
    res.status(400).json(error);
  }
};

const fetchUserCart = async (req, res) => {
  try {
    const id = req.query.user;
    const cartItems = await Cart.find({ user: id });
    // if (!cartItems?.length) {
    //     return res.status(404).json({message : "No cartitem for user"})
    // }
    res.status(200).json(cartItems);
  } catch (error) {
    console.log("Error fetching user cart", error?.message);
    res.status(400).json(error);
  }
};

const updateCart = async (req , res)=>{
    try {
        const body = req.body
        const updatedCartItem = await Cart.findByIdAndUpdate(
            {_id : body.id},
            body
            ,{
                new : true
            }
        )
        if (!updatedCartItem) {
            return res.status(404).json({message : "Item not found"})
        }
        res.status(200).json(updatedCartItem)
    } catch (error) {
        console.log("Cart Updation Error :" , error?.message)
        res.status(500).json(error)
    }
}

const deleteUserCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Cart.deleteMany({user : id});
    res.status(200).json({ id });
  } catch (error) {
    console.log("User Cart item deletion error", error?.message);
    res.status(400).json(error);
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Cart.findByIdAndDelete(id);
    console.log(deletedItem);
    res.status(200).json({ id });
  } catch (error) {
    console.log("Cart item deletion error", error?.message);
    res.status(400).json(error);
  }
};

module.exports = {
  AddtoCart,
  fetchUserCart,
  deleteCartItem,
  deleteUserCartItem,
  updateCart
};
