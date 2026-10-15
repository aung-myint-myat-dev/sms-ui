import { useCallback, useEffect, useState } from "react";
import { academicYearApi } from "../api/academicYearApi";

export function useAcademicYearList() {
  const [academicYears, setAcademicYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setAcademicYears(await academicYearApi.list());
    } catch (cause) {
      setError(cause.message || "Unable to load academic years.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    academicYearApi
      .list()
      .then((years) => {
        if (isMounted) setAcademicYears(years);
      })
      .catch((cause) => {
        if (isMounted) {
          setError(cause.message || "Unable to load academic years.");
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const create = async (data) => {
    const academicYear = await academicYearApi.create(data);
    setAcademicYears((current) => [...current, academicYear]);
    return academicYear;
  };

  const update = async (id, data) => {
    const academicYear = await academicYearApi.update(id, data);
    setAcademicYears((current) =>
      current.map((year) =>
        String(year.id) === String(id) ? academicYear : year,
      ),
    );
    return academicYear;
  };

  const remove = async (id) => {
    await academicYearApi.remove(id);
    setAcademicYears((current) =>
      current.filter((year) => String(year.id) !== String(id)),
    );
  };

  return { academicYears, loading, error, refresh, create, update, remove };
}
