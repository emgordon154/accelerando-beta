// This file is pretty much unnecessary if using standard 12-tone equal temperament.
// I just thought it might be fun to play around with unusual tunings.


// Chromatic Equal Temperament Scale
export function chromaticETScale(root=440, steps=12, fHR=2) {
// fHR stands for fundamental harmonic ratio
// e.g. 2 for octaves as usual, 3 for tritaves in the Bohlen-Pierce scale, etc.

// 440Hz is A4, right? probably don't want to have to pass in frequencies in Hertz,
// so i should revise this function to accept note names
// although that wouldn't really make sense for unusual tuning systems anyway

  return Array.from(
    {length: steps},
    (_, stepsUp) => root * fHR ** (stepsUp / steps)
  )
}