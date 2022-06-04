import { updateContainer } from "./ReactFiberReconcal";
import { createFiberRoot } from "./ReactFiberRoot";


function render(element,container) {
    let fiberRoot = createFiberRoot(container);
    updateContainer(element,fiberRoot);

}

const ReactDOM = {
    render,
}

export default ReactDOM;
