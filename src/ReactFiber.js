
import { NoFlags } from './ReactFiberFlags';
import { HostRoot } from './ReactWorkTags';

export function createHostRootFiber() {
    return createFiber(HostRoot);
}

function createFiber(tag, pendingProps, key) {
    return new FiberNode(tag, pendingProps, key);
}

function FiberNode(tag, pendingProps, key) {
    this.tag = tag;
    this.key = key;
    this.pendingProps = pendingProps;
}

export function createWorkInProgress(current, pendingProps) {
    let workInProgress = current.alternate;
    if (!workInProgress) {

        workInProgress.type = current.type;
        workInProgress.stateNode = current.stateNode;
        workInProgress.alternate = current;
        current.alternate = workInProgress;
        workInProgress = createFiber(current.tag, pendingProps, current.key);
    }else {
        workInProgress.pendingProps = pendingProps;
    }

    workInProgress.flags = NoFlags;
    workInProgress.child = null;
    workInProgress.sibling = null;
    workInProgress.updateQueue = current.updateQueue;
    workInProgress.fistEffect = workInProgress.lastEffect = workInProgress.nextEffect = null;
    
}