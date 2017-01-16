export const SlideUpAnimation = {
	keyframes: function () {
		return [
			{ transform: 'translateY(0)', offset: 0 },
			{ transform: 'translateY(-100%)', offset: 1 }
		]
	},

	initialStyles: {
		transformOrigin: '50%'
	}
}

export const SlideUpAndFadeOutAnimation = {
	keyframes: function () {
		return [
			{ 
				transform: 'translateY(0)', 
				opacity: 1,
				offset: 0 
			},
			{ 
				transform: 'translateY(-100%)', 
				opacity: 0,
				offset: 1 
			}
		]
	},

	initialStyles: {
		opacity: 0,
		transformOrigin: '50%'
	}
}