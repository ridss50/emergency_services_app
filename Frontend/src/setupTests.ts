import "@testing-library/jest-dom";

// Mock window.scrollTo (prevents errors)
Object.defineProperty(window, "scrollTo", {
  value: () => {},
  writable: true,
});

// Mock URL.createObjectURL for image/file upload
global.URL.createObjectURL = jest.fn();

// Mock FormData append just to avoid warnings
global.FormData.prototype.append = jest.fn();

// Mock ResizeObserver (if you use it anywhere)
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
(global as any).ResizeObserver = ResizeObserver;
