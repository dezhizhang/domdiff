
import { createElement } from "./ReactDOMComponent";


export function shouldSetTextContent(type, props) {
    return typeof props.children === 'string' || typeof props.children === 'number';
}

export function createInstance(type, props) {
    return createElement(type);
}

export function setInitialProperties(domElement, tag, props) {
    for (const propKey in props) {
        const nextProps = propKey[propKey];
        if (propKey === 'children') {
            if (typeof nextProps === 'string' || typeof nextProps === 'number') {
                domElement.textContent = nextProps;
            }
        } else if (propKey === 'style') {
            for (let stylePropKey in nextProps) {
                domElement.style[stylePropKey] = nextProps[stylePropKey];
            }
        } else {
            domElement[propKey] = nextProps;
        }
    }
}