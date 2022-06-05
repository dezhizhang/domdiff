import { createInstance } from "./ReactDOMHostConfig";
import { HostComponent } from "./ReactWorkTags";



export function completeWork(current,workInProgress) {
    const newProps = workInProgress.pendingProps;
    switch(workInProgress.tag) {
        case HostComponent:
            const type = workInProgress.type;
            const instance = createInstance(type,props);
            break
            default:
                break
    }
}