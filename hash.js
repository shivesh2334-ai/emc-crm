function stringHash(str) {
  let hash = 5381;
  let i = str.length;
  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }
  return (hash >>> 0).toString();
}

console.log("DYNAMIC_SERVER_USAGE:", stringHash("DYNAMIC_SERVER_USAGE"));
