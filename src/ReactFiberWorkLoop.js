import { createWorkInProgress } from "./ReactFiber";
import { beginWork } from "./ReactFiberBeginWork";

//当前正在更新的根
let workInProgressRoot = null;
//当前正在更新fiber节点
let workInProgress = null;

export function scheduleUpdateOnFiber(fiber) {
    const fiberRoot = markUpdateLaneFromFiberToRoot(fiber);
    performSyncWorkOnRoot(fiberRoot);
}

function markUpdateLaneFromFiberToRoot(sourceFiber) {
    let node = sourceFiber;
    let parent = node.return;
    while(parent) {
        node = parent;
        parent = parent.parent;
    }
    return node.stateNode;
}

function performSyncWorkOnRoot(fiberRoot) {
    workInProgressRoot = fiberRoot;
    workInProgress = createWorkInProgress(workInProgressRoot.current)
    workLoopSync();
    commitRoot();
}

function commitRoot() {
    const finishedWork = workInProgressRoot.current.alternate;
    workInProgress.finishedWork = finishedWork;
    commitMutationEffects(workInProgressRoot);
}

function commitMutationEffects() {
    
}

function workLoopSync() {

    while(workInProgress) {
       performUnitOfWork(workInProgress);
    }
}

// 执行工作单元
function performUnitOfWork(unitOfWork) {
    const current = unitOfWork.alternate;
    let next = beginWork(current,unitOfWork);
    if(next) {
        workInProgress = next;
    }else {
        completeUnitOfWork(unitOfWork);
    }
}

function completeUnitOfWork(unitOfWork) {
    do {
        const current = unitOfWork.alternate;
        const returnFiber = unitOfWork.return;
        completeWork(current,unitOfWork);
    }while(unitOfWork)
}

function completeWork() {

}

