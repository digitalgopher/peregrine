export const ScaleDownAnimation = {
	keyframes: function () {
		return [
			{ transform: 'scale(1, 1)', offset: 0 },
			{ transform: 'scale(0, 0)', offset: 1 }
		]
	},

	initialStyles: {
		transform: 'scale( 1, 1)',
		transformOrigin: '50%'
	}
};