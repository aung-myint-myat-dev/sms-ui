import { useAcademicYearDetail } from "./hooks/useAcademicYearDetail";
import { AcademicYearDetails } from "./components/AcademicYearDetails";

export function Show({ academicYears, id }) {
  const academicYear = useAcademicYearDetail(academicYears, id);
  return <AcademicYearDetails academicYear={academicYear} />;
}
