import { UnitBanner } from "./unit-banner";
import { LessonButton } from "./lesson-button";

interface Lesson {
  id: number;
  unit_id: number;
  title: string;
  order: number;
  completed: boolean;
}

interface UnitProps {
  id: number;
  order: number;
  title: string;
  description: string;
  lessons: Lesson[];
  activeLesson?: { id: number } | undefined;
  activeLessonPercentage: number;
}

export const Unit = ({
  title,
  description,
  lessons,
  activeLesson,
  activeLessonPercentage,
}: UnitProps) => {
  return (
    <>
      <UnitBanner title={title} description={description} />
      <div className="relative flex flex-col items-center">
        {lessons.map((lesson, index) => {
          const isCurrent = lesson.id === activeLesson?.id;
          const isLocked = !lesson.completed && !isCurrent;

          return (
            <LessonButton
              key={lesson.id}
              id={lesson.id}
              index={index}
              totalCount={lessons.length - 1}
              current={isCurrent}
              locked={isLocked}
              percentage={activeLessonPercentage}
            />
          );
        })}
      </div>
    </>
  );
};
