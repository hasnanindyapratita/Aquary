export const STEPS = [
  { id: 'personal', path: '/onboarding/data-diri', label: 'Data Diri' },
  { id: 'assessment', path: '/onboarding/asesmen', label: 'Asesmen' },
  { id: 'penguin', path: '/onboarding/penguin', label: 'Penguin' },
];
export const HOME_PATH = '/home';

// Indeks langkah pertama yang belum selesai; STEPS.length jika semua selesai.
export function firstIncompleteIndex(onboarding) {
  const i = STEPS.findIndex((s) => !onboarding[s.id]);
  return i === -1 ? STEPS.length : i;
}
export function entryPath(onboarding) {
  const i = firstIncompleteIndex(onboarding);
  return i === STEPS.length ? HOME_PATH : STEPS[i].path;
}
