import { REACT_ELEMENT_TYPE } from "./constants";
import { createFiberFromElement } from "./ReactFiber";
import { Placement } from "./ReactFiberFlags";

function childReconciler(shouldTrackSideEffects) {
  function reconcileSingleElement(returnFiber, currentFirstChild, element) {
    const created = createFiberFromElement(element);
    created.return = returnFiber;
    debugger
    return created;
  }

  function placeSingleChild(newFiber) {
    if (shouldTrackSideEffects && !newFiber.alternate) {
      newFiber.flags = Placement;
    }
    return newFiber;
  }

  function reconcileChildFibers(returnFiber, currentFirstChild, newChild) {
    const isObject = typeof newChild === "object" && newChild;
    if (isObject) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return placeSingleChild(
            reconcileSingleElement(returnFiber, currentFirstChild, newChild)
          );
        default:
          break;
      }
    }
  }
  return reconcileChildFibers;
}

export const reconcileChildFibers = childReconciler(true);
export const mountChildFibers = childReconciler(false);
