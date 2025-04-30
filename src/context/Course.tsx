"use client";
import { AxiosInstance } from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useAxios } from "./AxiosProvider";

interface AxiosContextType {
  myaxios: AxiosInstance;
}

interface CourseContextType {
  courses: any[];
  cartItems: any[];
}

const CourseContext = createContext<CourseContextType | null>(null);

const CourseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const myaxios = useAxios();
  const [idCourses, setIdCourses] = useState<any[]>([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  // Recupero corsi dal backend
  const handleGetCourses = async () => {
    try {
      const response = await myaxios.get("/courses");
      setCourses(response.data);
      return response.data; // ritorno i dati per usarli dopo
    } catch (error) {
      console.error("Error fetching courses:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // useEffect principale
  useEffect(() => {
    const initializeData = async () => {
      const storedIds: any[] = JSON.parse(
        localStorage.getItem("idCourses") || "[]"
      );
      setIdCourses(storedIds);

      const fetchedCourses = await handleGetCourses();

      // Filtra gli id presenti effettivamente nei corsi esistenti
      const validIds = storedIds.filter((id) =>
        fetchedCourses.some((course: any) => course.id === id)
      );

      // Aggiorna lo stato e il localStorage
      setIdCourses(validIds);
      localStorage.setItem("idCourses", JSON.stringify(validIds));
    };

    initializeData();
  }, []);

  const cartCourses = courses.filter((course) => idCourses.includes(course.id));

  //elimino i cotrsi

  const handleDeleteCourse = async () => {
    try {
      await myaxios.delete(`/courses/${courseToDelete}`);
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== courseToDelete)
      );
      // handleGetCourses() // Refresh the list
    } catch (error) {
      console.error("Error deleting course:", error);
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  return (
    <CourseContext.Provider
      value={{
        loading,
        cartCourses,
        setLoading,
        courses,
        setCourses,
        handleGetCourses,
        idCourses,
        setIdCourses,
        handleDeleteCourse,
        deleteDialogOpen,
        setDeleteDialogOpen,
        courseToDelete,
        setCourseToDelete,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export default CourseProvider;

export function useCourse() {
  return useContext(CourseContext);
}
