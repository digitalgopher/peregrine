import React, { Component } from 'react';
import { Animation } from 'react-web-animation';


export default class Scrim extends Component {

    getKeyFrames(x, y) {
        return [
            { transform: 'scale(20)',   opacity: 0,   offset: 0 },
            { transform: 'scale(20)',   opacity: 1,   offset: 1 }
        ];
    }

    getTiming( duration ) {
        return {
            duration,
            easing: 'ease-in-out',
            delay: 0,
            iterations: 1,
            direction: 'normal',
            fill: 'forwards'
        };
    }

    render() {
        let style = {
            background: this.props.animate ? 'red' : 'dodgerblue'
        };


        let animatedScrim = null;
        if (this.props.animate) {
            let rect = document.documentElement.getBoundingClientRect();
            animatedScrim =  <Animation keyframes={this.getKeyFrames(rect.width, rect.height)}
                            timing={this.getTiming(2500)}>
                            <div> Hello </div>
                    </Animation>
        }

        let scrim = <div style={style} className="scrim">
                         { animatedScrim }
                    </div>


        return scrim;

        


    }
}