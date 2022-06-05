
export function createElement(type) {
    return document.createElement(type)
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