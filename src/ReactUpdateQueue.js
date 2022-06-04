
//更新初始化队表

export function initializeUpdateQueue(fiber) {
    const updateQueue = {
        shared:{
            pending:null,
        }
    }
    fiber.updateQueue = updateQueue;
}

export function createUpdate() {
    return {};
}

export function enqueueUpdate(fiber,update) {
    let updateQueue = fiber.updateQueue;
    let sharedQueue = updateQueue.shared;
    const pending = sharedQueue.pending;
    if(!pending) {
        update.next = update;
    }else {
        update.next = pending.next;
        pending.next = update;
    }
    sharedQueue.pending = update;

}