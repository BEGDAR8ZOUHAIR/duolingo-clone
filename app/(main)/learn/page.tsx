import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress, getUnits, getUserSubscription } from "@/server/db/queries";

import { Header } from "./header";
import { Unit } from "./unit";

export const dynamic = 'force-dynamic';

const LearnPage = async () => {
  const userProgressData = getUserProgress();
  const unitsData = getUnits();
  const userSubscriptionData = getUserSubscription();

  const [userProgress, units, userSubscription] = await Promise.all([
    userProgressData,
    unitsData,
    userSubscriptionData,
  ]);

  if (!userProgress || !userProgress.active_course_id) {
    redirect("/courses");
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.active_course_id}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={!!userSubscription}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title="Learn" />
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            <Unit
              id={unit.id}
              order={unit.order}
              title={unit.title}
              description={unit.description}
              lessons={unit.lessons}
              activeLesson={undefined}
              activeLessonPercentage={0}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
