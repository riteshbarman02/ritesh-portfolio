// Colorful tag palette inspired by VS Code and modern design
export const tagColorPalette = [
  // Blue variants
  { bg: 'rgba(30, 144, 255, 0.15)', border: '#1e90ff', text: '#1e90ff', name: 'blue' },
  // Purple variants
  { bg: 'rgba(147, 51, 234, 0.15)', border: '#9333ea', text: '#9333ea', name: 'purple' },
  // Pink variants
  { bg: 'rgba(236, 72, 153, 0.15)', border: '#ec4899', text: '#ec4899', name: 'pink' },
  // Green variants
  { bg: 'rgba(34, 197, 94, 0.15)', border: '#22c55e', text: '#22c55e', name: 'green' },
  // Red variants
  { bg: 'rgba(239, 68, 68, 0.15)', border: '#ef4444', text: '#ef4444', name: 'red' },
  // Orange variants
  { bg: 'rgba(249, 115, 22, 0.15)', border: '#f97316', text: '#f97316', name: 'orange' },
  // Cyan variants
  { bg: 'rgba(34, 211, 238, 0.15)', border: '#22d3ee', text: '#22d3ee', name: 'cyan' },
  // Yellow variants
  { bg: 'rgba(250, 204, 21, 0.15)', border: '#facc15', text: '#facc15', name: 'yellow' },
  // Indigo variants
  { bg: 'rgba(99, 102, 241, 0.15)', border: '#6366f1', text: '#6366f1', name: 'indigo' },
  // Emerald variants
  { bg: 'rgba(16, 185, 129, 0.15)', border: '#10b981', text: '#10b981', name: 'emerald' },
];

export function getTagColor(index: number) {
  return tagColorPalette[index % tagColorPalette.length];
}

export function getTagColorByName(tagName: string) {
  const hash = tagName
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return tagColorPalette[hash % tagColorPalette.length];
}
