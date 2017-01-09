export const SlideFromLeftAnimation = {
	keyframes: function () {
		return [
			{ transform: 'translateX(-100%)', offset: 0 },
			{ transform: 'translateX(0)', offset: 1 }
		]
	},

	initialStyles: {
		transform: 'translate(-100%, 0)',
		transformOrigin: '50%'
	}
};

export const SlideFromLeftAndFadeInAnimation = {
	keyframes: function () {
		return [
			{ transform: 'translateX(-100%)', opacity: 0, offset: 0 },
			{ transform: 'translateX(0)', opacity: 1, offset: 1 }
		]
	},

	initialStyles: {
		opacity: 1,
		transform: 'translate(-100%, 0)',
		transformOrigin: '50%'
	}
}