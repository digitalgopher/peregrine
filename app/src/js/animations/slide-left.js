export const SlideLeftAnimation = {
	keyframes: function () {
		return [
			{
				transform: 'translateX(0)',
				offset: 0
			},
			{
				transform: 'translateX(-100%)',
				offset: 1
			}
		]
	},

	initialStyles: {
		transform: 'translate(0, 0)',
		transformOrigin: '50%'
	}
};

export const SlideOffScreenLeft = {
	keyframes: function ( node ) {
		let { left, width } = node.getBoundingClientRect();
		return [
			{
				transform: 'translateX(0)',
				offset: 0
			},
			{
				transform: `translateX(-${ left + width }px )`,
				offset: 1
			}
		]
	},

	initialStyles: {
		transform: 'transateX(0, 0)',
		transformOrigin: '50%'
	}
}

export const SlideLeftAndFadeOutAnimation = {
	keyframes: function () {
		return [
			{
				transform: 'translateX(0)',
				opacity: 1,
				offset: 0
			},
			{
				transform: 'translateX(-100%)',
				opacity: 0,
				offset: 1
			}
		]
	},

	initialStyles: {
		opacity: 1,
		transform: 'translate(0, 0)',
		transformOrigin: '50%'
	}
};