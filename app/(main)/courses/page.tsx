import { getCourses, getUserProgress } from "@/server/db/queries";
import { List } from "./list";

export const dynamic = 'force-dynamic';

const CoursesPage = async () => {
  const coursesData = getCourses();
  const userProgressData = getUserProgress();

  const [courses, userProgress] = await Promise.all([
    coursesData,
    userProgressData,
  ]);

  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
      <h1 className="text-2xl font-bold text-neutral-700">Language Courses</h1>
      <List
        courses={courses}
        activeCourseId={typeof userProgress?.active_course_id === 'object' && userProgress?.active_course_id !== null ? userProgress.active_course_id.id : userProgress?.active_course_id}
      />
    </div>
  );
};

export default CoursesPage;
