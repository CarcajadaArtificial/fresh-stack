import { useEffect } from "preact/hooks";

// Given a current element, direction, and list of elements with tabindex="0", finds the best candidate
function findCandidate(
  current: HTMLElement,
  direction: string,
  tabbedElements: HTMLElement[],
): HTMLElement | null {
  const currentRect = current.getBoundingClientRect();
  let closest: HTMLElement | null = null;
  let minDistance = Infinity;

  tabbedElements.forEach((el) => {
    if (el === current) return;
    const rect = el.getBoundingClientRect();
    let isCandidate = false;
    let distance = Infinity;

    switch (direction) {
      case "ArrowRight":
        if (rect.left > currentRect.right) {
          const yOverlap =
            !(rect.bottom < currentRect.top || rect.top > currentRect.bottom);
          if (yOverlap) {
            isCandidate = true;
            distance = rect.left - currentRect.right;
          }
        }
        break;
      case "ArrowLeft":
        if (rect.right < currentRect.left) {
          const yOverlap =
            !(rect.bottom < currentRect.top || rect.top > currentRect.bottom);
          if (yOverlap) {
            isCandidate = true;
            distance = currentRect.left - rect.right;
          }
        }
        break;
      case "ArrowDown":
        if (rect.top > currentRect.bottom) {
          const xOverlap =
            !(rect.right < currentRect.left || rect.left > currentRect.right);
          if (xOverlap) {
            isCandidate = true;
            distance = rect.top - currentRect.bottom;
          }
        }
        break;
      case "ArrowUp":
        if (rect.bottom < currentRect.top) {
          const xOverlap =
            !(rect.right < currentRect.left || rect.left > currentRect.right);
          if (xOverlap) {
            isCandidate = true;
            distance = currentRect.top - rect.bottom;
          }
        }
        break;
    }

    if (isCandidate && distance < minDistance) {
      minDistance = distance;
      closest = el;
    }
  });

  return closest;
}

// Handles keydown on an element with tabindex="0" to move focus in arrow-key direction
function handleKeyDown(this: HTMLElement, e: KeyboardEvent) {
  const direction = e.key;
  if (
    !["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(
      direction,
    )
  ) {
    return;
  }

  e.preventDefault();
  const tabbedElements = Array.from(
    document.querySelectorAll<HTMLElement>('[tabindex="0"]'),
  );
  const candidate = findCandidate(this, direction, tabbedElements);

  if (candidate) {
    this.removeEventListener("keydown", handleKeyDown);
    candidate.focus();
    console.log("Moved focus to:", candidate);
  } else {
    console.log('No element with tabindex="0" found for', direction);
  }
}

export default function () {
  useEffect(() => {
    document.addEventListener("focusin", (e: FocusEvent) => {
      const target = e.target;
      if (
        target instanceof HTMLElement &&
        target.getAttribute("tabindex") === "0"
      ) {
        target.addEventListener("keydown", handleKeyDown);
      }
    });

    document.addEventListener("focusout", (e: FocusEvent) => {
      const target = e.target;
      if (
        target instanceof HTMLElement &&
        target.getAttribute("tabindex") === "0"
      ) {
        target.removeEventListener("keydown", handleKeyDown);
      }
    });
  }, []);
  return null;
}
