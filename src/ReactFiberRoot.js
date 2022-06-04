
import { createHostRootFiber } from './ReactFiber';
import { initializeUpdateQueue } from './ReactUpdateQueue';
export function createFiberRoot(containerInfo) {
    const fiberRoot = { containerInfo }
    // 创建fiber树的根节点
    const hostRootFiber = createHostRootFiber();
    fiberRoot.current = hostRootFiber;
    hostRootFiber.stateNode = fiberRoot;

    //初始化更新队列
    initializeUpdateQueue(hostRootFiber);
    return fiberRoot;

} 