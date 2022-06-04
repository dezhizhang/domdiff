import { createUpdate, enqueueUpdate } from "./ReactUpdateQueue";
import { scheduleUpdateOnFiber } from './ReactFiberWorkLoop';

export function updateContainer(element,container) {
    const current = container.current;
    const update = createUpdate();
    update.payload = {element};
    enqueueUpdate(current,update);
    scheduleUpdateOnFiber(current);
}

