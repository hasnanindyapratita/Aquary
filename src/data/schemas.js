// Skema + nilai default untuk setiap store (dipisah sesuai spesifikasi arsitektur data).
const str = (extra = {}) => ({ type: 'string', ...extra });
const num = (extra = {}) => ({ type: 'number', ...extra });
const bool = () => ({ type: 'boolean' });

export const SEX_VALUES = ['', 'perempuan', 'laki-laki', 'tidak-menyebutkan'];
export const MOODS = ['happy', 'thirsty', 'sleepy', 'recovering', 'thriving'];

// --- Akun (daftar pengguna lokal) & sesi ---
export const usersSchema = {
  type: 'array',
  of: {
    type: 'object',
    shape: {
      id: str({ max: 64 }),
      email: str({ max: 254 }),
      salt: str({ max: 64 }),
      hash: str({ max: 128 }),
      iterations: num({ min: 1 }),
      createdAt: str({ max: 40 }),
    },
  },
};
export const sessionSchema = { type: 'object', shape: { userId: str({ nullable: true, max: 64 }) } };

// --- Profil pengguna ---
export const profileSchema = {
  type: 'object',
  shape: {
    displayName: str({ max: 40 }),
    age: num({ nullable: true, min: 0, max: 120 }),
    sex: str({ enum: SEX_VALUES }),
    weightKg: num({ nullable: true, min: 1, max: 500 }),
    heightCm: num({ nullable: true, min: 30, max: 260 }),
    wakeTime: str({ max: 5 }),
    sleepTime: str({ max: 5 }),
  },
};
export const defaultProfile = { displayName: '', age: null, sex: '', weightKg: null, heightCm: null, wakeTime: '06:30', sleepTime: '22:30' };

// --- Asesmen hidrasi ---
export const assessmentSchema = {
  type: 'object',
  shape: {
    activityLevel: str({ enum: ['', 'rendah', 'sedang', 'tinggi'] }),
    exerciseDaysPerWeek: num({ min: 0, max: 7 }),
    exerciseIntensity: str({ enum: ['', 'ringan', 'sedang', 'berat'] }),
    sweatingLevel: str({ enum: ['', 'sedikit', 'sedang', 'banyak'] }),
    hotEnvironment: str({ enum: ['', 'jarang', 'kadang', 'sering'] }),
    pregnancyStatus: str({ enum: ['', 'tidak', 'hamil', 'menyusui', 'tidak-menjawab'] }),
    conditions: { type: 'array', of: str({ max: 40 }) },
    hasPrescribedTarget: bool(),
    prescribedMl: num({ nullable: true, min: 1, max: 20000 }),
    prescribedNote: str({ max: 200 }),
    monitoring: { type: 'object', shape: { urineColor: bool(), symptoms: bool() } },
    completedAt: str({ nullable: true, max: 40 }),
  },
};
export const defaultAssessment = {
  activityLevel: '', exerciseDaysPerWeek: 0, exerciseIntensity: '', sweatingLevel: '', hotEnvironment: '',
  pregnancyStatus: '', conditions: [], hasPrescribedTarget: false, prescribedMl: null, prescribedNote: '',
  monitoring: { urineColor: false, symptoms: false }, completedAt: null,
};

// --- Penguin ---
export const penguinSchema = {
  type: 'object',
  shape: {
    name: str({ max: 20 }),
    mood: str({ enum: MOODS }),
    xp: num({ min: 0 }),
    level: num({ min: 1 }),
    coins: num({ min: 0 }),
    streak: num({ min: 0 }),
    accessories: { type: 'object', shape: { owned: { type: 'array', of: str({ max: 30 }) }, equipped: { type: 'array', of: str({ max: 30 }) } } },
    createdAt: str({ nullable: true, max: 40 }),
  },
};
export const defaultPenguin = {
  name: '', mood: 'happy', xp: 0, level: 1, coins: 0, streak: 0,
  accessories: { owned: [], equipped: [] }, createdAt: null,
};

// --- Progres onboarding ---
export const onboardingSchema = { type: 'object', shape: { personal: bool(), assessment: bool(), penguin: bool() } };
export const defaultOnboarding = { personal: false, assessment: false, penguin: false };
