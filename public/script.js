// const { scrollMonitor } = require("scrollmonitor");

Vue.createApp({
	data() {
		return {
			total: 0,
			products: [],
			cart: [],
			search: "cat",
			lastSearch: "",
			loading: false,
			results: [],
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
		onSubmit() {
			this.results = [];
			this.products = [];
			this.loading = true;
			fetch(`/search?q=${this.search}`)
				.then((response) => response.json())
				.then((body) => {
					this.lastSearch = this.search;
					this.results = body;
					this.products = body.slice(0, 4);
					this.loading = false;
				});
		},
	},
	created() {
		this.onSubmit();
	},
}).mount("#app");

const sensor = document.querySelector("#product-list-bottom");
const watcher = scrollMonitor.create(sensor);
watcher.enterViewport(function () {
	console.log("sensor has entered the viewport");
});
