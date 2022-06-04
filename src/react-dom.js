import { createFiberRoot } from "./ReactFiberRoot";


function render(element,container) {
    let fiberRoot = createFiberRoot(container);
    console.log(fiberRoot);
    
}

const ReactDOM = {
    render,
}

export default ReactDOM;
