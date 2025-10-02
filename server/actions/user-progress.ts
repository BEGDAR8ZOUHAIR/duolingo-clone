"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getCourseById, getUserProgress } from "@/server/db/queries";
import { supabase } from "@/lib/supabase";

export const upsertUserProgress = async (courseId: number) => {
  const userId = 'demo-user';
  const user = { firstName: 'Demo', imageUrl: '' };

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  const course = await getCourseById(courseId);

  if (!course) {
    throw new Error("Course not found");
  }

  const existingUserProgress = await getUserProgress();

  if (existingUserProgress) {
    await supabase
      .from("user_progress")
      .update({
        active_course_id: courseId,
        user_name: user.firstName || "User",
        user_image_src: user.imageUrl || "",
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId);

    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");
  }

  await supabase.from("user_progress").insert({
    user_id: userId,
    active_course_id: courseId,
    user_name: user.firstName || "User",
    user_image_src: user.imageUrl || "",
  });

  revalidatePath("/courses");
  revalidatePath("/learn");
  redirect("/learn");
};
