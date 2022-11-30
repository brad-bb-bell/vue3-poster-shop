Vue.createApp({
	data() {
		return {
			total: 0,
			products: [
				{ title: "Product 1", id: 1, price: 9.99 },
				{ title: "Product 2", id: 2, price: 9.99 },
				{ title: "Product 3", id: 3, price: 9.99 },
			],
			cart: [],
		};
	},
	methods: {
		addToCart(product) {
			this.total += product.price;
			const item = this.cart.find((item) => item.id === product.id);
			if (item) {
				item.qty++;
			} else {
				this.cart.push({
					id: product.id,
					title: product.title,
					price: product.price,
					qty: 1,
				});
			}
		},
		currency(price) {
			return "$".concat(price.toFixed(2));
		},
		inc(item) {
			item.qty++;
			this.total += item.price;
		},
		dec(item) {
			item.qty--;
			this.total -= item.price;
			if (item.qty <= 0) {
				const i = this.cart.indexOf(item);
				this.cart.splice(i, 1);
			}
		},
	},
}).mount("#app");
