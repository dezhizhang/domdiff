import { REACT_ELEMENT_TYPE } from "./constants";
import { createFiberFromElement, createWorkInProgress } from "./ReactFiber";
import { Deletion, Placement } from "./ReactFiberFlags";

function childReconciler(shouldTrackSideEffects) {
  function deleteChild(returnFiber, childToDelete) {
    if (!shouldTrackSideEffects) {
      return;
    }

    const lastEffect = returnFiber.lastEffect;
    if (lastEffect) {
      lastEffect.nextEffect = childToDelete;
      returnFiber.lastEffect = childToDelete;
    }else {
        returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
    }
    childToDelete.nextEffect = null;
    childToDelete.flags = Deletion;
  }

  function deleteRemainingChildren(returnFiber,childToDelete) {
    while(childToDelete) {
        deleteChild(returnFiber,childToDelete)
        childToDelete = childToDelete.sibling;
    }
  }

  function useFiber(oldFiber,pendingProps) {
    return createWorkInProgress(oldFiber,pendingProps);
  }

  function reconcileSingleElement(returnFiber, currentFirstChild, element) {
    let key = element.key;
    let child = currentFirstChild;
    while (child) {
      if (child.key === key) {
          if(child.key === element.key) {
            deleteRemainingChildren(returnFiber,child.sibling);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const existing = useFiber(child,element.props);
            existing.return = returnFiber;
            return existing;
          }else {
              deleteRemainingChildren(returnFiber,child);
              break
          }
      } else {
        deleteChild(returnFiber, child);
      }
    }
    const created = createFiberFromElement(element);
    created.return = returnFiber;
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
