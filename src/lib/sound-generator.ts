/* 
 * Util for generating sound
 */

// Create audio context
const audioContext = new AudioContext();

export function generateSound(frequency: number, duration: number) {
    // Create oscillator
    const oscillator = audioContext.createOscillator();
    oscillator.type = "triangle"; // "sine", "square", "sawtooth", "triangle"
    oscillator.frequency.value = frequency;

    // Create gain node for amplitude control
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0.1;

    // Connect oscillator to gain node and gain node to destination
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Start oscillator
    oscillator.start();
    setTimeout(() => {
        oscillator.stop();
    }, duration);
}