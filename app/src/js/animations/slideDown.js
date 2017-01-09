export const SlideDownAnimation = {
	keyframes: function () {
		return [
			{ transform: 'transformY(0)', offset: 0 },
			{ transform: 'transformY(100px)', offset: 1 }
		]
	},

	initialStyles: {
		transformOrigin: '50%'
	}
};