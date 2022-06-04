import { HostComponent, HostRoot } from "./ReactWorkTags";
import { reconcileChildFibers,mountChildFibers  } from './ReactChildFiber';


export function beginWork(current, workInProgress) {
  switch (workInProgress.tag) {
    case HostRoot:
      return updateHostRoot(current, workInProgress);

    case HostComponent:
      return updateHostComponent(current, workInProgress);
    default:
      break;
  }
}


function updateHostRoot(current,workInProgress) {
    const updateQueue = workInProgress.updateQueue;
    const nextChildren = updateQueue.shared.pending.payload.element;
    reconcileChildren(current,workInProgress,nextChildren);
    return workInProgress.child;
}

export function reconcileChildren(current,workInProgress,nextChildren) {
    if(current) {
        workInProgress.child = reconcileChildFibers(
            workInProgress,
            current && current.child,
            nextChildren
        )
    }else {
        workInProgress.child = mountChildFibers(
            workInProgress,
            current && current.child,
            nextChildren
        )
    }
}



function updateHostComponent() {

}
