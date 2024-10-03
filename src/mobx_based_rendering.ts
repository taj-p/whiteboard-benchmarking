import * as mobx from "mobx";

type Rect = {
  width: mobx.IObservableValue<number>;
  height: mobx.IObservableValue<number>;
  top: mobx.IObservableValue<number>;
  left: mobx.IObservableValue<number>;

  color: mobx.IObservableValue<string>;
};

export function drawRectsToDomMobx(container: HTMLElement, rects: Rect[]) {
  const rectsElements = rects.map((rect) => {
    const element = document.createElement("div");
    element.style.position = "absolute";

    mobx.autorun(() => {
      element.style.width = `${rect.width.get()}px`;
      element.style.height = `${rect.height.get()}px`;
      element.style.top = `${rect.top.get()}px`;
      element.style.left = `${rect.left.get()}px`;
      element.style.backgroundColor = rect.color.get();
    });

    // Event listeners for dragging
    let isDragging = false;
    let dragOffsetX = 0;
    let dragOffsetY = 0;

    element.addEventListener("mousedown", startDragging);

    function startDragging(event: MouseEvent) {
      isDragging = true;
      dragOffsetX = event.clientX - rect.left.get();
      dragOffsetY = event.clientY - rect.top.get();

      // Add event listeners to the document for dragging
      document.addEventListener("mousemove", drag);
      document.addEventListener("mouseup", stopDragging);
    }

    function drag(event: MouseEvent) {
      if (!isDragging) return;
      rect.left.set(event.clientX - dragOffsetX);
      rect.top.set(event.clientY - dragOffsetY);
    }

    function stopDragging() {
      isDragging = false;

      // Remove event listeners from the document
      document.removeEventListener("mousemove", drag);
      document.removeEventListener("mouseup", stopDragging);
    }

    return element;
  });

  container.innerHTML = "";
  rectsElements.forEach((element) => container.appendChild(element));
}

export function createMobxRects(n: number): Rect[] {
  const rects: Rect[] = [];

  for (let i = 0; i < n; i++) {
    const width = mobx.observable.box(getRandomNumber(50, 100));
    const height = mobx.observable.box(getRandomNumber(50, 100));
    const top = mobx.observable.box(
      getRandomNumber(0, window.innerHeight - height.get()),
    );
    const left = mobx.observable.box(
      getRandomNumber(0, window.innerWidth - width.get()),
    );
    const color = mobx.observable.box(getRandomColor());

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
