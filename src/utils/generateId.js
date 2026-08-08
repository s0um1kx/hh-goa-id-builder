// Generates a unique 5-digit sequence based on string input or random generation
export function generateBuilderId(name = '') {
  let hash = 0;
  if (name.trim().length > 0) {
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
  } else {
    hash = Math.floor(Math.random() * 90000) + 10000;
  }
  const uniqueNum = Math.abs(hash % 90000) + 10000; // Guarantees 5 digits
  return `HH026-${uniqueNum}`;
}