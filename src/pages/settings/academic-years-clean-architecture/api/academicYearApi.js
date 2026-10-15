import {
  ACADEMIC_YEAR_STORAGE_KEY,
  INITIAL_ACADEMIC_YEARS,
} from "../constants/academicYearConstants";

function readAcademicYears() {
  const storedYears = window.localStorage.getItem(ACADEMIC_YEAR_STORAGE_KEY);

  if (storedYears === null) {
    window.localStorage.setItem(
      ACADEMIC_YEAR_STORAGE_KEY,
      JSON.stringify(INITIAL_ACADEMIC_YEARS),
    );
    return INITIAL_ACADEMIC_YEARS;
  }

  const academicYears = JSON.parse(storedYears);
  if (!Array.isArray(academicYears)) {
    throw new Error("Saved academic year data is invalid.");
  }
  return academicYears;
}

function saveAcademicYears(academicYears) {
  window.localStorage.setItem(
    ACADEMIC_YEAR_STORAGE_KEY,
    JSON.stringify(academicYears),
  );
}

export const academicYearApi = {
  async list() {
    return readAcademicYears();
  },

  async getById(id) {
    const academicYear = readAcademicYears().find(
      (year) => String(year.id) === String(id),
    );
    if (!academicYear) {
      throw new Error("Academic year not found.");
    }
    return academicYear;
  },

  async create(data) {
    const academicYears = readAcademicYears();
    const academicYear = {
      ...data,
      id: crypto.randomUUID(),
      total_students: 0,
    };
    saveAcademicYears([...academicYears, academicYear]);
    return academicYear;
  },

  async update(id, data) {
    const academicYears = readAcademicYears();
    const index = academicYears.findIndex(
      (year) => String(year.id) === String(id),
    );
    if (index === -1) {
      throw new Error("Academic year not found.");
    }

    const updatedAcademicYear = {
      ...academicYears[index],
      ...data,
      id: academicYears[index].id,
    };
    academicYears[index] = updatedAcademicYear;
    saveAcademicYears(academicYears);
    return updatedAcademicYear;
  },

  async remove(id) {
    const academicYears = readAcademicYears();
    const nextAcademicYears = academicYears.filter(
      (year) => String(year.id) !== String(id),
    );
    if (nextAcademicYears.length === academicYears.length) {
      throw new Error("Academic year not found.");
    }
    saveAcademicYears(nextAcademicYears);
  },
};
