
import { HostRoot } from './ReactWorkTags';

export function createHostRootFiber() {
    return createFiber(HostRoot);
}

function createFiber(tag,pendingProps,key) {
    return new FiberNode(tag,pendingProps,key);
}

function FiberNode(tag,pendingProps,key) {
    this.tag = tag;
    this.key = key;
    this.pendingProps = pendingProps;
}