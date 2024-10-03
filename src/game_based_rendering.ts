type Rect = {
  width: number;
  height: number;
  top: number;
  left: number;
  color: string;
};

export function drawRectsToDomGameDev(
  container: HTMLElement,
  rects: Rect[],
): void {
  const rectElements: HTMLDivElement[] = rects.map((rect) => {
    const element = document.createElement("div");
    element.style.position = "absolute";
    element.style.width = `${rect.width}px`;
    element.style.height = `${rect.height}px`;
    element.style.top = `${rect.top}px`;
    element.style.left = `${rect.left}px`;
    element.style.backgroundColor = rect.color;
    return element;
  });

  container.innerHTML = "";
  rectElements.forEach((element) => container.appendChild(element));

  let isDragging = false;
  let draggedRectIndex: number | undefined = undefined;
  let draggedRect: Rect | undefined = undefined;
  let dragOffsetX = 0;
  let dragOffsetY = 0;

  container.onmousedown = (event: MouseEvent) => {
    const x = event.clientX;
    const y = event.clientY;

    // Find the intersecting Rect
    draggedRectIndex =
      rects.findIndex(
        (rect) =>
          x >= rect.left &&
          x <= rect.left + rect.width &&
          y >= rect.top &&
          y <= rect.top + rect.height,
      ) || undefined;
    draggedRect =
      draggedRectIndex !== undefined ? rects[draggedRectIndex] : undefined;

    if (draggedRect) {
      isDragging = true;
      dragOffsetX = x - draggedRect.left;
      dragOffsetY = y - draggedRect.top;
    }
  };

  container.onmousemove = (event: MouseEvent) => {
    if (isDragging && draggedRectIndex && draggedRect) {
      const x = event.clientX;
      const y = event.clientY;

      // Calculate the change delta
      const deltaX = x - draggedRect.left - dragOffsetX;
      const deltaY = y - draggedRect.top - dragOffsetY;

      // Update the Rect position
      draggedRect.left += deltaX;
      draggedRect.top += deltaY;
    }
  };

  container.onmouseup = () => {
    isDragging = false;
    draggedRectIndex = undefined;
  };

  function gameLoop() {
    if (draggedRectIndex && draggedRect) {
      const element = rectElements[draggedRectIndex];
      element.style.top = `${draggedRect.top}px`;
      element.style.left = `${draggedRect.left}px`;
    }

    requestAnimationFrame(gameLoop);
  }

  // Start the game loop
  requestAnimationFrame(gameLoop);
}

export function createGameDevRects(n: number): Rect[] {
  const rects: Rect[] = [];

  for (let i = 0; i < n; i++) {
    const width = getRandomNumber(50, 100);
    const height = getRandomNumber(50, 100);
    const top = getRandomNumber(0, window.innerHeight - height);
    const left = getRandomNumber(0, window.innerWidth - width);
    const color = getRandomColor();

    const rect: Rect = {
      width,
      height,
      top,
      left,
      color,
    };

    rects.push(rect);
  }

  return rects;
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor(): string {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
