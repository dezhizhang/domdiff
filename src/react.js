import { REACT_ELEMENT_TYPE } from './constants';
let RESERVED_PROPS = {
    _owner: true,
    _store: true,
    _self: true,
    _source: true,
};

function createElement(type, config, children) {
    let props = {};
    let key = null;
    let ref = null;
    key = config.key;
    ref = config.ref;
    if (config) {
        for (let propName in config) {
            if (RESERVED_PROPS.hasOwnProperty(propName)) {
                props[propName] = config[propName];
            }
        }
    }
    const childrenLength = arguments.length - 2;
    if (childrenLength === 1) {
        props.children = children;
    } else if (childrenLength > 1) {
        const childArray = new Array(childrenLength);
        for (let i = 0; i < childrenLength; i++) {
            childArray[i] = arguments[i + 2];
        }
        props.children = childArray;
    }
    return {
        $$typof: REACT_ELEMENT_TYPE,
        type,
        ref,
        key,
        props
    }
}

const React = {
    createElement,
}

export default React;