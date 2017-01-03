export const ScaleUpAnimation = {
	keyframes: function () {
		return [
			{ transform: 'scale(0, 0)', offset: 0 },
			{ transform: 'scale(1, 1)', offset: 1 }
		]
	},

	initialStyles: {
		transform: 'scale(0, 0)',
		transformOrigin: '50%'
	}
};