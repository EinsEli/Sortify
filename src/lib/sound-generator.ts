/* 
 * Util for generating sound
 */

// Create audio context
let audioContext: AudioContext | null = null;

if (typeof window !== 'undefined') {
  audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
}

export function generateSound(frequency: number, duration: number) {
  if (!audioContext) {
    console.error('AudioContext is not supported in this environment');
    return;
  }

  const oscillator = audioContext.createOscillator();
  oscillator.type = "triangle"; // "sine", "square", "sawtooth", "triangle"
  oscillator.frequency.value = frequency;

  const gainNode = audioContext.createGain();
  gainNode.gain.value = 0.1;

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start();
  setTimeout(() => {
    oscillator.stop();
  }, duration);
}