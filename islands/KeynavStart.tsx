import { useEffect } from "preact/hooks";

function findCandidate(
  current: HTMLElement,
  direction: string,
  tabbedElements: HTMLElement[],
  padding: number = 0,
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
          const paddedTop = currentRect.top - padding;
          const paddedBottom = currentRect.bottom + padding;
          const yOverlap =
            !(rect.bottom < paddedTop || rect.top > paddedBottom);
          if (yOverlap) {
            isCandidate = true;
            distance = rect.left - currentRect.right;
          }
        }
        break;
      case "ArrowLeft":
        if (rect.right < currentRect.left) {
          const paddedTop = currentRect.top - padding;
          const paddedBottom = currentRect.bottom + padding;
          const yOverlap =
            !(rect.bottom < paddedTop || rect.top > paddedBottom);
          if (yOverlap) {
            isCandidate = true;
            distance = currentRect.left - rect.right;
          }
        }
        break;
      case "ArrowDown":
        if (rect.top > currentRect.bottom) {
          const paddedLeft = currentRect.left - padding;
          const paddedRight = currentRect.right + padding;
          const xOverlap =
            !(rect.right < paddedLeft || rect.left > paddedRight);
          if (xOverlap) {
            isCandidate = true;
            distance = rect.top - currentRect.bottom;
          }
        }
        break;
      case "ArrowUp":
        if (rect.bottom < currentRect.top) {
          const paddedLeft = currentRect.left - padding;
          const paddedRight = currentRect.right + padding;
          const xOverlap =
            !(rect.right < paddedLeft || rect.left > paddedRight);
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

export default function ({
  padding = 0,
}: {
  padding?: number;
} = {}) {
  useEffect(() => {
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
      const candidate = findCandidate(this, direction, tabbedElements, padding);

      if (candidate) {
        this.removeEventListener("keydown", handleKeyDown);
        candidate.focus();
        console.log("Moved focus to:", candidate);
      } else {
        console.log('No element with tabindex="0" found for', direction);
      }
    }

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
  }, [padding]);

  return null;
}
