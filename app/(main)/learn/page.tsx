import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
// import { getUserProgress } from "@/server/db/queries";

import { Header } from "./header";

const LearnPage = async () => {
  // const userProgressData = getUserProgress();

  // const [userProgress] = await Promise.all([userProgressData]);

  // if (!userProgress || !userProgress.activeCourse) {
  //   redirect("/courses");
  // }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={null}
          hearts={0}
          points={0}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title="Learn" />
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
