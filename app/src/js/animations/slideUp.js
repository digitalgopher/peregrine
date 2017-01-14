export const SlideUpAnimation = {

}

export const SlideFromBottomAnimation = {
	keyframes: function () {
		return [
			{ transform: 'translateY(100%)', offset: 0 },
			{ transform: 'translateY(0', offset: 1 }
		]
	},

	initialStyles: {
		transform: 'translateY(100%)',
		transformOrigin: '50%'
	}
}