import classNames from 'classnames'
import React from 'react'

const Button = (props) => {
       return ( <button
            className={classNames('button', props.className)}
            onClick={props.onClik}
            type={props.type}
        >
            {props.children}
        </button>)
}

export default Button