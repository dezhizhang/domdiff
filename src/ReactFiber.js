
import { NoFlags } from './ReactFiberFlags';
import { HostComponent, HostRoot } from './ReactWorkTags';

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
        workInProgress = createFiber(current.tag, pendingProps, current.key);
        workInProgress.type = current.type;
        workInProgress.stateNode = current.stateNode;
        workInProgress.alternate = current;
        current.alternate = workInProgress;
   
    }else {
        workInProgress.pendingProps = pendingProps;
    }
    
    workInProgress.flags = NoFlags;
    workInProgress.child = null;
    workInProgress.sibling = null;
    workInProgress.updateQueue = current.updateQueue;
    workInProgress.fistEffect = workInProgress.lastEffect = workInProgress.nextEffect = null;
    return workInProgress;

}

// 根据虚拟dom创建fiber节点
export function createFiberFromElement(element) {
    const { key,type,props} = element;
    let tag;
    if(typeof type === 'string') {
        tag = HostComponent;
    }
    const fiber = createFiber(tag,props,key);
    fiber.type = type;
    return fiber;
    
}