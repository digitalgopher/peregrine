export const SlideFromTopAnimation = {
	keyframes: function () {
		return [
			{
				transform: 'translateY(-100%)',
				offset: 0
			},
			{
				transform: 'translateY(0)',
				offset: 1
			}
		]
	},

	initialStyles: {
		transform: 'translateY( -100% )',
		transformOrigin: '50%'
	}
}

export const SlideFromTopAndFadeInAnimation = {
	keyframes: function () {
		return [
			{
				transform: 'translateY(-100%)',
				opacity: 0,
				offset: 0
			},
			{
				opacity: 1,
				offset: .6
			},
			{
				transform: 'translateY(0)',
				opacity: 1,
				offset: 1
			}
		]
	},

	initialStyles: {
		transform: 'translateY(-100%)',
		opacity: 0,
		transformOrigin: '50%',
		zIndex: -1
	}
}


export const SlideFromSlightlyAbove = {
	keyframes: function () {
		return [
			{
				transform: 'translateY(-100px)',
				offset: 0
			},
			{
				transform: 'translateY(0)',
				offset: 1
			}
		]
	},
	initialStyles: {
		transform: 'translateY(-100px)',
		transformOrigin: '50%',
		zIndex: -1
	}
}