<template>
    <div id="ECommerce">
        <div class="container">
            <br>
            <nav id="top-navigation" class="well well-sm flex flex-row align-center">
                <a href="#" @click.prevent="isShowingCart = false"><strong>E-commerce Inc.</strong></a>

                <div class="text-right pull-right cart-info">
                    <span class="stats">{{ cart.items.length }} <template v-if="cart.items.length == 1">item</template><template v-else>items</template> in cart, totalling {{ cartTotal | currency }}</span>
                    <button class="btn btn-primary" @click="isShowingCart = true">View Cart</button>
                </div>
            </nav>

            <div v-if="!isShowingCart" id="products" class="row list-group">
                <div v-for="product in products" class="item col-xs-4">
                    <div class="thumbnail">
                        <img class="group list-group-image" src="http://placehold.it/400x250/000/fff">
                        <div class="caption">
                            <h4 class="group inner list-group-item-heading">{{ product.name }}</h4>
                            <p class="group inner list-group-item-text">{{ product.description }}</p>
                            <br>

                            <div class="row flex flex-row align-center">
                                <div class="col-xs-4">
                                    <p class="lead">{{ product.price | currency }}</p>
                                </div>

                                <div class="col-xs-8 flex flex-row align-center justify-right">
                                    <div class="number-in-stock" :class="{ few: product.inStock < 10 && product.inStock > 0, none: product.inStock == 0 }">
                                        {{ product.inStock }} in stock
                                    </div>

                                    <button class="btn btn-success" @click="addProductToCart(product)" :disabled="product.inStock == 0">Add to cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else>
                <h1>Cart</h1>

                <table v-if="cart.items.length > 0" class="table table-striped">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="item in cart.items">
                            <td>{{ item.product.name }}</td>

                            <td>
                                {{ item.quantity }} &nbsp;
                                <button class="btn btn-success" @click="increaseQuantity(item)" :disabled="item.product.inStock == 0">+</button>
                                <button class="btn btn-danger" @click="decreaseQuantity(item)">-</button>
                            </td>

                            <td>{{ item.quantity * item.product.price | currency }}</td>
                        </tr>

                        <tr>
                            <td class="text-right" colspan="2">
                                <strong>Subtotal</strong>
                            </td>

                            <td>{{ cartTotal | currency }}</td>
                        </tr>

                        <tr>
                            <td class="text-right" colspan="2">
                                <strong>Taxes</strong>
                            </td>

                            <td>{{ taxAmount | currency }}</td>
                        </tr>

                        <tr>
                            <td class="text-right" colspan="2">
                                <strong>Grand total</strong>
                            </td>

                            <td>{{ cartTotal + taxAmount | currency }}</td>
                        </tr>

                        <tr>
                            <td colspan="2"></td>
                            <td><button class="btn btn-success" @click="checkout">Checkout</button></td>
                        </tr>
                    </tbody>
                </table>

                <p v-else>Your cart is currently empty.</p>
            </div>
        </div>
    </div>
    </template>
  
  <script>
  export default {
    name: 'ECommerce',
    data () {
      return {
        isShowingCart: false,
        cart: {
            items: []
        },
        products: [
            {
                id: 1,
                name: 'MacBook Pro (15 inch)',
                description: 'This laptop has a super crisp Retina display. Yes, we know that it\'s overpriced...',
                price: 2999,
                inStock: 50
            },
            {
                id: 2,
                name: 'Samsung Galaxy Note 7',
                description: 'Unlike the overpriced MacBook Pro, we\'re selling this one a bit cheap, as we heard it might explode...',
                price: 299,
                inStock: 755
            },
            {
                id: 3,
                name: 'HP Officejet 5740 e-All-in-One-printer',
                description: 'This one might not last for so long, but hey, printers never work anyways, right?',
                price: 149,
                inStock: 5
            },
            {
                id: 4,
                name: 'iPhone 7 cover',
                description: 'Having problems keeping a hold of that phone, huh? Ever considered not dropping it in the first place?',
                price: 49,
                inStock: 42
            },
            {
                id: 5,
                name: 'iPad Pro (9.7 inch)',
                description: 'We heard it\'s supposed to be pretty good. At least that\'s what people say.',
                price: 599,
                inStock: 0
            },
            {
                id: 6,
                name: 'OnePlus 3 cover',
                description: 'Does your phone spend most of its time on the ground? This cheap piece of plastic is the solution!',
                price: 19,
                inStock: 81
            }
        ]
    }
},
    methods: {
        addProductToCart: function(product) {
            var cartItem = this.getCartItem(product);
        
            if (cartItem != null) {
                cartItem.quantity++;
            } else {
                this.cart.items.push({
                    product: product,
                    quantity: 1
                });
            }
        
            product.inStock--;
        },
        getCartItem: function(product) {
            for (var i = 0; i < this.cart.items.length; i++) {
                if (this.cart.items[i].product.id === product.id) {
                    return this.cart.items[i];
                }
            }
        
            return null;
        },
        increaseQuantity: function(cartItem) {
            cartItem.product.inStock--;
            cartItem.quantity++;
        },
        decreaseQuantity: function(cartItem) {
            cartItem.quantity--;
            cartItem.product.inStock++;
        
            if (cartItem.quantity == 0) {
                this.removeItemFromCart(cartItem);
            }
        },
        removeItemFromCart: function(cartItem) {
            var index = this.cart.items.indexOf(cartItem);
        
            if (index !== -1) {
                this.cart.items.splice(index, 1);
            }
        },
        checkout: function() {
            if (confirm('Are you sure that you want to purchase these products?')) {
                this.cart.items.forEach(function(item) {
                    item.product.inStock += item.quantity;
                });
            
                this.cart.items = [];
            }
        }
    },
    computed: {
        cartTotal: function() {
            var total = 0;
        
            this.cart.items.forEach(function(item) {
                total += item.quantity * item.product.price;
            });
        
            return total;
        },
        taxAmount: function() {
            return ((this.cartTotal * 10) / 100);
        }
    },
    filters: {
        currency: function(value) {
            var formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0
            });
            
            return formatter.format(value);
        }
    }
}
</script>