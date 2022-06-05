import { updateContainer } from "./ReactFiberReconcal";
import { createFiberRoot } from "./ReactFiberRoot";


function render(element,container) {
    let fiberRoot = container._reactRootContainer;
    if(!fiberRoot) {
        fiberRoot = container._reactRootContainer = createFiberRoot(container);
    }
    
    updateContainer(element,fiberRoot);

}

const ReactDOM = {
    render,
}

export default ReactDOM;
