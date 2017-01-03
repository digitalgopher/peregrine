export const SlideDownAnimation = {
	keyframes: function () {
		return [
			{ transform: 'transformY(0)', offset: 0 },
			{ transform: 'transformY(100px)', offset: 1 }
		]
	},

	initialStyles: {
		// transform: 'scale(0, 0)',
		transformOrigin: '50%'
	}
};