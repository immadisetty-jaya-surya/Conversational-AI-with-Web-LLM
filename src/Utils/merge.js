export function merge(target, source) {
    Object.keys(source).forEach(key => {
      if (
        Object.prototype.hasOwnProperty.call(source, key) && // Check if the property is not inherited
        source[key] &&
        typeof source[key] === "object" &&
        key !== "__proto__" &&
        key !== "constructor"
      ) {
        if (!target[key] || typeof target[key] !== "object") {
          target[key] = {};
        }
        merge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    });
  }
  