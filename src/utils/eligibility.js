// Menentukan apakah perkiraan awal umum (30–35 mL/kg/hari) boleh diterapkan otomatis.
// Dipakai pada Fase 2 oleh kalkulator hidrasi. Tidak ada angka tambahan yang dikarang di sini.
export function evaluateEligibility(profile, assessment) {
  const reasons = [];
  const age = profile.age;
  if (age == null) reasons.push({ code: 'usia-belum-diisi', label: 'Usia belum diisi sehingga estimasi umum belum dapat diterapkan' });
  if (age != null && age < 18) reasons.push({ code: 'anak', label: 'Usia di bawah 18 tahun (kebutuhan cairan anak/remaja berbeda)' });
  if (age != null && age >= 65) reasons.push({ code: 'lansia', label: 'Usia 65 tahun ke atas (kebutuhan cairan dapat berbeda)' });
  if (!assessment.pregnancyStatus) reasons.push({ code: 'status-kehamilan-belum-dinilai', label: 'Status kehamilan/menyusui belum dinilai' });
  if (assessment.pregnancyStatus === 'hamil') reasons.push({ code: 'hamil', label: 'Sedang hamil' });
  if (assessment.pregnancyStatus === 'menyusui') reasons.push({ code: 'menyusui', label: 'Sedang menyusui' });
  if (assessment.pregnancyStatus === 'tidak-menjawab') reasons.push({ code: 'kehamilan-tidak-dijawab', label: 'Status kehamilan/menyusui tidak dijawab' });
  const conditions = (assessment.conditions || []).filter((c) => c !== 'tidak-ada');
  if (conditions.length) reasons.push({ code: 'kondisi', label: 'Kondisi medis yang dapat memengaruhi keseimbangan cairan' });
  const prescribed = !!assessment.hasPrescribedTarget && assessment.prescribedMl != null;
  if (prescribed) reasons.push({ code: 'resep', label: 'Ada target cairan dari tenaga kesehatan (akan diutamakan)' });
  return { eligible: reasons.length === 0, useBaseline: reasons.length === 0, prescribed, reasons };
}
